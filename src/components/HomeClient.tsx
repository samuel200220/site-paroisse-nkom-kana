"use client";

import { useTranslations } from "next-intl";

import {Link} from "@/i18n/navigation";

export default function HomeClient() {
  const t = useTranslations("Home");

  return (
    <section className="relative h-[80vh] flex items-center justify-center bg-stone-900 text-white overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1438232992991-995b7058bbb3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center opacity-40" />
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto animate-in fade-in zoom-in duration-700">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
          {t("title")}
        </h1>
        <p className="text-xl md:text-2xl text-stone-200 mb-10 font-light leading-relaxed">
          {t("subtitle")}
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/localisation"
            className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 rounded-full font-semibold transition-all shadow-lg shadow-amber-900/20"
          >
            {t("see_location")}
          </Link>
          <Link
            href="/programme"
            className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/30 px-8 py-4 rounded-full font-semibold transition-all"
          >
            {t("week_program")}
          </Link>
        </div>
      </div>
    </section>
  );
}
