export const applicationConfig = {
  cohortLabel: "H Infinity Cohort 02",
  applicationOpen: "1 Sep 2026",
  applicationClose: "31 Oct 2026",
  maxTeamSize: 4,
  minTeamSize: 2,
  frontendOnly: true,
  questions: [
    {
      id: "q1",
      zh: "對你而言，甚麼是「香港文化」？",
      en: "What does “Hong Kong culture” mean to you?",
      helperZh: "冇標準答案。我哋想知道你點理解香港文化，以及你會由邊啲生活經驗、地方、人或文化現象去理解佢。",
      helperEn: "There is no model answer. Tell us how you understand Hong Kong culture through the people, places, experiences or cultural phenomena that matter to you.",
      suggested: "建議 150–300 字"
    },
    {
      id: "q2",
      zh: "你認為現時香港最需要甚麼類型的文化項目？為甚麼？",
      en: "What kind of cultural project does Hong Kong need most right now, and why?",
      helperZh: "可以由一個地方、一群人、一個文化現象，或者你觀察到但一直未有人處理嘅缺口開始。",
      helperEn: "You may start from a place, a group of people, a cultural phenomenon or a gap you feel has not been addressed.",
      suggested: "建議 200–400 字"
    },
    {
      id: "q3",
      zh: "如果有機會由你／你們發起一個文化項目，你最想做甚麼？",
      en: "If you could start a cultural project, what would you most want to do?",
      helperZh: "唔需要係完整 Proposal。可以講你想回應嘅文化／社會議題、關心嘅人或地方、初步形式，以及你希望帶來甚麼改變。若獲選，構思可以喺計劃期間繼續修改同發展。",
      helperEn: "It does not need to be a complete proposal. Tell us the issue, people or place you care about, an initial format, and the change you hope to create. The idea can evolve during the programme.",
      suggested: "建議 300–600 字"
    },
    {
      id: "q4",
      zh: "你認為文化可以如何在當代社會中延續、被重新演繹和實踐？",
      en: "How can culture continue, be reinterpreted and practised in today’s world?",
      helperZh: "你可以由自己熟悉嘅文化、生活經驗、媒介或者一個具體例子出發。",
      helperEn: "You may start from a cultural practice, lived experience, medium or concrete example that you know well.",
      suggested: "建議 200–400 字"
    },
    {
      id: "q5",
      zh: "你希望在 H Infinity 得到甚麼？你最希望獲得哪方面的支持、挑戰或成長？",
      en: "What do you hope to gain from H Infinity? What support, challenge or growth would matter most to you?",
      helperZh: "可以講 mentor、team、project methods、testing、resources，或者你自己希望突破嘅地方。",
      helperEn: "You may talk about mentors, team, project methods, testing, resources, or an area where you want to grow.",
      suggested: "建議 150–300 字"
    },
    {
      id: "q6",
      zh: "還有甚麼是你／你們想讓我們知道的？",
      en: "Is there anything else you would like us to know?",
      helperZh: "選填。可以補充一啲前面未有機會講，但你覺得對我哋理解你／你哋有幫助嘅事。",
      helperEn: "Optional. Add anything not covered above that you think would help us understand you or your team.",
      suggested: "選填 · 建議不多於 300 字"
    }
  ]
} as const;
