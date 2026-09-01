export const institutionOptions = [
  // Degree-awarding institutions
  "明德學院 / Centennial College",
  "香港城市大學 / City University of Hong Kong (CityU)",
  "宏恩基督教學院 / Gratia Christian College",
  "港專學院 / HKCT Institute of Higher Education",
  "香港演藝學院 / The Hong Kong Academy for Performing Arts (HKAPA)",
  "香港浸會大學 / Hong Kong Baptist University (HKBU)",
  "香港珠海學院 / Hong Kong Chu Hai College",
  "香港都會大學 / Hong Kong Metropolitan University (HKMU)",
  "香港能仁專上學院 / Hong Kong Nang Yan College of Higher Education",
  "香港樹仁大學 / Hong Kong Shue Yan University (HKSYU)",
  "嶺南大學 / Lingnan University (LU)",
  "聖方濟各大學 / Saint Francis University (SFU)",
  "香港高等教育科技學院 / Technological and Higher Education Institute of Hong Kong (THEi)",
  "香港中文大學 / The Chinese University of Hong Kong (CUHK)",
  "香港教育大學 / The Education University of Hong Kong (EdUHK)",
  "香港恒生大學 / The Hang Seng University of Hong Kong (HSUHK)",
  "香港理工大學 / The Hong Kong Polytechnic University (PolyU)",
  "香港科技大學 / The Hong Kong University of Science and Technology (HKUST)",
  "香港大學 / The University of Hong Kong (HKU)",
  "東華學院 / Tung Wah College",
  "香港伍倫貢學院 / UOW College Hong Kong",
  "耀中幼教學院 / Yew Chung College of Early Childhood Education",

  // University-affiliated / continuing / sub-degree institutions
  "香港城市大學專業進修學院 / CityU School of Continuing and Professional Education (SCOPE)",
  "香港浸會大學國際學院 / HKBU College of International Education (CIE)",
  "香港浸會大學持續教育學院 / HKBU School of Continuing Education (SCE)",
  "嶺南大學持續進修學院 / Lingnan Institute of Further Education (LIFE)",
  "香港中文大學專業進修學院 / CUHK School of Continuing and Professional Studies (CUSCS)",
  "香港教育大學持續專業教育學院 / EdUHK School of Continuing and Professional Education (SCPE)",
  "香港理工大學香港專上學院 / PolyU Hong Kong Community College (HKCC)",
  "香港理工大學專業進修學院 / PolyU School of Professional Education and Executive Development (SPEED)",
  "香港大學專業進修學院 / HKU School of Professional and Continuing Education (HKU SPACE)",
  "香港大學附屬學院 / HKU SPACE Community College",
  "香港大學專業進修學院保良局何鴻燊社區書院 / HKU SPACE Po Leung Kuk Stanley Ho Community College",
  "香港都會大學李嘉誠專業進修學院 / HKMU Li Ka Shing School of Professional and Continuing Education (LiPACE)",

  // Other current local post-secondary institutions
  "明愛白英奇專業學校 / Caritas Bianchi College of Careers",
  "明愛社區書院 / Caritas Institute of Community Education",
  "香港三育書院 / Hong Kong Adventist College",
  "香港藝術學院 / Hong Kong Art School",
  "香港科技專上書院 / Hong Kong Institute of Technology",
  "香港專業進修學校 / Hong Kong College of Technology",
  "青年會專業書院 / YMCA College of Careers",
  "香港建造學院 / Hong Kong Institute of Construction (HKIC)",

  // VTC member institutions
  "香港專業教育學院 / Hong Kong Institute of Vocational Education (IVE)",
  "香港知專設計學院 / Hong Kong Design Institute (HKDI)",
  "香港資訊科技學院 / Hong Kong Institute of Information Technology (HKIIT)",
  "才晉高等教育學院 / School for Higher and Professional Education (SHAPE)",
  "高峰進修學院 / Institute of Professional Education And Knowledge (PEAK)",
  "酒店及旅遊學院 / Hotel and Tourism Institute (HTI)",
  "中華廚藝學院 / Chinese Culinary Institute (CCI)",
  "國際廚藝學院 / International Culinary Institute (ICI)",
  "海事訓練學院 / Maritime Services Training Institute (MSTI)",
  "青年學院 / Youth College",
  "卓越培訓發展中心 / Pro-Act by VTC",
  "匯縱專業發展中心 / Integrated Vocational Development Centre (IVDC)",
  "展亮技能發展中心 / Shine Skills Centre"
] as const;

export const yearOfStudyOptions = [
  "Year 1",
  "Year 2",
  "Year 3",
  "Year 4",
  "Year 5 or above"
] as const;

export type InstitutionOption = (typeof institutionOptions)[number];
export type YearOfStudyOption = (typeof yearOfStudyOptions)[number];
