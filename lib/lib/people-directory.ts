export type PeopleCohort = {
  id: string;
  zh: string;
  en: string;
};

export type BasePerson = {
  id: string;
  nameZh: string;
  nameEn: string;
  roleZh: string;
  roleEn: string;
  image?: string;
};

export type ProgrammeTeamMember = BasePerson & {
  /**
   * 一個成員可以屬於多個 Cohort。
   * 例如由 Cohort 01 做到 Cohort 02：
   * cohorts: ["01", "02"]
   */
  cohorts: string[];
};

export type AdvisorMentor = BasePerson & {
  type: "advisor" | "mentor";

  /**
   * 只作資料紀錄，不用作 People page filter。
   * Mentor / Advisor 可以跨 Cohort。
   */
  cohorts?: string[];
};

export type AlumniMember = BasePerson & {
  cohort: string;
};

/**
 * Programme Team selector 會使用呢個列表。
 *
 * 之後開 Cohort 02，只需要加：
 *
 * {
 *   id: "02",
 *   zh: "第二屆",
 *   en: "Cohort 02"
 * }
 */
export const peopleCohorts: PeopleCohort[] = [
  {
    id: "01",
    zh: "第一屆",
    en: "Cohort 01"
  }
];

/**
 * PROGRAMME TEAM
 *
 * 只放 confirmed Programme Team members。
 *
 * Example:
 *
 * {
 *   id: "member-name",
 *   nameZh: "中文名",
 *   nameEn: "English Name",
 *   roleZh: "職位",
 *   roleEn: "Role",
 *   image: "/media/people/programme-team/member-name.jpg",
 *   cohorts: ["01"]
 * }
 */
export const programmeTeamMembers: ProgrammeTeamMember[] = [];

/**
 * ADVISORS & MENTORS
 *
 * 不按 Cohort filter。
 * 只加入 confirmed Advisor / Mentor。
 *
 * Example:
 *
 * {
 *   id: "mentor-name",
 *   nameZh: "中文名",
 *   nameEn: "English Name",
 *   roleZh: "導師",
 *   roleEn: "Mentor",
 *   image: "/media/people/advisors-mentors/mentor-name.jpg",
 *   type: "mentor",
 *   cohorts: ["01"]
 * }
 */
export const advisorsMentors: AdvisorMentor[] = [];

/**
 * ALUMNI
 *
 * Alumni 按原屬 Cohort 分組，
 * 但唔會使用 Programme Team 嗰個 selector。
 *
 * Example:
 *
 * {
 *   id: "alumni-name",
 *   nameZh: "中文名",
 *   nameEn: "English Name",
 *   roleZh: "H Infinity Alumni",
 *   roleEn: "H Infinity Alumni",
 *   image: "/media/people/cohort-01/alumni-name.jpg",
 *   cohort: "01"
 * }
 */
export const alumniMembers: AlumniMember[] = [];
