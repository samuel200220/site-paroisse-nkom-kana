import {
  Megaphone,
  Users,
  Music,
  Calendar,
  TrendingUp,
  Clock,
  ExternalLink,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

function formatRelativeDate(date: Date) {
  const diffMs = date.getTime() - Date.now();
  const diffHours = Math.round(diffMs / (1000 * 60 * 60));

  if (Math.abs(diffHours) < 24) {
    return new Intl.RelativeTimeFormat("fr", { numeric: "auto" }).format(
      diffHours,
      "hour",
    );
  }

  const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));
  return new Intl.RelativeTimeFormat("fr", { numeric: "auto" }).format(
    diffDays,
    "day",
  );
}

export default async function AdminDashboard() {
  const [
    annoncesCount,
    organisationsCount,
    choralesCount,
    programmeCount,
    recentAnnonces,
  ] = await Promise.all([
    prisma.annonce.count(),
    prisma.organisation.count(),
    prisma.chorale.count(),
    prisma.programme.count(),
    prisma.annonce.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
      select: {
        id: true,
        titre: true,
        auteur: true,
        createdAt: true,
      },
    }),
  ]);

  const stats = [
    {
      name: "Annonces",
      scale: "Total",
      count: annoncesCount,
      icon: <Megaphone className="h-6 w-6" />,
      color: "bg-blue-500",
      shadow: "shadow-blue-200",
    },
    {
      name: "Organisations",
      scale: "Total",
      count: organisationsCount,
      icon: <Users className="h-6 w-6" />,
      color: "bg-purple-500",
      shadow: "shadow-purple-200",
    },
    {
      name: "Chorales",
      scale: "Total",
      count: choralesCount,
      icon: <Music className="h-6 w-6" />,
      color: "bg-amber-500",
      shadow: "shadow-amber-200",
    },
    {
      name: "Programme",
      scale: "Total",
      count: programmeCount,
      icon: <Calendar className="h-6 w-6" />,
      color: "bg-emerald-500",
      shadow: "shadow-emerald-200",
    },
  ];

  const totalContent =
    annoncesCount + organisationsCount + choralesCount + programmeCount;

  return (
    <div>
      <div className="mb-12">
        <h1 className="text-3xl font-bold text-stone-900 dark:text-stone-100 mb-2 transition-colors">
          Tableau de Bord
        </h1>
        <p className="text-stone-500 dark:text-stone-400">
          Gérez le contenu de votre Église depuis cet espace.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="bg-white dark:bg-stone-900 p-6 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-sm transition-colors"
          >
            <div
              className={`w-12 h-12 ${stat.color} text-white rounded-xl flex items-center justify-center mb-4 shadow-lg ${stat.shadow} dark:shadow-none`}
            >
              {stat.icon}
            </div>
            <p className="text-stone-400 text-sm font-medium uppercase tracking-widest">
              {stat.name}
            </p>
            <div className="flex items-end justify-between">
              <span className="text-4xl font-bold text-stone-900 dark:text-stone-100">
                {stat.count}
              </span>
              <span className="text-stone-500 text-xs mb-1">{stat.scale}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 overflow-hidden shadow-sm transition-colors">
          <div className="p-6 border-b border-stone-50 dark:border-stone-800 flex items-center justify-between">
            <h2 className="font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
              <Clock className="h-5 w-5 text-stone-400" />
              Activités Récentes
            </h2>
            <Link
              href="/admin/annonces"
              className="text-amber-600 dark:text-amber-500 text-xs font-bold hover:underline"
            >
              Voir tout
            </Link>
          </div>

          <div className="p-0">
            {recentAnnonces.length > 0 ? (
              recentAnnonces.map((annonce) => (
                <div
                  key={annonce.id}
                  className="px-6 py-4 flex items-center gap-4 hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors border-b border-stone-50 dark:border-stone-800 last:border-0"
                >
                  <div className="w-10 h-10 bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-500 rounded-full flex items-center justify-center font-bold text-xs">
                    AN
                  </div>
                  <div className="flex-grow min-w-0">
                    <h4 className="text-sm font-bold text-stone-900 dark:text-stone-100 truncate">
                      {annonce.titre}
                    </h4>
                    <p className="text-xs text-stone-500 mt-1">
                      {formatRelativeDate(annonce.createdAt)} • Par{" "}
                      {annonce.auteur}
                    </p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-stone-300 dark:text-stone-600 flex-shrink-0" />
                </div>
              ))
            ) : (
              <div className="px-6 py-12 text-sm text-stone-400 italic">
                Aucune annonce récente pour le moment.
              </div>
            )}
          </div>
        </div>

        <div className="bg-stone-900 dark:bg-stone-800 rounded-3xl p-8 text-white relative overflow-hidden flex flex-col justify-between transition-colors">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <TrendingUp className="h-24 w-24" />
          </div>
          <div className="relative z-10">
            <h2 className="text-2xl font-bold mb-4">Aperçu du contenu</h2>
            <p className="text-stone-400 mb-4 max-w-sm leading-relaxed">
              Le site contient actuellement {totalContent} élément
              {totalContent > 1 ? "s" : ""} publiés, répartis entre les
              annonces, les groupes, les chorales et le programme.
            </p>
            <p className="text-stone-500 text-sm leading-relaxed">
              Les statistiques affichées dans ce tableau de bord proviennent
              désormais directement de la base de données distante.
            </p>
          </div>
          <Link
            href="/"
            target="_blank"
            className="relative z-10 self-start flex items-center gap-2 bg-white text-stone-900 px-6 py-3 rounded-xl font-bold hover:bg-stone-100 transition-colors shadow-xl"
          >
            Visiter le site <ExternalLink className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
