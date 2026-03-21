'use client';

import {useEffect, useState} from 'react';
import {ArrowRight, Calendar, Search, User} from 'lucide-react';
import {useLocale, useTranslations} from 'next-intl';

import {Link} from '@/i18n/navigation';

export default function AnnoncesPage() {
    const [annonces, setAnnonces] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const t = useTranslations('AnnouncementsPage');
    const locale = useLocale();

    useEffect(() => {
        fetch('/api/annonces')
            .then(res => res.json())
            .then(data => {
                setAnnonces(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    const filteredAnnonces = Array.isArray(annonces)
        ? annonces.filter(a => a.titre.toLowerCase().includes(search.toLowerCase()))
        : [];

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-12">
                <h1 className="text-4xl font-bold text-stone-900 dark:text-stone-100 mb-4">{t('title')}</h1>
                <p className="text-stone-600 dark:text-stone-400 max-w-2xl text-lg">
                    {t('description')}
                </p>
            </div>

            <div className="mb-12 flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="relative w-full md:w-96">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-stone-400" />
                    <input
                        type="text"
                        placeholder={t('search_placeholder')}
                        className="w-full pl-12 pr-4 py-3 rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <div className="text-stone-500 dark:text-stone-400 text-sm italic">
                    {t('display_count', {count: filteredAnnonces.length})}
                </div>
            </div>

            {loading ? (
                <div className="flex justify-center py-24">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600" />
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredAnnonces.length > 0 ? (
                        filteredAnnonces.map((annonce) => (
                            <div key={annonce.id} className="bg-white dark:bg-stone-900 border border-stone-100 dark:border-stone-800 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group">
                                <div className="p-8">
                                    <div className="flex items-center gap-4 text-xs font-semibold text-amber-600 uppercase tracking-widest mb-4">
                                        <span className="flex items-center gap-1">
                                            <Calendar className="h-3 w-3" />
                                            {new Date(annonce.createdAt).toLocaleDateString(locale)}
                                        </span>
                                    </div>
                                    <h2 className="text-2xl font-bold text-stone-900 dark:text-stone-100 mb-4 group-hover:text-amber-600 transition-colors">
                                        {annonce.titre}
                                    </h2>
                                    <p className="text-stone-600 dark:text-stone-400 mb-8 line-clamp-4 leading-relaxed">
                                        {annonce.description}
                                    </p>
                                    <div className="flex items-center justify-between pt-6 border-t border-stone-50 dark:border-stone-800">
                                        <div className="flex items-center gap-2 text-stone-500 dark:text-stone-400 text-sm">
                                            <User className="h-4 w-4" />
                                            {annonce.auteur}
                                        </div>
                                        <Link href={`/annonces/${annonce.id}`} className="p-2 bg-stone-50 dark:bg-stone-800 rounded-full text-stone-900 dark:text-stone-100 hover:bg-amber-600 hover:text-white transition-all" aria-label={t('read_more')}>
                                            <ArrowRight className="h-5 w-5" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full py-24 text-center">
                            <p className="text-stone-400 dark:text-stone-500 text-lg">{t('no_results')}</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
