import {ArrowRight, Bell, Calendar, Church, Music, Users} from "lucide-react";
import {getLocale, getTranslations} from "next-intl/server";

import HomeClient from "@/components/HomeClient";
import {Link} from "@/i18n/navigation";
import {getLocalizedGalleryItems} from "@/lib/galleryData";
import {PROGRAMME_2026, parseProgrammeDate} from "@/lib/programmeSchedule";
import {prisma} from "@/lib/prisma";

export const dynamic = "force-dynamic";

function formatDate(date: Date, locale: string) {
  return new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

function getTodayDateString() {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: "Africa/Douala",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date());
}

function getFeaturedProgramme(programme: Array<{
  id?: string;
  jour: string;
  heure: string;
  activite: string;
  lieu: string;
}>) {
  const todayString = getTodayDateString();
  const todayTimestamp = parseProgrammeDate(todayString);

  if (todayTimestamp === null) {
    return null;
  }

  const validEntries = programme
    .map((entry) => ({
      ...entry,
      timestamp: parseProgrammeDate(entry.heure),
    }))
    .filter((entry): entry is typeof entry & {timestamp: number} => entry.timestamp !== null)
    .sort((left, right) => left.timestamp - right.timestamp);

  if (validEntries.length === 0) {
    return null;
  }

  const startIndex = validEntries.findIndex((entry) => entry.timestamp >= todayTimestamp);
  const normalizedStartIndex = startIndex === -1 ? 0 : startIndex;
  const selectedEntries: typeof validEntries = [];
  const usedDates = new Set<number>();

  for (let index = normalizedStartIndex; index < validEntries.length && selectedEntries.length < 4; index += 1) {
    const entry = validEntries[index];

    if (usedDates.has(entry.timestamp)) {
      selectedEntries.push(entry);
      continue;
    }

    usedDates.add(entry.timestamp);
    const sameDateEntries = validEntries.filter((candidate) => candidate.timestamp === entry.timestamp);

    for (const sameDateEntry of sameDateEntries) {
      if (selectedEntries.length < 4) {
        selectedEntries.push(sameDateEntry);
      }
    }
  }

  if (selectedEntries.length < 4 && normalizedStartIndex > 0) {
    for (let index = 0; index < normalizedStartIndex && selectedEntries.length < 4; index += 1) {
      const entry = validEntries[index];

      if (selectedEntries.some((selectedEntry) => selectedEntry.id === entry.id && selectedEntry.heure === entry.heure)) {
        continue;
      }

      selectedEntries.push(entry);
    }
  }

  return {
    dateString: selectedEntries[0].heure,
    entries: selectedEntries,
    isFallback: selectedEntries[0].heure !== todayString,
  };
}

