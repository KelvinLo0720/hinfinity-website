import { PageHero } from "@/components/page-hero";
import { people } from "@/lib/content";

export const metadata = { title: "人物與社群" };

export default function PeoplePage() {
  return (
    <>
      <PageHero eyebrow="PEOPLE & NETWORK" title="一個計劃，由好多次真實連結組成。" intro="參加者、舊生、導師、策劃團隊及合作夥伴共同構成 H Infinity。正式網站可逐步加入人物 Profile 與所屬 Cohort。" />
      <section className="section-tight"><div className="shell people-grid">{people.map((person) => <article className="person-card" key={person.name}><strong>{person.role}</strong><h3>{person.name}</h3><p>{person.note}</p></article>)}</div></section>
    </>
  );
}
