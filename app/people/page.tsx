import { Localized } from "@/components/i18n";
import { PageHero } from "@/components/page-hero";
import { people } from "@/lib/content";

export const metadata = { title: "人物與社群" };

export default function PeoplePage() {
  return (
    <>
      <PageHero eyebrow="人物與網絡" eyebrowEn="PEOPLE & NETWORK" title="一個計劃，由好多次真實連結組成。" titleEn="A programme is made of many real connections." intro="參加者、舊生、導師、策劃團隊及合作夥伴共同構成 H Infinity。正式網站可逐步加入人物 Profile 與所屬 Cohort。" introEn="Participants, alumni, mentors, the curatorial team and partners form H Infinity together. The live website can gradually add profiles and cohort connections." />
      <section className="section-tight"><div className="shell people-grid">{people.map((person) => <article className="person-card motion-card" key={person.name}><Localized as="strong" zh={person.role} en={person.roleEn} /><h3>{person.name}</h3><Localized as="p" zh={person.note} en={person.noteEn} /></article>)}</div></section>
    </>
  );
}
