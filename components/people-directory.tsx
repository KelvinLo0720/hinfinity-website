"use client";

import Image from "next/image";
import { useState } from "react";

import { Localized } from "@/components/i18n";

import {
  advisorsMentors,
  alumniMembers,
  peopleCohorts,
  programmeTeamMembers,
  type BasePerson
} from "@/lib/people-directory";

import styles from "./people-directory.module.css";

function PersonCard({
  person
}: {
  person: BasePerson;
}) {
  const initials =
    person.nameEn
      .split(" ")
      .filter(Boolean)
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "∞";

  return (
    <article className={styles.memberCard}>
      <div className={styles.portraitWrap}>
        {person.image ? (
          <Image
            src={person.image}
            alt={person.nameZh || person.nameEn}
            fill
            sizes="
              (max-width: 700px) 42vw,
              (max-width: 1020px) 28vw,
              220px
            "
            className={styles.portrait}
          />
        ) : (
          <div
            className={styles.portraitFallback}
            aria-hidden="true"
          >
            {initials}
          </div>
        )}
      </div>

      <div className={styles.memberMeta}>
        <Localized
          as="h3"
          zh={person.nameZh || person.nameEn}
          en={person.nameEn || person.nameZh}
        />

        <Localized
          as="p"
          zh={person.roleZh}
          en={person.roleEn}
        />
      </div>
    </article>
  );
}

function EmptyState() {
  return (
    <div className={styles.emptyState}>
      <Localized
        zh="成員資料更新中"
        en="Member profiles coming soon"
      />
    </div>
  );
}

export function PeopleDirectory() {
  const [programmeCohort, setProgrammeCohort] =
    useState<string>("all");

  const visibleProgrammeMembers =
    programmeCohort === "all"
      ? programmeTeamMembers
      : programmeTeamMembers.filter((member) =>
          member.cohorts.includes(programmeCohort)
        );

  const alumniGroups = peopleCohorts
    .map((cohort) => ({
      cohort,
      members: alumniMembers.filter(
        (member) => member.cohort === cohort.id
      )
    }))
    .filter((group) => group.members.length > 0);

  return (
    <div className={styles.directory}>
      {/* PROGRAMME TEAM */}
      <section className={styles.peopleSection}>
        <div className={styles.sectionTop}>
          <div>
            <Localized
              as="p"
              className={styles.kicker}
              zh="策劃、製作與項目運作"
              en="PROGRAMME, PRODUCTION & OPERATIONS"
            />

            <h2>Programme Team</h2>
          </div>

          <div
            className={styles.cohortSelector}
            aria-label="Programme Team cohort"
          >
            <button
              type="button"
              className={
                programmeCohort === "all"
                  ? styles.activeCohort
                  : undefined
              }
              onClick={() => setProgrammeCohort("all")}
              aria-pressed={programmeCohort === "all"}
            >
              <Localized
                zh="所有屆別"
                en="All cohorts"
              />
            </button>

            {peopleCohorts.map((cohort) => (
              <button
                key={cohort.id}
                type="button"
                className={
                  programmeCohort === cohort.id
                    ? styles.activeCohort
                    : undefined
                }
                onClick={() =>
                  setProgrammeCohort(cohort.id)
                }
                aria-pressed={
                  programmeCohort === cohort.id
                }
              >
                <Localized
                  zh={cohort.zh}
                  en={cohort.en}
                />
              </button>
            ))}
          </div>
        </div>

        {visibleProgrammeMembers.length > 0 ? (
          <div className={styles.memberGrid}>
            {visibleProgrammeMembers.map((person) => (
              <PersonCard
                key={person.id}
                person={person}
              />
            ))}
          </div>
        ) : (
          <EmptyState />
        )}
      </section>

      {/* ADVISORS & MENTORS */}
      <section className={styles.peopleSection}>
        <div className={styles.sectionTop}>
          <div>
            <Localized
              as="p"
              className={styles.kicker}
              zh="問題、經驗與挑戰"
              en="QUESTIONS, EXPERIENCE & CHALLENGE"
            />

            <h2>Advisors & Mentors</h2>
          </div>
        </div>

        {advisorsMentors.length > 0 ? (
          <div className={styles.memberGrid}>
            {advisorsMentors.map((person) => (
              <PersonCard
                key={person.id}
                person={person}
              />
            ))}
          </div>
        ) : (
          <EmptyState />
        )}
      </section>

      {/* ALUMNI */}
      <section className={styles.peopleSection}>
        <div className={styles.sectionTop}>
          <div>
            <Localized
              as="p"
              className={styles.kicker}
              zh="參加者、實踐者與回流成員"
              en="PARTICIPANTS, PRACTITIONERS & RETURNING ALUMNI"
            />

            <h2>Alumni</h2>
          </div>
        </div>

        {alumniGroups.length > 0 ? (
          <div className={styles.alumniGroups}>
            {alumniGroups.map(
              ({ cohort, members }) => (
                <div
                  className={styles.alumniGroup}
                  key={cohort.id}
                >
                  <div
                    className={
                      styles.alumniGroupHeading
                    }
                  >
                    <Localized
                      as="h3"
                      zh={`${cohort.zh}舊生`}
                      en={`${cohort.en} Alumni`}
                    />

                    <span>
                      {String(members.length).padStart(
                        2,
                        "0"
                      )}
                    </span>
                  </div>

                  <div className={styles.memberGrid}>
                    {members.map((person) => (
                      <PersonCard
                        key={person.id}
                        person={person}
                      />
                    ))}
                  </div>
                </div>
              )
            )}
          </div>
        ) : (
          <EmptyState />
        )}
      </section>
    </div>
  );
}
