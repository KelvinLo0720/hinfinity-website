export type Cohort = {
  id: string;
  slug: string;
  zh: string;
  en: string;
};

export type Project = {
  slug: string;
  cohort: string;
  title: string;
  englishTitle: string;
  question: string;
  questionEn: string;
  category: string;
  categoryEn: string;
  image: string;
  video?: {
    src: string;
    preview: string;
    poster: string;
    duration: string;
  };
  accent: string;
  summary: string;
  summaryEn: string;
  context: string;
  contextEn: string;
  shift: string;
  shiftEn: string;
  process: string;
  processEn: string;
  outcome: string;
  outcomeEn: string;
  reflection: string;
  reflectionEn: string;
};

export type Story = {
  slug: string;
  eyebrow: string;
  title: string;
  titleEn: string;
  excerpt: string;
  excerptEn: string;
  image: string;
};

export const cohorts: Cohort[] = [
  { id: "01", slug: "cohort-01", zh: "第一屆", en: "Cohort 01" }
];

export const projects: Project[] = [
  {
    slug: "hk-virgo",
    cohort: "01",
    title: "HK VirGO 香港謎路",
    englishTitle: "HK VirGO",
    question: "一個香港文化遊戲，可以點樣由第一個版本一路試到更好玩、更清楚？",
    questionEn: "How can a Hong Kong culture game keep evolving through real testing and feedback?",
    category: "香港文化 × 遊戲",
    categoryEn: "Hong Kong Culture × Game",
    image: "/images/team-phone.jpg",
    accent: "orange",
    summary: "HK VirGO 由遊戲構思出發，透過 beta feedback 持續調整遊戲機制，並探索下一步發展方向。",
    summaryEn: "HK VirGO started as a game concept and continues refining its mechanics through beta feedback while exploring its next stage of development.",
    context: "團隊希望用互動方式重新打開人對香港地方、故事與文化線索的好奇，而唔係只靠單向介紹。",
    contextEn: "The team wanted to reopen curiosity about Hong Kong places, stories and cultural clues through interaction rather than one-way explanation.",
    shift: "重點由『有幾多內容』慢慢移去『玩家點樣真正進入個體驗』，遊戲機制亦因測試回應持續修正。",
    shiftEn: "The focus moved from how much content could be included to how players actually enter the experience, with mechanics revised through testing.",
    process: "由原型、玩家測試到 beta feedback，團隊一路調整規則、節奏與文化內容之間的關係。",
    processEn: "From prototypes and player testing to beta feedback, the team kept adjusting the relationship between rules, pacing and cultural content.",
    outcome: "項目持續發展中，並繼續探索遊戲、文化內容與不同平台之間的可能。",
    outcomeEn: "The project continues to develop while exploring possibilities across game design, cultural content and different platforms.",
    reflection: "文化內容唔只要『放入去』，仲要變成玩家願意主動追落去嘅體驗。",
    reflectionEn: "Cultural content cannot simply be inserted; it has to become an experience players actively want to follow."
  },
  {
    slug: "shingage",
    cohort: "01",
    title: "Shingage 城語",
    englishTitle: "Shingage",
    question: "一個屋邨、一段地方記憶，可以點樣由記錄變成有人參與嘅文化行動？",
    questionEn: "How can neighbourhood memory move from documentation into a cultural action people can take part in?",
    category: "地方文化 × 社區",
    categoryEn: "Local Culture × Community",
    image: "/images/group-conversation.jpg",
    video: {
      src: "/videos/projects/shingage/shingage-full.mp4",
      preview: "/videos/projects/shingage/shingage-preview.mp4",
      poster: "/images/projects/shingage-video-poster.jpg",
      duration: "01:14"
    },
    accent: "blue",
    summary: "Shingage 以保育地區文化同社區參與為方向，目前著手研究西環邨相關文化保育。",
    summaryEn: "Shingage focuses on local cultural preservation and community participation, and is currently researching cultural preservation connected with Sai Wan Estate.",
    context: "地方記憶，往往埋藏喺居民嘅日常生活入面。但城市變化急促，無形嘅社區記憶，好容易喺轉眼間消失。",
    contextEn: "Local memories are often embedded in residents’ everyday lives. But as the city changes quickly, intangible community memories can disappear in an instant.",
    shift: "項目由『保存資料』進一步思考點樣令街坊、青年同地方本身一齊參與。",
    shiftEn: "The project moved beyond preserving information to ask how residents, young people and the place itself could all take part.",
    process: "透過地方研究、內容整理、合作同社區接觸，逐步建立可延伸的文化保存形式。",
    processEn: "Through local research, content development, collaboration and community contact, the team built an approach that can continue evolving.",
    outcome: "項目繼續圍繞西環邨及地方文化保存發展，將研究轉化成更貼近社區的實踐。",
    outcomeEn: "The project continues developing around Sai Wan Estate and local cultural preservation, translating research into community-facing practice.",
    reflection: "保存唔只係留低資料，而係令一個地方仍然有人願意講、願意聽、願意再做。",
    reflectionEn: "Preservation is not only about keeping records; it is about keeping a place spoken about, listened to and practised."
  },
  {
    slug: "dust-stories-hong-kong",
    cohort: "01",
    title: "殊途同歸——塵土裏的香港故事",
    englishTitle: "Dust Stories of Hong Kong",
    question: "點解協助居港內地人融入香港嘅資源只有硬件配套，可唔可以試下由歷史文化角度入手呢？",
    questionEn: "Why does support for Mainland Chinese residents integrating into Hong Kong focus mainly on practical services? Could history and culture offer another way in?",
    category: "香港歷史 × 導賞體驗 × 工作坊",
    categoryEn: "Hong Kong History × Guided Experience × Workshop",
    image: "/images/mentor-chat.jpg",
    accent: "lime",
    summary: "項目以居港內地人為對象，希望藉生死角度帶出香港歷史，幫助居港內地人了解香港文化。",
    summaryEn: "The project is designed for Mainland Chinese residents in Hong Kong, using perspectives on life and death to open up Hong Kong history and deepen understanding of local culture.",
    context: "新來港或居港內地人要融入本地，往往只有生活指南等硬件支援；但真正構成文化理解與歸屬感，其實蘊藏喺呢片土地嘅歷史之中。",
    contextEn: "New arrivals and Mainland Chinese residents in Hong Kong are often offered practical guidance for daily life, but cultural understanding and a sense of belonging can also grow through the history of this place.",
    shift: "由單純提供生活資訊嘅「硬件適應」，變成以生死為題嘅導賞與工作坊，帶領參加者走進關於死亡的課題，透過參觀墳場、殯儀館，感受香港嘅歷史脈絡。",
    shiftEn: "The project moves beyond practical adaptation and into guided experiences and workshops about life and death, including visits to cemeteries and funeral settings that reveal layers of Hong Kong history.",
    process: "項目成員研究檔案、設計角度、實地考察與試行工作坊，將歷史轉化成能引發思考同共鳴嘅文化體驗。",
    processEn: "The team researches archives, develops interpretive angles, conducts field visits and pilots workshops, turning history into cultural experiences designed to provoke thought and resonance.",
    outcome: "項目主要以工作坊、Pop-up 導賞及預約體驗形式運作。",
    outcomeEn: "The project currently operates mainly through workshops, pop-up guided experiences and bookable sessions.",
    reflection: "當新來港者願意透過歷史同社區建立連結，文化融入就係一種雙向嘅理解同交流。",
    reflectionEn: "When new residents connect with history and community, cultural integration can become a two-way process of understanding and exchange."
  },
  {
    slug: "hong-kong-history-museum-game",
    cohort: "01",
    title: "港史科學館",
    englishTitle: "Hong Kong History Museum Game Project",
    question: "香港歷史可以點樣變成一套令人願意坐低玩、再繼續問問題嘅遊戲？",
    questionEn: "How can Hong Kong history become a game that makes people sit down, play and keep asking questions?",
    category: "香港歷史 × Board Game",
    categoryEn: "Hong Kong History × Board Game",
    image: "/images/peer-review.jpg",
    accent: "orange",
    summary: "港史科學館將香港歷史內容轉化成桌遊，希望透過遊戲，令歷史唔再被認為只係「一堆人名同數字」。",
    summaryEn: "港史科學館 turns Hong Kong history into a board game, using play to show that history is more than a collection of names and numbers.",
    context: "歷史學習經常被理解成接收大量資料，但遊戲可以令人用選擇、互動同後果去理解內容。",
    contextEn: "History learning is often treated as information intake, while games can create understanding through choices, interaction and consequences.",
    shift: "項目由研究做起，逐步修正遊戲內容與玩法，建立一套可以反覆試玩嘅遊戲系統。",
    shiftEn: "The project begins with research, then keeps revising its content and mechanics to build a game system that can be played and tested repeatedly.",
    process: "團隊不斷調節遊戲嘅資訊量，希望喺玩家體驗同歷史真實度之間調校平衡。",
    processEn: "The team keeps adjusting the amount of information in the game, looking for a balance between player experience and historical accuracy.",
    outcome: "",
    outcomeEn: "",
    reflection: "",
    reflectionEn: ""
  }
];

