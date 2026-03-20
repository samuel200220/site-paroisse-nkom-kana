import type {Metadata} from "next";
import {Geist, Geist_Mono} from "next/font/google";
import {hasLocale, NextIntlClientProvider} from "next-intl";
import {getMessages, setRequestLocale} from "next-intl/server";
import {notFound} from "next/navigation";

import {routing} from "@/i18n/routing";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {Providers} from "@/components/Providers";

import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Paroisse Saint Jean de Nkom-Nkana | Accueil",
  description:
    "Bienvenue sur le site officiel de la Paroisse Saint Jean de Nkom-Nkana. Restez informés des annonces, événements et programmes de notre communauté.",
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

type RootLayoutProps = Readonly<{
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}>;

export default async function RootLayout({
  children,
  params,
}: RootLayoutProps) {
  const {locale} = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale} className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100 flex flex-col min-h-screen transition-colors duration-300`}
      >
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Providers>
            <Navbar />
            <main className="flex-grow pt-16">{children}</main>
            <Footer />
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
