'use client';

import {useEffect, useState} from 'react';
import {Clock, Library, Music, User} from 'lucide-react';
import {useTranslations} from 'next-intl';

export default function ChoralesPage() {
    const [chorales, setChorales] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const t = useTranslations('ChoirsPage');

    useEffect(() => {
        fetch('/api/chorales')
            .then(res => res.json())
            .then(data => {
                setChorales(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="mb-16 text-center">
                <h1 className="text-4xl md:text-5xl font-bold text-stone-900 dark:text-stone-100 mb-6 font-serif tracking-tight">{t('title')}</h1>
                <p className="text-stone-600 dark:text-stone-400 max-w-2xl mx-auto text-lg leading-relaxed font-light italic">
                    {t('quote')}
                </p>
            </div>

            {loading ? (
                <div className="flex justify-center py-24">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600" />
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {chorales.length > 0 ? (
                        chorales.map((chorale) => (
                            <div key={chorale.id} className="bg-white dark:bg-stone-900 rounded-3xl overflow-hidden border border-stone-100 dark:border-stone-800 shadow-sm hover:shadow-xl transition-all duration-500 group">
                                <div className="bg-stone-900 dark:bg-stone-950 p-8 text-white relative">
                                    <Music className="absolute top-8 right-8 h-12 w-12 text-amber-500/20 group-hover:scale-110 transition-transform" />
                                    <h2 className="text-3xl font-bold mb-2 pr-12">{chorale.nom}</h2>
                                    <div className="flex items-center gap-2 text-amber-200 text-sm font-medium">
                                        <User className="h-4 w-4" />
                                        <span>{t('directed_by', {name: chorale.responsable})}</span>
                                    </div>
                                </div>

                                <div className="p-8">
                                    <div className="flex items-start gap-4 mb-8">
                                        <div className="p-3 bg-stone-50 dark:bg-stone-950 rounded-2xl text-stone-900 dark:text-stone-100">
                                            <Clock className="h-6 w-6" />
                                        </div>
                                        <div>
                                            <h3 className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-1">{t('rehearsals')}</h3>
                                            <p className="text-stone-900 dark:text-stone-100 font-semibold text-lg">{chorale.horaireRepetition}</p>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center">
                                            <h3 className="text-xs font-bold text-stone-400 uppercase tracking-widest flex items-center gap-2">
                                                <Library className="h-4 w-4" />
                                                {t('current_repertoire')}
                                            </h3>
                                            <span className="text-xs bg-amber-50 text-amber-600 px-3 py-1 rounded-full font-bold">
                                                {t('songs_count', {count: chorale.chants?.length || 0})}
                                            </span>
                                        </div>

                                        <ul className="grid grid-cols-1 gap-2">
                                            {chorale.chants?.map((chant: string, idx: number) => (
                                                <li key={idx} className="flex items-center gap-3 text-stone-600 dark:text-stone-300 bg-stone-50 dark:bg-stone-950 p-4 rounded-xl border border-transparent hover:border-stone-200 dark:hover:border-stone-700 transition-all font-medium">
                                                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 flex items-center justify-center text-[10px] text-stone-400 group-hover:text-amber-600 group-hover:border-amber-200 transition-colors">
                                                        {idx + 1}
                                                    </span>
                                                    {chant}
                                                </li>
                                            ))}
                                            {(!chorale.chants || chorale.chants.length === 0) && (
                                                <p className="text-stone-400 italic text-sm">{t('no_songs')}</p>
                                            )}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full py-24 text-center bg-white dark:bg-stone-900 rounded-3xl border border-stone-100 dark:border-stone-800">
                            <Music className="h-16 w-16 text-stone-200 dark:text-stone-700 mx-auto mb-4" />
                            <p className="text-stone-400 dark:text-stone-500 text-lg">{t('empty')}</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