export default async function Home() {
  const locale = await getLocale();
  const t = await getTranslations("Home");
  const galleryPreview = getLocalizedGalleryItems(locale).slice(0, 4);
  let dbUnavailable = false;
  let annonces: Array<{
    id: string;
    titre: string;
    description: string;
    createdAt: Date;
  }> = [];
  let programme: Array<{
    id?: string;
    jour: string;
    heure: string;
    activite: string;
    lieu: string;
  }> = PROGRAMME_2026;

  try {
    annonces = await prisma.annonce.findMany({
      orderBy: {createdAt: "desc"},
      take: 3,
      select: {
        id: true,
        titre: true,
        description: true,
        createdAt: true,
      },
    });
  } catch (error) {
    dbUnavailable = true;
    console.error("Home announcements fetch error:", error);
  }

  try {
    const dbProgramme = await prisma.programme.findMany({
      select: {
        id: true,
        jour: true,
        heure: true,
        activite: true,
        lieu: true,
      },
    });

    if (dbProgramme.length > 0) {
      programme = dbProgramme;
    }
  } catch (error) {
    console.error("Home programme fetch error:", error);
  }

  const featuredProgramme = getFeaturedProgramme(programme);
  const featuredActivities = featuredProgramme
    ? featuredProgramme.entries.flatMap((entry) =>
        entry.lieu.split("\n").filter(Boolean).map((line, index) => ({
          key: `${entry.id ?? entry.heure}-${index}`,
          day: entry.jour,
          date: entry.heure,
          celebration: entry.activite,
          activity: line,
        })),
      ).slice(0, 4)
    : [];

  return (
    <div className="flex flex-col gap-24 pb-24">
      <HomeClient />
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex justify-between items-end mb-12 gap-4">
          <div>
            <h2 className="text-3xl font-bold text-stone-900 dark:text-stone-100 mb-2">
              {t("recent_announcements_title")}
            </h2>
            <p className="text-stone-600 dark:text-stone-400">
              {t("recent_announcements_subtitle")}
            </p>
          </div>
          <Link
            href="/annonces"
            className="text-amber-600 font-semibold flex items-center gap-1 hover:gap-2 transition-all"
          >
            {t("see_all_announcements")} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {dbUnavailable && (
          <div className="mb-8 rounded-2xl border border-amber-200 bg-amber-50 px-6 py-4 text-sm text-amber-800 dark:border-amber-900/40 dark:bg-amber-950/20 dark:text-amber-300">
            {t("unavailable")}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {annonces.length > 0 ? (
            annonces.map((annonce) => (
              <div
                key={annonce.id}
                className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-6 hover:shadow-xl transition-shadow group"
              >
                <div className="bg-amber-100 h-1 w-12 mb-6 group-hover:w-full transition-all duration-500" />
                <span className="text-stone-400 text-xs font-medium uppercase tracking-widest">
                  {formatDate(annonce.createdAt, locale)}
                </span>
                <h3 className="text-xl font-bold text-stone-900 dark:text-stone-100 mt-2 mb-4 group-hover:text-amber-600 transition-colors">
                  {annonce.titre}
                </h3>
                <p className="text-stone-600 dark:text-stone-400 line-clamp-3 mb-6">
                  {annonce.description}
                </p>
                <Link
                  href={`/annonces/${annonce.id}`}
                  className="text-stone-900 dark:text-stone-100 font-medium text-sm flex items-center gap-2"
                >
                  {t("read_more")} <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            ))
          ) : (
            <div className="md:col-span-3 bg-white dark:bg-stone-900 border border-dashed border-stone-200 dark:border-stone-800 rounded-2xl p-10 text-center text-stone-400 dark:text-stone-500">
              {t("no_announcements")}
            </div>
          )}
        </div>
      </section>

      <section className="bg-stone-100 dark:bg-stone-900/50 py-24 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-stone-900 dark:text-stone-100 mb-4 tracking-tight">
              {t("celebrations_title")}
            </h2>
            <p className="text-stone-600 dark:text-stone-400">{t("celebrations_subtitle")}</p>
            {featuredProgramme && (
              <div className="mt-6 space-y-2">
                <p className="text-sm font-bold uppercase tracking-[0.24em] text-amber-600 dark:text-amber-400">
                  {featuredProgramme.isFallback ? t("next_available_label") : t("today_label")}
                </p>
                <p className="text-lg font-semibold text-stone-900 dark:text-stone-100">
                  {featuredProgramme.entries[0].jour} • {featuredProgramme.dateString}
                </p>
                {featuredProgramme.entries[0].activite && (
                  <p className="mx-auto max-w-3xl text-sm uppercase tracking-wide text-stone-500 dark:text-stone-400">
                    {featuredProgramme.entries[0].activite}
                  </p>
                )}
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {featuredActivities.length > 0 ? (
              featuredActivities.map((item, idx) => (
                <div
                  key={item.key}
                  className="bg-white dark:bg-stone-950 p-8 rounded-2xl border border-stone-200/50 dark:border-stone-800 flex flex-col items-center text-center"
                >
                  <div className="p-3 bg-stone-50 dark:bg-stone-900 rounded-xl mb-4 text-amber-600">
                    {idx % 4 === 0 ? <Bell /> : idx % 4 === 1 ? <Calendar /> : idx % 4 === 2 ? <Users /> : <Music />}
                  </div>
                  <span className="text-stone-400 font-medium mb-1 uppercase tracking-tighter text-xs">
                    {item.day}
                  </span>
                  <span className="text-2xl font-bold text-amber-600 mb-2">
                    {item.date}
                  </span>
                  <h4 className="text-stone-900 dark:text-stone-100 font-semibold">{item.activity}</h4>
                </div>
              ))
            ) : (
              <div className="col-span-full rounded-2xl border border-dashed border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950 px-8 py-10 text-center text-stone-500 dark:text-stone-400">
                {t("no_programme_available")}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="inline-flex rounded-full bg-amber-100 dark:bg-amber-900/20 px-4 py-2 text-xs font-bold uppercase tracking-[0.24em] text-amber-700 dark:text-amber-400">
              {t("gallery_preview_eyebrow")}
            </span>
            <h2 className="mt-4 text-3xl font-bold text-stone-900 dark:text-stone-100">
              {t("gallery_preview_title")}
            </h2>
            <p className="mt-2 max-w-2xl text-stone-600 dark:text-stone-400">
              {t("gallery_preview_description")}
            </p>
          </div>
          <Link
            href="/galerie"
            className="inline-flex items-center gap-2 text-amber-600 dark:text-amber-400 font-semibold"
          >
            {t("gallery_preview_button")} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
          {galleryPreview.map((item) => (
            <article
              key={item.id}
              className="overflow-hidden rounded-[28px] border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 shadow-sm transition-all hover:-translate-y-1 hover:shadow-2xl"
            >
              <div className="relative h-72 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.localizedTitle}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/75 via-stone-950/10 to-transparent" />
                <div className="absolute left-5 top-5 rounded-full bg-black/40 px-3 py-2 text-[11px] font-bold uppercase tracking-[0.24em] text-white backdrop-blur-sm">
                  {item.localizedLocation}
                </div>
              </div>
              <div className="space-y-3 p-6">
                <h3 className="text-xl font-bold text-stone-900 dark:text-stone-100">
                  {item.localizedTitle}
                </h3>
                <p className="text-sm leading-7 text-stone-600 dark:text-stone-400">
                  {item.localizedDescription}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section> */}

      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="bg-amber-600 rounded-3xl p-12 text-center text-white relative overflow-hidden shadow-2xl shadow-amber-900/20">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <Church className="h-48 w-48" />
          </div>
          <h2 className="text-4xl font-bold mb-6 relative z-10">
            {t("cta_title")}
          </h2>
          <p className="text-xl text-amber-50 mb-10 relative z-10 max-w-2xl mx-auto">
            {t("cta_description")}
          </p>
          <div className="flex justify-center gap-4 relative z-10">
            <Link
              href="/localisation"
              className="bg-white dark:bg-stone-100 text-amber-600 px-8 py-4 rounded-full font-bold hover:bg-stone-100 dark:hover:bg-white transition-colors"
            >
              {t("cta_button")}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
