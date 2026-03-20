import {Calendar, ChevronLeft, User} from "lucide-react";
import {getLocale, getTranslations} from "next-intl/server";
import {notFound} from "next/navigation";

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

type AnnonceDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function AnnonceDetailPage({
  params,
}: AnnonceDetailPageProps) {
  const {id} = await params;
  const locale = await getLocale();
  const t = await getTranslations("AnnouncementDetailPage");

  let annonce = null;

  try {
    annonce = await prisma.annonce.findUnique({
      where: {id},
    });
  } catch (error) {
    console.error("Annonce detail fetch error:", error);

    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="rounded-3xl border border-amber-200 bg-amber-50 px-8 py-10 text-amber-900">
          <h1 className="text-2xl font-bold mb-3">
            {t("temporarily_unavailable_title")}
          </h1>
          <p className="text-sm leading-7">
            {t("temporarily_unavailable_description")}
          </p>
        </div>
      </div>
    );
  }

  if (!annonce) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <Link
        href="/annonces"
        className="inline-flex items-center gap-2 text-sm font-semibold text-amber-600 hover:text-amber-700 transition-colors mb-8"
      >
        <ChevronLeft className="h-4 w-4" />
        {t("back")}
      </Link>

      <article className="bg-white rounded-3xl border border-stone-200 shadow-sm overflow-hidden">
        <div className="h-2 bg-amber-500" />

        <div className="p-8 md:p-12">
          <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-amber-600 uppercase tracking-widest mb-6">
            <span className="flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" />
              {formatDate(annonce.date, locale)}
            </span>
            <span className="flex items-center gap-1">
              <User className="h-3.5 w-3.5" />
              {annonce.auteur}
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-stone-900 tracking-tight mb-8">
            {annonce.titre}
          </h1>

          <div className="prose prose-stone max-w-none">
            <p className="text-lg leading-8 text-stone-700 whitespace-pre-line">
              {annonce.description}
            </p>
          </div>
        </div>
      </article>
    </div>
  );
}