export const stories: Story[] = [
  {
    slug: "one-year-later-hk-virgo",
    eyebrow: "ONE YEAR LATER",
    title: "一個 Idea，點樣喺測試之後繼續行？",
    titleEn: "What happens to an idea after the first round of testing?",
    excerpt: "HK VirGO 冇停喺第一個版本。由 beta feedback 到遊戲機制調整，真正的項目發展往往由『做完』之後先開始。",
    excerptEn: "HK VirGO did not stop at version one. From beta feedback to revised game mechanics, real project development often begins after the first version is finished.",
    image: "/images/team-phone.jpg"
  },
  {
    slug: "shingage-place-and-memory",
    eyebrow: "PROJECT PROCESS",
    title: "將社區回憶重新帶入公眾視線。",
    titleEn: "Bringing community memories back into public view.",
    excerpt: "由地方研究到西環邨文化保存，項目一路問：點樣先可以令記憶繼續有人參與？",
    excerptEn: "From local research to cultural preservation work around Sai Wan Estate, the project keeps asking how memory can remain participatory.",
    image: "/images/group-conversation.jpg"
  },
  {
    slug: "history-back-on-the-street",
    eyebrow: "FROM IDEA TO PRACTICE",
    title: "歷史重新行返入街道",
    titleEn: "Putting history back on the street",
    excerpt: "殊途同歸將研究變成步行體驗，令歷史唔只係一段文字，而係一條你可以親身行過的路。",
    excerptEn: "Dust Stories of Hong Kong turns research into walking experiences, making history not only something to read but a route people can physically move through.",
    image: "/images/mentor-chat.jpg"
  }
];

