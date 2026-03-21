'use client';

import {useEffect, useState} from 'react';
import {Activity, ShieldCheck, Users} from 'lucide-react';
import {useTranslations} from 'next-intl';

export default function OrganisationsPage() {
    const [organisations, setOrganisations] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const t = useTranslations('OrganizationsPage');

    useEffect(() => {
        fetch('/api/organisations')
            .then(res => res.json())
            .then(data => {
                setOrganisations(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="mb-16 text-center">
                <h1 className="text-4xl md:text-5xl font-bold text-stone-900 dark:text-stone-100 mb-6">{t('title')}</h1>
                <p className="text-stone-600 dark:text-stone-400 max-w-2xl mx-auto text-lg leading-relaxed">
                    {t('description')}
                </p>
            </div>

            {loading ? (
                <div className="flex justify-center py-24">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600" />
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {organisations.length > 0 ? (
                        organisations.map((org) => (
                            <div key={org.id} className="bg-white dark:bg-stone-900 rounded-3xl p-10 border border-stone-100 dark:border-stone-800 shadow-sm hover:shadow-2xl transition-all duration-500 group relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                                    <Users className="h-32 w-32" />
                                </div>

                                <h2 className="text-3xl font-bold text-stone-900 dark:text-stone-100 mb-6 group-hover:text-amber-600 transition-colors">{org.nom}</h2>
                                <p className="text-stone-600 dark:text-stone-400 text-lg mb-8 leading-relaxed">
                                    {org.description}
                                </p>

                                <div className="space-y-6 pt-8 border-t border-stone-50 dark:border-stone-800">
                                    <div className="flex items-start gap-4">
                                        <div className="p-2 bg-amber-50 rounded-lg text-amber-600">
                                            <ShieldCheck className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <span className="block text-xs font-bold text-stone-400 uppercase tracking-widest mb-1">{t('responsible')}</span>
                                            <span className="text-stone-900 dark:text-stone-100 font-semibold">{org.responsable}</span>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="p-2 bg-stone-50 dark:bg-stone-950 rounded-lg text-stone-600 dark:text-stone-300">
                                            <Activity className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <span className="block text-xs font-bold text-stone-400 uppercase tracking-widest mb-1">{t('activities')}</span>
                                            <p className="text-stone-700 dark:text-stone-300 leading-relaxed font-medium">
                                                {org.activites}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full py-24 text-center bg-white dark:bg-stone-900 rounded-3xl border border-stone-100 dark:border-stone-800">
                            <Users className="h-16 w-16 text-stone-200 dark:text-stone-700 mx-auto mb-4" />
                            <p className="text-stone-400 dark:text-stone-500 text-lg">{t('empty')}</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
