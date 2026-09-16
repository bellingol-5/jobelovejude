const photoWall = document.getElementById('photo-wall');
const emptyState = document.getElementById('empty-state');
const avatarEl = document.getElementById('avatar');
const avatarPlaceholder = document.getElementById('avatar-placeholder');
const profileNameEl = document.getElementById('profile-name');

const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
const LIKES_KEY = 'photo_wall_likes';

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

  document.querySelectorAll('.photo-caption').forEach(caption => {
    const en = caption.dataset.en;
    const cn = caption.dataset.cn;

    if (isTouchDevice) {
      caption.addEventListener('click', () => {
        const current = caption.querySelector('.text').textContent;
        if (current === en && cn) {
          caption.querySelector('.text').textContent = cn;
          caption.querySelector('.hint').textContent = '点击显示英文';
        } else {
          caption.querySelector('.text').textContent = en;
          caption.querySelector('.hint').textContent = '点击显示中文';
        }
      });
    } else {
      caption.addEventListener('mouseenter', () => {
        if (cn) {
          caption.querySelector('.text').textContent = cn;
          caption.querySelector('.hint').textContent = '鼠标移开显示英文';
        }
      });
      caption.addEventListener('mouseleave', () => {
        caption.querySelector('.text').textContent = en;
        caption.querySelector('.hint').textContent = '鼠标悬停显示中文';
      });
    }
  });
}

function createPhotoCard(photo) {
  const displayCaption = photo.caption_en || photo.caption_cn || '';
  const hintText = isTouchDevice ? '点击显示中文' : '鼠标悬停显示中文';
  const hasTranslation = photo.caption_en && photo.caption_cn;

  return `
    <article class="photo-card">
      <div class="photo-date">${formatDate(photo.date)}</div>
      <img class="photo-image" src="${photo.url}" alt="照片" loading="lazy">
      <div class="photo-actions">
        <button class="like-btn" data-id="${photo.id}" aria-label="点赞">♥</button>
        <span class="like-count" data-id="${photo.id}">${photo.likes || 0}</span>
      </div>
      <div class="photo-caption" data-en="${escapeHtml(photo.caption_en)}" data-cn="${escapeHtml(photo.caption_cn)}">
        <span class="text">${escapeHtml(displayCaption)}</span>
        ${hasTranslation ? `<span class="hint">${hintText}</span>` : ''}
      </div>
    </article>
  `;
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
