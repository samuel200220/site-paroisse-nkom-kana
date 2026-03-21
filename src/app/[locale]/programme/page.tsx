'use client';

import {useEffect, useState} from 'react';
import {Bell, CalendarDays, CheckCircle2, Sparkles} from 'lucide-react';
import {useTranslations} from 'next-intl';

import {Link} from '@/i18n/navigation';

export default function ProgrammePage() {
    const [programme, setProgramme] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const t = useTranslations('ProgrammePage');

    useEffect(() => {
        fetch('/api/programme')
            .then(res => res.json())
            .then(data => {
                setProgramme(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    const getDayLabel = (day: string) => {
        const labels: Record<string, string> = {
            Lundi: t('days.monday'),
            Mardi: t('days.tuesday'),
            Mercredi: t('days.wednesday'),
            Jeudi: t('days.thursday'),
            Vendredi: t('days.friday'),
            Samedi: t('days.saturday'),
            Dimanche: t('days.sunday')
        };

        return labels[day] ?? day;
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="mb-16">
                <h1 className="text-4xl font-bold text-stone-900 mb-4">{t('title')}</h1>
                <p className="text-stone-600 text-lg">
                    {t('description')}
                </p>
            </div>

            {loading ? (
                <div className="flex justify-center py-24">
                    <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-amber-600" />
                </div>
            ) : (
                <div className="overflow-x-auto rounded-3xl border border-stone-200 bg-white shadow-sm">
                    <div className="min-w-[880px]">
                        <div className="grid grid-cols-[1.1fr_0.8fr_1.4fr_2.4fr] border-b border-stone-200 bg-stone-900 text-white">
                            <div className="px-6 py-4 text-xs font-bold uppercase tracking-[0.24em] text-amber-400">{t('day_label')}</div>
                            <div className="px-6 py-4 text-xs font-bold uppercase tracking-[0.24em] text-amber-400">{t('date_label')}</div>
                            <div className="px-6 py-4 text-xs font-bold uppercase tracking-[0.24em] text-amber-400">{t('celebration_label')}</div>
                            <div className="px-6 py-4 text-xs font-bold uppercase tracking-[0.24em] text-amber-400">{t('activities_label')}</div>
                        </div>

                        {programme.length > 0 ? (
                            programme.map((item, index) => (
                                <div
                                    key={item.id ?? `${item.jour}-${item.heure}-${index}`}
                                    className="grid grid-cols-[1.1fr_0.8fr_1.4fr_2.4fr] border-b border-stone-100 last:border-b-0"
                                >
                                    <div className="px-6 py-5">
                                        <div className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-3 py-1 text-xs font-bold uppercase tracking-wide text-amber-700">
                                            <CalendarDays className="h-3.5 w-3.5" />
                                            {getDayLabel(item.jour)}
                                        </div>
                                    </div>
                                    <div className="px-6 py-5">
                                        <span className="inline-flex rounded-xl bg-stone-100 px-3 py-2 font-bold text-stone-900">
                                            {item.heure}
                                        </span>
                                    </div>
                                    <div className="px-6 py-5">
                                        <p className="text-sm font-bold uppercase leading-6 text-stone-900">
                                            {item.activite || t('celebration_empty')}
                                        </p>
                                    </div>
                                    <div className="px-6 py-5">
                                        <div className="space-y-2">
                                            {item.lieu.split('\n').filter(Boolean).map((line: string, lineIndex: number) => (
                                                <div key={`${item.id ?? index}-${lineIndex}`} className="flex items-start gap-3 rounded-2xl bg-stone-50 px-4 py-3">
                                                    <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-amber-600" />
                                                    <span className="text-sm leading-6 text-stone-700">{line}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="px-8 py-12 text-center italic text-stone-400">
                                {t('empty_day')}
                            </div>
                        )}
                    </div>
                </div>
            )}

            <div className="mt-24 p-12 bg-stone-900 rounded-3xl text-white flex flex-col md:flex-row items-center gap-12 overflow-hidden relative">
                <div className="absolute -bottom-12 -right-12 p-8 opacity-10">
                    <Bell className="h-64 w-64" />
                </div>
                <div className="relative z-10">
                    <h2 className="text-3xl font-bold mb-4">{t('confessions_title')}</h2>
                    <p className="text-stone-300 max-w-xl text-lg mb-0 font-light leading-relaxed">
                        {t('confessions_description')}
                    </p>
                </div>
                <div className="flex-shrink-0 relative z-10 w-full md:w-auto">
                    <Link href="/localisation" className="block w-full text-center bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 rounded-full font-bold transition-all whitespace-nowrap">
                        <span className="inline-flex items-center gap-2">
                            <Sparkles className="h-4 w-4" />
                            {t('contact_button')}
                        </span>
                    </Link>
                </div>
            </div>
        </div>
    );
}
