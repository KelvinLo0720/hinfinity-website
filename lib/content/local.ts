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
    slug: "stories-return-to-the-street",
    title: "讓故事重新回到街上",
    englishTitle: "Stories Return to the Street",
    question: "一段被忽略的香港故事，可以點樣重新被聽見？",
    questionEn: "How might an overlooked Hong Kong story be heard again?",
    category: "地方故事 × 社區參與",
    categoryEn: "Local Stories × Community",
    image: "/images/team-phone.jpg",
    accent: "orange",
    summary: "由街坊口述、日常觀察與青年視角出發，把地方記憶變成可以被看見、被討論的公共文化行動。",
    summaryEn: "Starting with oral histories, everyday observation and youth perspectives, the team turns local memory into a public cultural action that can be seen and discussed.",
    context: "團隊留意到，很多地方故事只停留在熟悉該區的人之間。當城市節奏改變，記憶往往比建築更快消失。",
    contextEn: "The team noticed that many local stories remain within small circles of people who already know the neighbourhood. As the city changes, memories can disappear faster than buildings.",
    shift: "最初構思集中在『保存資料』；經過同儕回饋後，團隊轉向思考：怎樣令故事再次進入日常，而不是被封存在檔案內。",
    shiftEn: "The first idea focused on preserving information. Peer feedback shifted the question towards how stories could return to everyday life instead of staying sealed inside an archive.",
    process: "團隊以訪談、街區觀察、快速原型及小型公眾測試，逐步找出最容易讓陌生人參與的表達方式。",
    processEn: "Through interviews, neighbourhood observation, rapid prototypes and small public tests, the team explored formats that make it easier for strangers to take part.",
    outcome: "形成一套可延伸的地方故事展示概念，並建立首輪訪談與公眾測試框架。",
    outcomeEn: "The team developed an expandable local-story display concept and a first framework for interviews and public testing.",
    reflection: "文化保育不只是留住過去，而是創造一次讓今天的人願意停下來聽的相遇。",
    reflectionEn: "Cultural preservation is not only about keeping the past. It is about creating an encounter that makes people today willing to stop and listen."
  },
  {
    slug: "re-heritage",
    title: "Re:Heritage",
    englishTitle: "Re:Heritage",
    question: "文化保育可唔可以唔只講『以前』，而係同今日生活重新接軌？",
    questionEn: "Can heritage move beyond the past and reconnect with life today?",
    category: "文化保育 × 設計思維",
    categoryEn: "Heritage × Design Thinking",
    image: "/images/peer-review.jpg",
    accent: "blue",
    summary: "以青年生活語言重新整理文化內容，讓保育由單向介紹，變成可以參與、回應與再創作的過程。",
    summaryEn: "The project reframes cultural content through the language of youth, turning heritage from one-way explanation into a process of participation, response and reinterpretation.",
    context: "團隊認為，文化資訊並非不存在，而是常以距離感較大的方式出現，令年輕人難以代入。",
    contextEn: "The team felt that cultural information was available, but often presented with too much distance for young people to relate to it.",
    shift: "Bootcamp 期間，項目由『做更多內容』轉向『重新設計參與方式』，並將受眾體驗放在資訊量之前。",
    shiftEn: "During the bootcamp, the project moved from producing more content to redesigning the way people participate, placing audience experience before information volume.",
    process: "透過受眾訪談、內容拆解、情境測試與導師挑戰，團隊建立更生活化的文化接觸點。",
    processEn: "Audience interviews, content mapping, scenario tests and mentor challenges helped the team create more everyday points of cultural contact.",
    outcome: "完成可測試的內容框架與體驗原型，為後續社區合作建立基礎。",
    outcomeEn: "The team completed a testable content framework and experience prototype, creating a base for future community collaboration.",
    reflection: "真正的傳承，不是把答案交給下一代，而是讓下一代有位置加入問題。",
    reflectionEn: "Real transmission is not giving the next generation an answer. It is giving them a place inside the question."
  },
  {
    slug: "room-for-ideas",
    title: "有想法的房間",
    englishTitle: "Room for Ideas",
    question: "當一個人未有完整計劃，社群可以點樣陪佢行出第一步？",
    questionEn: "How can a community support someone who has an idea but not yet a complete plan?",
    category: "青年成長 × 同儕實驗",
    categoryEn: "Youth Growth × Peer Experiment",
    image: "/images/group-conversation.jpg",
    accent: "lime",
    summary: "從安全試錯與同儕支持出發，探索一個不以勝負為核心的青年構思空間。",
    summaryEn: "Starting with safe experimentation and peer support, the project explores an idea space for youth that is not built around winning or losing.",
    context: "不少青年不是沒有想法，而是覺得自己未夠資格、未有資源，或者未準備好公開說出來。",
    contextEn: "Many young people do have ideas, but feel unqualified, under-resourced or not ready to say them out loud.",
    shift: "團隊放棄以完成度作為參與門檻，轉而設計一個能承載模糊、疑問和反覆修改的過程。",
    shiftEn: "The team stopped using completeness as an entry requirement and instead designed a process that can hold uncertainty, questions and repeated revision.",
    process: "項目利用小組對話、問題卡、快速分享和反思練習，測試不同程度的參與方式。",
    processEn: "Small-group conversations, question cards, rapid sharing and reflection exercises were used to test different levels of participation.",
    outcome: "建立一套可用於青年聚會及構思工作坊的活動流程。",
    outcomeEn: "The project produced an activity flow that can be used in youth gatherings and ideation workshops.",
    reflection: "不是每個人都需要被催促成為領袖；有時候，先有人願意認真聽，行動才會開始。",
    reflectionEn: "Not everyone needs to be pushed into becoming a leader. Sometimes action begins because someone is willing to listen seriously."
  }
];

