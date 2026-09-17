// 网站资料与照片数据
// 修改这里的内容后，提交到 GitHub 即可更新网站
const SITE_DATA = {
  profile: {
    name: "jbizz7_",
    avatar: "uploads/9e23134c-acea-41b7-915f-34d0c8e58717.jpg"
  },
  photos: [
    {
      id: "d0fd82bb-aedf-49b0-9478-4ed9be1bd91b",
      url: "uploads/26a66fbe-cf83-4ece-9055-d55f97d78f3b.jpg",
      caption_en: "with my brother",
      caption_cn: "我爱你",
      date: "2020/08/11",
      likes: 26
    },
     {
      id: "winter1",
      url: "uploads/winter1.jpg",
      caption_en: "Jude says my growth spurt was different from his. He says I suddenly stretched out so long, my shoulders broad enough to rival the pines behind us—but he refuses to say out loud that I’m taller than him now. It really is different. His was the slow fading of cheek softness, a gold-lit smile slowly unfurling under the Dortmund sun, the curls on his head growing fluffier and bouncier by the day. I don’t know what Jude is watching on our video calls. I only notice that he’s been stung a little by the world’s unkindness—and still, he chose to keep smiling. ",
      caption_cn: "Jude说我的抽条和他的不一样，说我一下子变得好长，肩宽堪比后面的松柏，但拒绝说出我已经比他高的事实。的确不一样，他的是脸颊肉慢慢消掉，在多特蒙德的阳光下慢慢舒展开金灿灿的笑脸，头上的卷卷也慢慢变得更蓬更跳跃。不知道打视频时Jude都在注意什么，我只注意到他受了点世界的不善良，但他选择了继续微笑。",
      date: "2025/07/18",
      likes: 30
    },
     {
      id: "winter2",
      url: "uploads/winter2.jpg",
      caption_en: "Jude, now so many people are loving me by going around you. It’s hard to discipline the way others love, but I’ll always want every Cupid’s arrow aimed at me to come straight—no turning, no swerving. I’ve been standing behind you in silence all along. Whoever loves me, may they love you too—because I love you.",
      caption_cn: "Jude，现在有很多人绕过你来爱我了。难以规训别人的爱意，但永远希望那些射向我的丘比特之箭径直而来，不转弯。一直沉默伫立在你身后，爱我的人请同样爱你，因为我爱你。",
      date: "2026/09/15",
      likes: 51
    },
     {
      id: "winter3",
      url: "uploads/winter3.jpg",
      caption_en: "Useless, every time you show off about Mom being your personal chauffeur, driving you around, that’s exactly how I reply. And still, you never tire of sharing it—unlike your selfies, which always carry a tiny, mischievous kind of half-effort. The photos you take of Mom always catch such lovely light on her face, and she’s smiling toward you behind the camera and toward the “me” you keep murmuring about.I know you’re not really showing off. Mom just misses me a little. And so do you.",
      caption_cn: "Useless，每次你炫耀妈妈载着你当你的专属司机，我都这样回复。可你还是乐此不疲地分享，不像自拍带着小小恶趣味的敷衍。你拍的妈妈总是有很好看的光影落在她脸上，朝着摄像头后的你和你口中念叨的“我”笑。其实我知道你不是在炫耀，只是妈妈有些想念我，你也是。",
      date: "2026/09/16",
      likes: 32
    },
     {
      id: "winter4",
      url: "uploads/winter4.jpg",
      caption_en: "The two of us were curled up on the couch watching Pulp Fiction when we were very little. That day, it was just us in the house. We had so many moments like that—secretly learning the words Mom wouldn’t let us use. We only watched it that once, actually. But for some reason, Jude chose Jules Winnfield as his alt-account avatar.\n\n The second time I went to Germany to see Jude, he suddenly started talking about a German food he’d recently fallen in love with, in Jules’s way:\"Listen, Jobe. I used to call pigs filthy because they lacked personality. But that was before the miracle. You see, when God spares your life from a hand-cannon, you start to re-evaluate things. Maybe He didn't just save my ass from those bullets; maybe He was leading me to this goddamn Schnitzel. A pig has no soul, right? Exactly! That's why it needs to be hammered paper-thin, breaded in gold, and baptized in boiling German oil! It's not a filthy beast anymore; it's a sacrifice. I'm a shepherd now, and this crispy, lemon-squeezed, sauerkraut-topped piece of heaven is my holy communion. So fuck the old rules, I love this motherfucker now—bring me another plate and keep the beer coming!\" \n\n \"So, a pig becomes holy just because it's covered in breadcrumbs and deep-fried?\" I kept my face blank and gave him the answer he wanted.",
      caption_cn: "我俩是很小的时候一块窝在沙发上看的《低俗小说》，那天屋子里只有我们。我们有过很多那种时刻，偷偷学会妈妈不让我们使用的语汇。其实只看过那一遍，但jude不知为什么选了Jules Winnfield做小号头像。\n\n第二次去德国看jude，他突然谈起了最近爱上的德国美食，以Jules的方式：\"听着，Jobe，我以前说猪是污秽的，那是因为它们没经历过烈火的洗礼。但自从那天的'神迹'发生后，上帝不仅让我挡住了子弹，还向我启示了人生的真谛——那就是这块该死的德国炸猪排！你看，猪本身没有灵魂对吧？所以它才需要被捶打得薄如蝉翼，裹上神圣的金色面包糠，然后在滚烫的德国油锅里接受涅槃重生！这他妈简直就是烹饪界的救赎！我现在是个牧羊人了，而这块外酥里嫩、配上柠檬和酸菜的炸猪排，就是上帝赐给迷途羔羊的圣餐。去他妈的旧规矩，我现在爱死这玩意儿了，把它端上来，再多来点啤酒！\" \n\n \"所以，只要裹上面包糠下油锅炸一下，猪就立地成圣了 \" 我面无表情，给出了他想要的答案。
",
      date: "2026/09/17",
      likes: 29
     },
     {
      id: "winter5",
      url: "uploads/winter5.jpg", 
      caption_en: "Staying angry and staying calm, radiant and humble—that’s the shape Denise wanted us to grow into. And Jude got there far ahead of anything I could have imagined—my standard.\n\n He knows this world isn’t good enough—not to others, not to himself. But he only calls out the bad things when the world crosses a line of principle, while, ahead of the whole world, laying bare the little wrongs he’s done. More often, he just buries the bad things (after a quick, frantic rant to me and Toby) and keeps frolicking and rolling around in this not-good, not-bad world, enjoying every second. As long as he speaks, I’ll keep listening, asking, waiting.\n\n \"Will you two be that close for the rest of your lives?\" I like Juror No. 8’s answer: I don’t know, but it’s possible.",
      caption_cn: "保持愤怒与保持平和，神采飞扬与谦逊得体，这是Denise期望我们长成的样貌，而Jude比远在所有想象之前做到了，我的standard。\n\n 他知道这个世界不够好，无论是对旁人还是他自己。但他只在世界触及原则底线时指控发生的坏事情，同时先于全世界剖认自己犯的小小坏事。更多时候，他会把坏事情直接埋掉（除了向我和Toby急骤地抱怨一下），继续在这个不好不坏的世界撒欢打滚，享受每一秒钟。只要他开口，我愿意一直倾听、提问、等待。\n\n \"你们会一辈子都那么要好吗？\" 我喜欢八号陪审员的回答：我不知道，但这有可能。",
      date: "2026/09/17",
      likes: 34
     }
  ]
};
