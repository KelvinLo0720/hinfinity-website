import { PageHero } from "@/components/page-hero";
import { PeopleDirectory } from "@/components/people-directory";

export const metadata = {
  title: "人物與社群"
};

export default function PeoplePage() {
  return (
    <>
      <PageHero
        eyebrow="人物與網絡"
        eyebrowEn="PEOPLE & NETWORK"
        title="真正推動一個 Idea 行落去，靠嘅係一班人。"
        titleEn="It takes a group of people to keep an idea moving."
        intro="H Infinity 由策劃團隊、導師、顧問、舊生、參加者與合作夥伴一齊構成。有人提供經驗，有人問問題，有人將第一屆的學習帶返下一屆。"
        introEn="H Infinity is shaped by the programme team, advisors, mentors, alumni, participants and partners. Some bring experience, some ask harder questions, and some carry learning from one cohort into the next."
      />

      <section className="section-tight">
        <div className="shell">
          <PeopleDirectory />
        </div>
      </section>
    </>
  );
}
