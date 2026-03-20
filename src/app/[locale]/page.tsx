import {ArrowRight, Bell, Calendar, Church, Music, Users} from "lucide-react";
import {getLocale, getTranslations} from "next-intl/server";

import HomeClient from "@/components/HomeClient";
import {Link} from "@/i18n/navigation";
import {prisma} from "@/lib/prisma";

export const dynamic = "force-dynamic";

function formatDate(date: Date, locale: string) {
  return new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

export default async function Home() {
  const locale = await getLocale();
  const t = await getTranslations("Home");
  let dbUnavailable = false;
  let annonces: Array<{
    id: string;
    titre: string;
    description: string;
    createdAt: Date;
  }> = [];

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

  return (
    <div className="flex flex-col gap-24 pb-24">
      <HomeClient />
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex justify-between items-end mb-12 gap-4">
          <div>
            <h2 className="text-3xl font-bold text-stone-900 mb-2">
              {t("recent_announcements_title")}
            </h2>
            <p className="text-stone-600">
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
          <div className="mb-8 rounded-2xl border border-amber-200 bg-amber-50 px-6 py-4 text-sm text-amber-800">
            {t("unavailable")}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {annonces.length > 0 ? (
            annonces.map((annonce) => (
              <div
                key={annonce.id}
                className="bg-white border border-stone-200 rounded-2xl p-6 hover:shadow-xl transition-shadow group"
              >
                <div className="bg-amber-100 h-1 w-12 mb-6 group-hover:w-full transition-all duration-500" />
                <span className="text-stone-400 text-xs font-medium uppercase tracking-widest">
                  {formatDate(annonce.createdAt, locale)}
                </span>
                <h3 className="text-xl font-bold mt-2 mb-4 group-hover:text-amber-600 transition-colors">
                  {annonce.titre}
                </h3>
                <p className="text-stone-600 line-clamp-3 mb-6">
                  {annonce.description}
                </p>
                <Link
                  href={`/annonces/${annonce.id}`}
                  className="text-stone-900 font-medium text-sm flex items-center gap-2"
                >
                  {t("read_more")} <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            ))
          ) : (
            <div className="md:col-span-3 bg-white border border-dashed border-stone-200 rounded-2xl p-10 text-center text-stone-400">
              {t("no_announcements")}
            </div>
          )}
        </div>
      </section>

      <section className="bg-stone-100 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-stone-900 mb-4 tracking-tight">
              {t("celebrations_title")}
            </h2>
            <p className="text-stone-600">{t("celebrations_subtitle")}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {day: t("program_days.monday"), time: "06:30", activity: t("program_items.morning_mass"), icon: <Bell />},
              {day: t("program_days.wednesday"), time: "18:00", activity: t("program_items.rosary_prayer"), icon: <Calendar />},
              {day: t("program_days.friday"), time: "17:00", activity: t("program_items.stations_cross"), icon: <Users />},
              {day: t("program_days.sunday"), time: "09:00", activity: t("program_items.sunday_mass"), icon: <Music />},
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-white p-8 rounded-2xl border border-stone-200/50 flex flex-col items-center text-center"
              >
                <div className="p-3 bg-stone-50 rounded-xl mb-4 text-amber-600">
                  {item.icon}
                </div>
                <span className="text-stone-400 font-medium mb-1 uppercase tracking-tighter text-xs">
                  {item.day}
                </span>
                <span className="text-2xl font-bold text-amber-600 mb-2">
                  {item.time}
                </span>
                <h4 className="text-stone-900 font-semibold">{item.activity}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

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
              className="bg-white text-amber-600 px-8 py-4 rounded-full font-bold hover:bg-stone-100 transition-colors"
            >
              {t("cta_button")}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
