import { Localized } from "@/components/i18n";
import { PageHero } from "@/components/page-hero";
import { people } from "@/lib/content";

export const metadata = { title: "人物與社群" };

export default function PeoplePage() {
  return (
    <>
      <PageHero
        eyebrow="人物與網絡"
        eyebrowEn="PEOPLE & NETWORK"
        title="真正推一個 Idea 行落去，從來唔只靠一個人。"
        titleEn="Moving an idea forward is never a one-person job."
        intro="H Infinity 由策劃團隊、導師、顧問、舊生、參加者與合作夥伴一齊構成。有人提供經驗，有人問問題，有人將第一屆的學習帶返下一屆。"
        introEn="H Infinity is shaped by the programme team, advisors, mentors, alumni, participants and partners. Some bring experience, some ask harder questions, and some carry learning from one cohort into the next."
      />

      <section className="section-tight">
        <div className="shell people-grid">
          {people.map((person) => (
            <article className="person-card motion-card" key={person.name}>
              <Localized as="strong" zh={person.role} en={person.roleEn} />
              <h3>{person.name}</h3>
              <Localized as="p" zh={person.note} en={person.noteEn} />
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
