import {Clock3, MapPin, Phone, ShieldCheck, Users} from 'lucide-react';
import {getLocale, getTranslations} from 'next-intl/server';

import {Link} from '@/i18n/navigation';

export default async function ContactPage() {
    const locale = await getLocale();
    const t = await getTranslations('ContactPage');

    const administration = [
        {
            title: t('roles.parish_priest'),
            description: t('roles.parish_priest_description'),
            icon: <ShieldCheck className="h-6 w-6" />,
        },
        {
            title: t('roles.secretariat'),
            description: t('roles.secretariat_description'),
            icon: <Users className="h-6 w-6" />,
        },
        {
            title: t('roles.pastoral_council'),
            description: t('roles.pastoral_council_description'),
            icon: <Users className="h-6 w-6" />,
        },
        {
            title: t('roles.economic_council'),
            description: t('roles.economic_council_description'),
            icon: <ShieldCheck className="h-6 w-6" />,
        },
    ];

    const officeHours = locale === 'fr'
        ? ['Lundi a vendredi : 09:00 - 12:00', 'Lundi a vendredi : 14:00 - 18:00']
        : ['Monday to Friday: 09:00 - 12:00', 'Monday to Friday: 14:00 - 18:00'];

    return (
        <div className="pb-24">
            <section className="border-b border-stone-200 bg-gradient-to-br from-stone-100 via-white to-amber-50 py-24 dark:border-stone-800 dark:from-stone-950 dark:via-stone-950 dark:to-amber-950/20">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl">
                        <div className="mb-6 inline-flex rounded-full border border-amber-200 bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.24em] text-amber-700 dark:border-amber-900/40 dark:bg-stone-900 dark:text-amber-400">
                            {t('eyebrow')}
                        </div>
                        <h1 className="text-4xl font-bold tracking-tight text-stone-900 dark:text-stone-100 md:text-6xl">
                            {t('title')}
                        </h1>
                        <p className="mt-6 max-w-3xl text-lg leading-8 text-stone-600 dark:text-stone-400">
                            {t('description')}
                        </p>
                    </div>
                </div>
            </section>

            <section className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 pt-12 sm:px-6 lg:grid-cols-[1.3fr_0.9fr] lg:px-8">
                <div className="space-y-8">
                    <div className="rounded-[30px] border border-stone-200 bg-white p-8 shadow-sm dark:border-stone-800 dark:bg-stone-900">
                        <h2 className="mb-6 text-3xl font-bold text-stone-900 dark:text-stone-100">
                            {t('administration_title')}
                        </h2>
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            {administration.map((item) => (
                                <div
                                    key={item.title}
                                    className="rounded-3xl border border-stone-200 bg-stone-50 p-6 dark:border-stone-800 dark:bg-stone-950"
                                >
                                    <div className="mb-4 inline-flex rounded-2xl bg-amber-100 p-3 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400">
                                        {item.icon}
                                    </div>
                                    <h3 className="mb-3 text-xl font-bold text-stone-900 dark:text-stone-100">
                                        {item.title}
                                    </h3>
                                    <p className="leading-7 text-stone-600 dark:text-stone-400">
                                        {item.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="rounded-[30px] border border-stone-200 bg-stone-900 p-8 text-white shadow-xl shadow-stone-900/10 dark:border-stone-800">
                        <h2 className="mb-4 text-3xl font-bold">{t('pastoral_note_title')}</h2>
                        <p className="max-w-3xl text-lg leading-8 text-stone-300">
                            {t('pastoral_note')}
                        </p>
                    </div>
                </div>

                <aside className="space-y-6">
                    <div className="rounded-[30px] border border-stone-200 bg-white p-8 shadow-sm dark:border-stone-800 dark:bg-stone-900">
                        <h2 className="mb-6 text-2xl font-bold text-stone-900 dark:text-stone-100">
                            {t('useful_info_title')}
                        </h2>
                        <div className="space-y-5">
                            <div className="flex items-start gap-4">
                                <div className="rounded-2xl bg-amber-100 p-3 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400">
                                    <MapPin className="h-5 w-5" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-stone-900 dark:text-stone-100">{t('address_title')}</h3>
                                    <p className="mt-1 text-stone-600 dark:text-stone-400">{t('address_value')}</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="rounded-2xl bg-amber-100 p-3 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400">
                                    <Clock3 className="h-5 w-5" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-stone-900 dark:text-stone-100">{t('office_hours_title')}</h3>
                                    <div className="mt-1 space-y-1 text-stone-600 dark:text-stone-400">
                                        {officeHours.map((line) => (
                                            <p key={line}>{line}</p>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="rounded-2xl bg-amber-100 p-3 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400">
                                    <Phone className="h-5 w-5" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-stone-900 dark:text-stone-100">{t('contact_title')}</h3>
                                    <p className="mt-1 text-stone-600 dark:text-stone-400">{t('contact_value')}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-[30px] border border-amber-200 bg-amber-50 p-8 dark:border-amber-900/30 dark:bg-amber-950/10">
                        <h2 className="mb-4 text-2xl font-bold text-stone-900 dark:text-stone-100">
                            {t('visit_title')}
                        </h2>
                        <p className="mb-6 leading-7 text-stone-700 dark:text-stone-400">
                            {t('visit_description')}
                        </p>
                        <Link
                            href="/localisation"
                            className="inline-flex rounded-full bg-amber-600 px-6 py-3 font-bold text-white transition-colors hover:bg-amber-700"
                        >
                            {t('visit_button')}
                        </Link>
                    </div>
                </aside>
            </section>
        </div>
    );
}
