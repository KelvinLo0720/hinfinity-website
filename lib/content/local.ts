export type Project = {
  slug: string;
  title: string;
  englishTitle: string;
  question: string;
  questionEn: string;
  category: string;
  categoryEn: string;
  image: string;
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

export const projects: Project[] = [
  {
    slug: "hk-virgo",
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
    title: "Shingage 城語",
    englishTitle: "Shingage",
    question: "一個屋邨、一段地方記憶，可以點樣由記錄變成有人參與嘅文化行動？",
    questionEn: "How can neighbourhood memory move from documentation into a cultural action people can take part in?",
    category: "地方文化 × 社區",
    categoryEn: "Local Culture × Community",
    image: "/images/group-conversation.jpg",
    accent: "blue",
    summary: "Shingage 以地方文化保存同社區參與為方向，延伸至西環邨相關文化保存實踐。",
    summaryEn: "Shingage works around local cultural preservation and community participation, extending into cultural preservation work connected with Sai Wan Estate.",
    context: "地方記憶好多時存在於居民經驗、日常語言同生活細節之中，但城市變化可以令呢啲內容好快消失。",
    contextEn: "Local memory often lives in residents' experiences, everyday language and small details, yet urban change can make these disappear quickly.",
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
    title: "殊途同歸——塵土裏的香港故事",
    englishTitle: "Dust Stories of Hong Kong",
    question: "歷史可唔可以唔只存在喺書本，而係重新行返入街道？",
    questionEn: "Can history leave the page and return to the streets?",
    category: "香港歷史 × 行走體驗",
    categoryEn: "Hong Kong History × Walking Experience",
    image: "/images/mentor-chat.jpg",
    accent: "lime",
    summary: "項目以香港歷史故事為核心，發展步行導賞及可預約的文化體驗。",
    summaryEn: "The project centres on Hong Kong historical stories and develops walking tours and bookable cultural experiences.",
    context: "好多歷史內容同今日生活其實只隔一條街，但如果冇人重新整理、帶路同講述，就好容易變得遙遠。",
    contextEn: "Much of Hong Kong's history is physically close to everyday life, but can still feel distant without someone to reinterpret and guide people through it.",
    shift: "由單純『講歷史』轉向設計一場觀眾可以行入去、感受空間同重新連結故事的體驗。",
    shiftEn: "The idea moved from simply telling history to designing an experience people can physically enter and connect with through place.",
    process: "透過資料研究、路線設計、故事編排同實際帶團，項目逐步形成自己的行走體驗。",
    processEn: "Research, route design, narrative development and live tours gradually shaped the project's walking experience.",
    outcome: "項目透過 pop-up 及私人預約形式持續提供歷史步行體驗。",
    outcomeEn: "The project continues offering historical walking experiences through pop-ups and private bookings.",
    reflection: "當歷史重新同腳下的地方連起來，文化就唔再只係『以前發生過』。",
    reflectionEn: "When history reconnects with the ground beneath us, culture becomes more than something that happened in the past."
  },
  {
    slug: "hong-kong-history-museum-game",
    title: "港史科學館",
    englishTitle: "Hong Kong History Museum Game Project",
    question: "香港歷史可以點樣變成一套令人願意坐低玩、再繼續問問題嘅遊戲？",
    questionEn: "How can Hong Kong history become a game that makes people sit down, play and keep asking questions?",
    category: "香港歷史 × Board Game",
    categoryEn: "Hong Kong History × Board Game",
    image: "/images/peer-review.jpg",
    accent: "orange",
    summary: "港史科學館將香港歷史內容轉化成桌遊，並持續探索產品化及市場發展。",
    summaryEn: "The project turns Hong Kong history into a board game and continues exploring product and market development.",
    context: "歷史學習經常被理解成接收大量資料，但遊戲可以令人用選擇、互動同後果去理解內容。",
    contextEn: "History learning is often treated as information intake, while games can create understanding through choices, interaction and consequences.",
    shift: "項目逐步由『歷史知識遊戲化』走向一套可以被測試、被重玩、亦有產品發展可能的桌遊。",
    shiftEn: "The project evolved from gamifying historical knowledge into a board game that can be tested, replayed and developed as a product.",
    process: "團隊持續調整規則、資訊量、玩家體驗同歷史內容之間的平衡。",
    processEn: "The team continues balancing rules, information density, player experience and historical content.",
    outcome: "項目正持續推進香港歷史桌遊的產品化方向。",
    outcomeEn: "The project continues developing the Hong Kong history board game towards a product.",
    reflection: "當歷史變成一個要你作選擇嘅過程，理解往往會比背答案行得更遠。",
    reflectionEn: "When history becomes a process that asks you to make choices, understanding can go further than memorising answers."
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
    title: "地方文化唔只係資料：Shingage 點樣行入社區",
    titleEn: "Local culture is more than information: how Shingage moved into the community",
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
    note: "唔只提供答案，而係幫青年問清楚問題、拆假設，同埋見到更多可能。",
    noteEn: "Not only providing answers, but helping young people sharpen questions, challenge assumptions and see more possibilities."
  },
  {
    name: "Cohort 01 Alumni",
    role: "參加者、實踐者與回流成員",
    roleEn: "Participants, Practitioners & Returning Alumni",
    note: "將第一屆親身經驗帶返社群，令下一屆唔需要由零開始。",
    noteEn: "Bringing first-cohort experience back into the community so the next cohort does not have to start from zero."
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
    zh: "拆開真正問題",
    enTitle: "Unpack the real problem",
    image: "/images/team-phone.jpg"
  },
  {
    n: "03",
    en: "BUILD",
    zh: "把想法做成原型",
    enTitle: "Build the idea into a prototype",
    image: "/images/peer-review.jpg"
  },
  {
    n: "04",
    en: "PITCH",
    zh: "用清楚語言溝通",
    enTitle: "Communicate with clarity",
    image: "/images/participant-pitch.jpg"
  },
  {
    n: "05",
    en: "TEST",
    zh: "帶入真實情境測試",
    enTitle: "Test in the real world",
    image: "/images/group-conversation.jpg"
  },
  {
    n: "06",
    en: "CONTINUE",
    zh: "令項目繼續行",
    enTitle: "Keep the project moving",
    image: "/images/bootcamp-circle.jpg"
  }
];
