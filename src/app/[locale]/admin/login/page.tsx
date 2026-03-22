import {Church} from "lucide-react";
import {getTranslations} from "next-intl/server";

import {loginAdminAction} from "./actions";
import AdminLoginForm from "@/components/AdminLoginForm";

type AdminLoginPageProps = {
  params: Promise<{locale: string}>;
  searchParams: Promise<{next?: string}>;
};

export default async function AdminLoginPage({
  params,
  searchParams,
}: AdminLoginPageProps) {
  const {locale} = await params;
  const {next} = await searchParams;
  const t = await getTranslations("AdminLogin");
  const action = loginAdminAction.bind(null, locale, next);

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950 flex items-center justify-center p-4 transition-colors">
      <div className="max-w-md w-full">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center p-3 bg-amber-600 rounded-2xl text-white mb-6 shadow-xl shadow-amber-900/20 dark:shadow-amber-950/30">
            <Church className="h-10 w-10" />
          </div>
          <h1 className="text-3xl font-bold text-stone-900 dark:text-stone-100 transition-colors">
            {t("title")}
          </h1>
          <p className="text-stone-500 dark:text-stone-400 mt-2 font-medium transition-colors">
            {t("description")}
          </p>
        </div>

        <div className="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 p-10 shadow-sm transition-colors">
          <AdminLoginForm action={action} />
        </div>

        <p className="text-center mt-8 text-stone-400 dark:text-stone-500 text-sm transition-colors">
          {t("footer", {year: new Date().getFullYear(), locale: locale.toUpperCase()})}
        </p>
      </div>
    </div>
  );
}
