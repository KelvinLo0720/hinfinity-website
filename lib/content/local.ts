export type Project = {
  slug: string;
  title: string;
  englishTitle: string;
  question: string;
  category: string;
  image: string;
  accent: string;
  summary: string;
  context: string;
  shift: string;
  process: string;
  outcome: string;
  reflection: string;
};

export type Story = {
  slug: string;
  eyebrow: string;
  title: string;
  excerpt: string;
  image: string;
};

export const projects: Project[] = [
  {
    slug: "stories-return-to-the-street",
    title: "讓故事重新回到街上",
    englishTitle: "Stories Return to the Street",
    question: "一段被忽略的香港故事，可以點樣重新被聽見？",
    category: "地方故事 × 社區參與",
    image: "/images/team-phone.jpg",
    accent: "orange",
    summary: "由街坊口述、日常觀察與青年視角出發，把地方記憶變成可以被看見、被討論的公共文化行動。",
    context: "團隊留意到，很多地方故事只停留在熟悉該區的人之間。當城市節奏改變，記憶往往比建築更快消失。",
    shift: "最初構思集中在『保存資料』；經過同儕回饋後，團隊轉向思考：怎樣令故事再次進入日常，而不是被封存在檔案內。",
    process: "團隊以訪談、街區觀察、快速原型及小型公眾測試，逐步找出最容易讓陌生人參與的表達方式。",
    outcome: "形成一套可延伸的地方故事展示概念，並建立首輪訪談與公眾測試框架。",
    reflection: "文化保育不只是留住過去，而是創造一次讓今天的人願意停下來聽的相遇。"
  },
  {
    slug: "re-heritage",
    title: "Re:Heritage",
    englishTitle: "Re:Heritage",
    question: "文化保育可唔可以唔只講『以前』，而係同今日生活重新接軌？",
    category: "文化保育 × 設計思維",
    image: "/images/peer-review.jpg",
    accent: "blue",
    summary: "以青年生活語言重新整理文化內容，讓保育由單向介紹，變成可以參與、回應與再創作的過程。",
    context: "團隊認為，文化資訊並非不存在，而是常以距離感較大的方式出現，令年輕人難以代入。",
    shift: "Bootcamp 期間，項目由『做更多內容』轉向『重新設計參與方式』，並將受眾體驗放在資訊量之前。",
    process: "透過受眾訪談、內容拆解、情境測試與導師挑戰，團隊建立更生活化的文化接觸點。",
    outcome: "完成可測試的內容框架與體驗原型，為後續社區合作建立基礎。",
    reflection: "真正的傳承，不是把答案交給下一代，而是讓下一代有位置加入問題。"
  },
  {
    slug: "room-for-ideas",
    title: "有想法的房間",
    englishTitle: "Room for Ideas",
    question: "當一個人未有完整計劃，社群可以點樣陪佢行出第一步？",
    category: "青年成長 × 同儕實驗",
    image: "/images/group-conversation.jpg",
    accent: "lime",
    summary: "從安全試錯與同儕支持出發，探索一個不以勝負為核心的青年構思空間。",
    context: "不少青年不是沒有想法，而是覺得自己未夠資格、未有資源，或者未準備好公開說出來。",
    shift: "團隊放棄以完成度作為參與門檻，轉而設計一個能承載模糊、疑問和反覆修改的過程。",
    process: "項目利用小組對話、問題卡、快速分享和反思練習，測試不同程度的參與方式。",
    outcome: "建立一套可用於青年聚會及構思工作坊的活動流程。",
    reflection: "不是每個人都需要被催促成為領袖；有時候，先有人願意認真聽，行動才會開始。"
  }
];

export const stories: Story[] = [
  {
    slug: "from-participant-to-builder",
    eyebrow: "ALUMNI RETURN",
    title: "由參加者，到下一屆的共同設計者",
    excerpt: "第一屆不只是一次活動。當舊生把親身經驗帶回團隊，計劃才真正開始形成循環。",
    image: "/images/mentor-chat.jpg"
  },
  {
    slug: "the-idea-was-rebuilt-twice",
    eyebrow: "BEHIND THE PROCESS",
    title: "三日內，個 Idea 被推翻咗兩次",
    excerpt: "真正的轉折，不是有人給出標準答案，而是團隊開始願意放低最初的假設。",
    image: "/images/participant-pitch.jpg"
  },
  {
    slug: "not-a-perfect-pitch",
    eyebrow: "A REAL MOMENT",
    title: "唔完美的簡報，反而令問題變得清楚",
    excerpt: "H Infinity 重視的不是包裝得最完整，而是能否真誠面對問題、回應社群和持續修正。",
    image: "/images/bootcamp-circle.jpg"
  }
];

export const people = [
  { name: "Programme Curatorial Team", role: "策劃及項目設計", note: "把不同背景的人、方法與資源連接起來。" },
  { name: "First Cohort Alumni", role: "參加者與回流成員", note: "由親歷者成為下一屆的同行者。" },
  { name: "Cross-sector Mentors", role: "導師、講者及評審", note: "以文化、設計及社會實踐經驗，挑戰構思亦陪伴落地。" }
];

export const programmeSteps = [
  { n: "01", en: "MEET", zh: "遇見同路人", image: "/images/mentor-chat.jpg" },
  { n: "02", en: "EXPLORE", zh: "拆開真正問題", image: "/images/team-phone.jpg" },
  { n: "03", en: "BUILD", zh: "把想法做成原型", image: "/images/peer-review.jpg" },
  { n: "04", en: "PITCH", zh: "用清楚語言溝通", image: "/images/participant-pitch.jpg" },
  { n: "05", en: "GROW", zh: "導師與種子支持", image: "/images/group-conversation.jpg" },
  { n: "06", en: "LAUNCH", zh: "讓項目真正發生", image: "/images/bootcamp-circle.jpg" }
];
