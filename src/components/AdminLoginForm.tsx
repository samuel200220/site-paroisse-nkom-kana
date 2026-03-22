"use client";

import {useActionState} from "react";
import {ArrowRight, Lock, User} from "lucide-react";
import {useFormStatus} from "react-dom";
import {useTranslations} from "next-intl";

import type {AdminLoginState} from "@/app/[locale]/admin/login/actions";

const initialState: AdminLoginState = {
  error: "",
};

type AdminLoginFormProps = {
  action: (
    state: AdminLoginState,
    formData: FormData,
  ) => Promise<AdminLoginState>;
};

function SubmitButton() {
  const {pending} = useFormStatus();
  const t = useTranslations("AdminLogin");

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full bg-stone-900 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-stone-800 transition-all shadow-xl shadow-stone-900/10 group disabled:cursor-not-allowed disabled:opacity-70"
    >
      {pending ? t("submitting") : t("submit")}
      <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
    </button>
  );
}

export default function AdminLoginForm({action}: AdminLoginFormProps) {
  const [state, formAction] = useActionState(action, initialState);
  const t = useTranslations("AdminLogin");

  return (
    <form action={formAction} className="space-y-6">
      {state.error && (
        <div className="mb-6 p-4 bg-red-50 text-red-600 text-sm rounded-xl border border-red-100 font-medium">
          {t(state.error)}
        </div>
      )}

      <div>
        <label className="block text-xs font-bold text-stone-400 uppercase tracking-widest mb-2 px-1">
          {t("username")}
        </label>
        <div className="relative">
          <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-stone-300" />
          <input
            type="text"
            name="username"
            required
            autoComplete="username"
            className="w-full pl-12 pr-4 py-4 bg-stone-50 rounded-2xl border-none focus:ring-2 focus:ring-amber-500/20 text-stone-900"
            placeholder={t("username_placeholder")}
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold text-stone-400 uppercase tracking-widest mb-2 px-1">
          {t("password")}
        </label>
        <div className="relative">
          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-stone-300" />
          <input
            type="password"
            name="password"
            required
            autoComplete="current-password"
            className="w-full pl-12 pr-4 py-4 bg-stone-50 rounded-2xl border-none focus:ring-2 focus:ring-amber-500/20 text-stone-900"
            placeholder={t("password_placeholder")}
          />
        </div>
      </div>

      <SubmitButton />
    </form>
  );
}
