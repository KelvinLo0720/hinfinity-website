import Link from "next/link";
import { Localized } from "./i18n";
import { cohorts } from "@/lib/content";

type ProjectCohortNavProps = {
  active: "all" | string;
};

export function ProjectCohortNav({ active }: ProjectCohortNavProps) {
  return (
    <nav className="cohort-nav" aria-label="Project cohort navigation">
      <Localized
        as="span"
        className="cohort-nav-label"
        zh="按屆別瀏覽"
        en="Browse by cohort"
      />

      <div className="cohort-nav-links">
        <Link
          className={active === "all" ? "is-active" : ""}
          href="/projects"
        >
          <Localized zh="所有項目" en="All Projects" />
        </Link>

        {cohorts.map((cohort) => (
          <Link
            className={active === cohort.id ? "is-active" : ""}
            href={`/projects/${cohort.slug}`}
            key={cohort.id}
          >
            <Localized zh={cohort.zh} en={cohort.en} />
          </Link>
        ))}
      </div>
    </nav>
  );
}
