'use client';

import {Camera, GalleryHorizontal, MapPin} from 'lucide-react';
import {useLocale, useTranslations} from 'next-intl';
import {useState} from 'react';

import {getLocalizedGalleryItems} from '@/lib/galleryData';

export default function GalleryPage() {
    const locale = useLocale();
    const t = useTranslations('GalleryPage');
    const [activeFilter, setActiveFilter] = useState<string>('all');
    const items = getLocalizedGalleryItems(locale);

    const filters = [
        {value: 'all', label: t('filters.all')},
        {value: 'paroisse', label: t('filters.parish')},
        {value: 'activites', label: t('filters.activities')},
        {value: 'orphelinats', label: t('filters.orphanages')},
        {value: 'reunions', label: t('filters.meetings')},
        {value: 'celebrations', label: t('filters.celebrations')},
    ];

    const filteredItems = activeFilter === 'all'
        ? items
        : items.filter((item) => item.category === activeFilter);

    return (
        <div className="pb-24">
            <section className="relative overflow-hidden border-b border-stone-200 bg-stone-950 py-24 text-white dark:border-stone-800">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(245,158,11,0.24),_transparent_38%),radial-gradient(circle_at_bottom_right,_rgba(120,113,108,0.32),_transparent_42%)]" />
                <div className="relative mx-auto flex max-w-7xl flex-col gap-8 px-4 sm:px-6 lg:px-8">
                    <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-bold uppercase tracking-[0.28em] text-amber-300">
                        <GalleryHorizontal className="h-4 w-4" />
                        {t('eyebrow')}
                    </div>
                    <div className="max-w-4xl">
                        <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
                            {t('title')}
                        </h1>
                        <p className="mt-6 max-w-3xl text-lg leading-8 text-stone-300">
                            {t('description')}
                        </p>
                    </div>
                </div>
            </section>

            <section className="mx-auto max-w-7xl px-4 pt-12 sm:px-6 lg:px-8">
                <div className="mb-10 flex flex-wrap gap-3">
                    {filters.map((filter) => (
                        <button
                            key={filter.value}
                            onClick={() => setActiveFilter(filter.value)}
                            className={`rounded-full px-5 py-3 text-sm font-bold transition-all ${
                                activeFilter === filter.value
                                    ? 'bg-amber-600 text-white shadow-lg shadow-amber-900/20'
                                    : 'bg-white text-stone-700 hover:bg-stone-100 dark:bg-stone-900 dark:text-stone-200 dark:hover:bg-stone-800'
                            }`}
                        >
                            {filter.label}
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {filteredItems.map((item) => (
                        <article
                            key={item.id}
                            className="group overflow-hidden rounded-[28px] border border-stone-200 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-2xl dark:border-stone-800 dark:bg-stone-900"
                        >
                            <div className="relative h-72 overflow-hidden">
                                <img
                                    src={item.image}
                                    alt={item.localizedTitle}
                                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/15 to-transparent" />
                                <div className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full bg-black/45 px-3 py-2 text-[11px] font-bold uppercase tracking-[0.24em] text-white backdrop-blur-md">
                                    <Camera className="h-3.5 w-3.5 text-amber-300" />
                                    {filters.find((filter) => filter.value === item.category)?.label}
                                </div>
                            </div>

                            <div className="space-y-4 p-6">
                                <h2 className="text-2xl font-bold text-stone-900 dark:text-stone-100">
                                    {item.localizedTitle}
                                </h2>
                                <p className="leading-7 text-stone-600 dark:text-stone-400">
                                    {item.localizedDescription}
                                </p>
                                <div className="flex items-center gap-2 text-sm font-medium text-amber-700 dark:text-amber-400">
                                    <MapPin className="h-4 w-4" />
                                    {item.localizedLocation}
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </section>
        </div>
    );
}