export const stories: Story[] = [
  {
    slug: "from-participant-to-builder",
    eyebrow: "ALUMNI RETURN",
    title: "由參加者，到下一屆的共同設計者",
    titleEn: "From participant to co-designer of the next cohort",
    excerpt: "第一屆不只是一次活動。當舊生把親身經驗帶回團隊，計劃才真正開始形成循環。",
    excerptEn: "The first cohort was more than an event. The programme begins to form a real cycle when alumni bring their lived experience back into the team.",
    image: "/images/mentor-chat.jpg"
  },
  {
    slug: "the-idea-was-rebuilt-twice",
    eyebrow: "BEHIND THE PROCESS",
    title: "三日內，個 Idea 被推翻咗兩次",
    titleEn: "The idea was rebuilt twice in three days",
    excerpt: "真正的轉折，不是有人給出標準答案，而是團隊開始願意放低最初的假設。",
    excerptEn: "The real turning point was not receiving a standard answer. It was the team becoming willing to let go of its first assumptions.",
    image: "/images/participant-pitch.jpg"
  },
  {
    slug: "not-a-perfect-pitch",
    eyebrow: "A REAL MOMENT",
    title: "唔完美的簡報，反而令問題變得清楚",
    titleEn: "An imperfect pitch made the problem clearer",
    excerpt: "H Infinity 重視的不是包裝得最完整，而是能否真誠面對問題、回應社群和持續修正。",
    excerptEn: "H Infinity values honest engagement with the problem, the community and continuous revision more than a perfectly packaged presentation.",
    image: "/images/bootcamp-circle.jpg"
  }
];

export const people = [
  { name: "Programme Curatorial Team", role: "策劃及項目設計", roleEn: "Curatorial & Programme Design", note: "把不同背景的人、方法與資源連接起來。", noteEn: "Connecting people, methods and resources across different backgrounds." },
  { name: "First Cohort Alumni", role: "參加者與回流成員", roleEn: "Participants & Returning Alumni", note: "由親歷者成為下一屆的同行者。", noteEn: "Turning lived experience into support for the next cohort." },
  { name: "Cross-sector Mentors", role: "導師、講者及評審", roleEn: "Mentors, Speakers & Judges", note: "以文化、設計及社會實踐經驗，挑戰構思亦陪伴落地。", noteEn: "Challenging ideas and supporting implementation through cultural, design and social-practice experience." }
];

export const programmeSteps = [
  { n: "01", en: "MEET", zh: "遇見同路人", enTitle: "Meet fellow travellers", image: "/images/mentor-chat.jpg" },
  { n: "02", en: "EXPLORE", zh: "拆開真正問題", enTitle: "Unpack the real problem", image: "/images/team-phone.jpg" },
  { n: "03", en: "BUILD", zh: "把想法做成原型", enTitle: "Build the idea into a prototype", image: "/images/peer-review.jpg" },
  { n: "04", en: "PITCH", zh: "用清楚語言溝通", enTitle: "Communicate with clarity", image: "/images/participant-pitch.jpg" },
  { n: "05", en: "GROW", zh: "導師與種子支持", enTitle: "Grow with mentors and seed support", image: "/images/group-conversation.jpg" },
  { n: "06", en: "LAUNCH", zh: "讓項目真正發生", enTitle: "Bring the project into the world", image: "/images/bootcamp-circle.jpg" }
];
