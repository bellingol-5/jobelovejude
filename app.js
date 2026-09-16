const photoWall = document.getElementById('photo-wall');
const emptyState = document.getElementById('empty-state');
const avatarEl = document.getElementById('avatar');
const avatarPlaceholder = document.getElementById('avatar-placeholder');
const profileNameEl = document.getElementById('profile-name');

const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
const LIKES_KEY = 'photo_wall_likes';
const MAX_CAPTION_LENGTH = 80;

function loadLikes() {
  try {
    return JSON.parse(localStorage.getItem(LIKES_KEY)) || {};
  } catch {
    return {};
  }
}

function saveLikes(likes) {
  localStorage.setItem(LIKES_KEY, JSON.stringify(likes));
}

function init() {
  const data = SITE_DATA;
  renderProfile(data.profile);
  renderPhotos(data.photos);
}

function renderProfile(profile) {
  profileNameEl.textContent = profile.name || 'Jude';
  avatarPlaceholder.textContent = (profile.name || 'Jude').charAt(0).toUpperCase();

  if (profile.avatar) {
    avatarEl.src = profile.avatar;
    avatarEl.classList.remove('hidden');
    avatarPlaceholder.classList.add('hidden');
  } else {
    avatarEl.classList.add('hidden');
    avatarPlaceholder.classList.remove('hidden');
  }
}

function renderPhotos(photos) {
  if (!photos || photos.length === 0) {
    photoWall.innerHTML = '';
    emptyState.classList.remove('hidden');
    return;
  }

  emptyState.classList.add('hidden');

  const likes = loadLikes();
  photos.forEach(photo => {
    if (likes[photo.id] !== undefined) {
      photo.likes = likes[photo.id];
    }
  });

  const sorted = [...photos].sort((a, b) => {
    const da = a.date ? new Date(a.date) : null;
    const db = b.date ? new Date(b.date) : null;
    if (!da && !db) return 0;
    if (!da) return 1;
    if (!db) return -1;
    return db - da;
  });

  photoWall.innerHTML = sorted.map(photo => createPhotoCard(photo)).join('');

  document.querySelectorAll('.like-btn').forEach(btn => {
    btn.addEventListener('click', () => likePhoto(btn.dataset.id));
  });

  document.querySelectorAll('.expand-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleCaption(btn.closest('.photo-caption'));
    });
  });

  document.querySelectorAll('.photo-caption').forEach(caption => {
    if (isTouchDevice) {
      caption.addEventListener('click', (e) => {
        if (e.target.classList.contains('expand-btn')) return;
        toggleCaptionLanguage(caption);
      });
    } else {
      caption.addEventListener('mouseenter', () => setCaptionLanguage(caption, 'cn'));
      caption.addEventListener('mouseleave', () => setCaptionLanguage(caption, 'en'));
    }
  });
}

function createPhotoCard(photo) {
  const en = photo.caption_en || '';
  const cn = photo.caption_cn || '';
  const displayText = en || cn;
  const needsExpand = displayText.length > MAX_CAPTION_LENGTH;
  const hintText = isTouchDevice ? '点击显示中文' : '鼠标悬停显示中文';
  const hasTranslation = en && cn;

  return `
    <article class="photo-card">
      <div class="photo-date">${formatDate(photo.date)}</div>
      <img class="photo-image" src="${photo.url}" alt="照片" loading="lazy">
      <div class="photo-actions">
        <button class="like-btn" data-id="${photo.id}" aria-label="点赞">♥</button>
        <span class="like-count" data-id="${photo.id}">${photo.likes || 0}</span>
      </div>
      <div class="photo-caption"
           data-en="${escapeHtml(en)}"
           data-cn="${escapeHtml(cn)}"
           data-current-lang="en"
           data-expanded="false">
        <span class="text">${escapeHtml(needsExpand ? truncate(displayText) : displayText)}</span>
        ${hasTranslation ? `<span class="hint">${hintText}</span>` : ''}
        ${needsExpand ? `<button class="expand-btn" type="button">Show more / 展开</button>` : ''}
      </div>
    </article>
  `;
}

function truncate(text) {
  return text.slice(0, MAX_CAPTION_LENGTH) + '...';
}

function setCaptionLanguage(caption, lang) {
  const cn = caption.dataset.cn;
  if (lang === 'cn' && !cn) return;

  caption.dataset.currentLang = lang;
  updateCaptionDisplay(caption);

  const hint = caption.querySelector('.hint');
  if (hint) {
    if (isTouchDevice) {
      hint.textContent = lang === 'cn' ? '点击显示英文' : '点击显示中文';
    } else {
      hint.textContent = lang === 'cn' ? '鼠标移开显示英文' : '鼠标悬停显示中文';
    }
  }
}

function toggleCaptionLanguage(caption) {
  const current = caption.dataset.currentLang;
  const next = current === 'cn' ? 'en' : 'cn';
  setCaptionLanguage(caption, next);
}

function toggleCaption(caption) {
  const expanded = caption.dataset.expanded === 'true';
  caption.dataset.expanded = String(!expanded);
  updateCaptionDisplay(caption);
}

function updateCaptionDisplay(caption) {
  const en = caption.dataset.en;
  const cn = caption.dataset.cn;
  const lang = caption.dataset.currentLang || 'en';
  const expanded = caption.dataset.expanded === 'true';

  const fullText = lang === 'cn' && cn ? cn : en;
  const textEl = caption.querySelector('.text');
  const btn = caption.querySelector('.expand-btn');

  if (!fullText) {
    textEl.textContent = '';
    return;
  }

  if (expanded || fullText.length <= MAX_CAPTION_LENGTH) {
    textEl.textContent = fullText;
  } else {
    textEl.textContent = truncate(fullText);
  }

  if (btn) {
    btn.textContent = expanded ? 'Show less / 收起' : 'Show more / 展开';
  }
}

function likePhoto(id) {
  const likes = loadLikes();
  likes[id] = (likes[id] || 0) + 1;
  saveLikes(likes);

  const countEl = document.querySelector(`.like-count[data-id="${id}"]`);
  if (countEl) countEl.textContent = likes[id];
}

function formatDate(dateStr) {
  if (!dateStr) return '日期待编辑';
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return '日期待编辑';
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}.${m}.${d}`;
}

function escapeHtml(text) {
  if (!text) return '';
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

init();
