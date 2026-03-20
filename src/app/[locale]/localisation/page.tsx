'use client';

import dynamic from 'next/dynamic';
import {Clock, Info, Mail, MapPin} from 'lucide-react';
import {useTranslations} from 'next-intl';

const Map = dynamic(() => import('@/components/Map'), {
    ssr: false,
    loading: () => <MapFallback />
});

function MapFallback() {
    const t = useTranslations('LocationPage');

    return (
        <div className="w-full h-full bg-stone-100 dark:bg-stone-800 animate-pulse flex items-center justify-center">
            <span className="text-stone-400 font-medium">{t('map_loading')}</span>
        </div>
    );
}

export default function LocalisationPage() {
    const t = useTranslations('LocationPage');

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="mb-16">
                <h1 className="text-4xl font-bold text-stone-900 dark:text-stone-100 mb-4 transition-colors">{t('title')}</h1>
                <p className="text-stone-600 dark:text-stone-400 text-lg max-w-2xl transition-colors">
                    {t('description')}
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="space-y-8">
                    <div className="bg-stone-900 dark:bg-stone-800 text-white p-10 rounded-3xl shadow-xl shadow-stone-900/10 transition-colors">
                        <h2 className="text-2xl font-bold mb-8">{t('contact_info_title')}</h2>
                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <MapPin className="h-6 w-6 text-amber-500 flex-shrink-0" />
                                <div>
                                    <span className="block text-stone-400 text-[10px] font-bold uppercase tracking-widest mb-1">{t('address_label')}</span>
                                    <p className="text-lg leading-snug whitespace-pre-line">{t('address_value')}</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <Mail className="h-6 w-6 text-amber-500 flex-shrink-0" />
                                <div>
                                    <span className="block text-stone-400 text-[10px] font-bold uppercase tracking-widest mb-1">{t('email_label')}</span>
                                    <p className="text-lg">{t('email_value')}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-amber-50 dark:bg-stone-900/50 p-10 rounded-3xl border border-amber-100 dark:border-stone-800 flex items-start gap-6 transition-colors">
                        <div className="p-3 bg-white dark:bg-stone-800 rounded-2xl text-amber-600 shadow-sm flex-shrink-0 transition-colors">
                            <Clock className="h-6 w-6" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-stone-900 dark:text-stone-100 mb-3 transition-colors">{t('office_hours_title')}</h3>
                            <p className="text-stone-600 dark:text-stone-400 transition-colors">
                                {t('office_hours_days')}<br />
                                <span className="font-bold text-stone-900 dark:text-stone-100">{t('morning_hours')}</span><br />
                                <span className="font-bold text-stone-900 dark:text-stone-100">{t('afternoon_hours')}</span>
                            </p>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-2 h-[600px] bg-stone-100 dark:bg-stone-800 rounded-3xl border border-stone-200 dark:border-stone-800 overflow-hidden relative group transition-colors">
                    <Map />
                </div>
            </div>

            <div className="mt-16 p-8 bg-stone-50 dark:bg-stone-900/50 rounded-3xl border border-stone-100 dark:border-stone-800 flex items-center gap-6 transition-colors">
                <div className="p-2 bg-amber-100 dark:bg-amber-900/20 rounded-lg text-amber-700 dark:text-amber-500">
                    <Info className="h-5 w-5" />
                </div>
                <p className="text-stone-600 dark:text-stone-400 text-sm transition-colors">
                    <strong>{t('visitor_note_title')}</strong> {t('visitor_note')}
                </p>
            </div>
        </div>
    );
}
