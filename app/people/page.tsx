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
        title="我哋想建立嘅，唔單止係一個個項目，而係凝聚一個社群。"
        titleEn="We are building more than individual projects—we are bringing a community together."
        intro="H Infinity 能一路延續，有賴一班人各司其職。策劃團隊、導師、顧問、舊生、參加者與合作夥伴，將自己的活力同經驗注入社群。"
        introEn="H Infinity keeps moving because different people each play a part. The programme team, mentors, advisors, alumni, participants and partners bring their energy and experience into the community."
      />

      <section className="section-tight">
        <div className="shell">
          <PeopleDirectory />
        </div>
      </section>
    </>
  );
}