export const people = [
  {
    name: "Programme Team",
    role: "策劃、製作與項目運作",
    roleEn: "Programme, Production & Operations",
    note: "將理念變成 programme、content、合作同實際執行。",
    noteEn: "Turning the programme's ideas into delivery, content, partnerships and day-to-day execution."
  },
  {
    name: "Advisors & Mentors",
    role: "問題、經驗與挑戰",
    roleEn: "Questions, Experience & Challenge",
    note: "唔會提供標準答案，只陪青年釐清問題、拆解假設，探索更多可能。",
    noteEn: "There are no standard answers. Advisors and mentors help young people clarify questions, unpack assumptions and explore more possibilities."
  },
  {
    name: "Cohort 01 Alumni",
    role: "參加者、實踐者與回流成員",
    roleEn: "Participants, Practitioners & Returning Alumni",
    note: "將親身走過的路帶返社群，讓下一屆唔需要摸住石頭過河。",
    noteEn: "Bringing lived experience back into the community so the next cohort does not have to find its way from scratch."
  }
];

export const programmeSteps = [
  {
    n: "01",
    en: "MEET",
    zh: "遇見同路人",
    enTitle: "Meet fellow travellers",
    image: "/images/mentor-chat.jpg"
  },
  {
    n: "02",
    en: "EXPLORE",
    zh: "釐清核心問題",
    enTitle: "Clarify the core problem",
    image: "/images/team-phone.jpg"
  },
  {
    n: "03",
    en: "BUILD",
    zh: "將諗法化為雛形",
    enTitle: "Turn the idea into a prototype",
    image: "/images/peer-review.jpg"
  },
  {
    n: "04",
    en: "PITCH",
    zh: "成為「說故事的人」",
    enTitle: "Become a storyteller",
    image: "/images/participant-pitch.jpg"
  },
  {
    n: "05",
    en: "TEST",
    zh: "喺現實中試行",
    enTitle: "Test it in the real world",
    image: "/images/group-conversation.jpg"
  },
  {
    n: "06",
    en: "CONTINUE",
    zh: "賦予生命力",
    enTitle: "Give the project a life of its own",
    image: "/images/bootcamp-circle.jpg"
  }
];
