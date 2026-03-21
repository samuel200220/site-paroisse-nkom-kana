'use client';

import { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, X, Loader2, Calendar, ScrollText } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { sortProgrammeEntries } from '@/lib/programmeSchedule';

export default function AdminProgramme() {
    const [items, setItems] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [sortOrder, setSortOrder] = useState<'desc' | 'asc'>('asc');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<any>(null);
    const [formData, setFormData] = useState({
        jour: 'Dimanche',
        heure: '05/04/2026',
        activite: '',
        lieu: ''
    });
    const t = useTranslations('AdminProgramme');

    const days = [
        { value: 'Lundi', label: t('days.monday') },
        { value: 'Mardi', label: t('days.tuesday') },
        { value: 'Mercredi', label: t('days.wednesday') },
        { value: 'Jeudi', label: t('days.thursday') },
        { value: 'Vendredi', label: t('days.friday') },
        { value: 'Samedi', label: t('days.saturday') },
        { value: 'Dimanche', label: t('days.sunday') }
    ];

    const fetchItems = () => {
        setLoading(true);
        fetch('/api/programme').then(res => res.json()).then(data => {
            setItems(data);
            setLoading(false);
        }).catch(() => setLoading(false));
    };

    useEffect(() => { fetchItems(); }, []);

    const sortedItems = sortProgrammeEntries(items, sortOrder);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await fetch('/api/programme', {
            method: editingItem ? 'PUT' : 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(editingItem ? { ...formData, id: editingItem.id } : formData),
        });
        setIsModalOpen(false);
        fetchItems();
    };

    const handleDelete = async (id: string) => {
        if (confirm(t('delete_confirm'))) {
            await fetch(`/api/programme?id=${id}`, { method: 'DELETE' });
            fetchItems();
        }
    };

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-bold text-stone-900">{t('title')}</h1>
                    <p className="text-stone-500">{t('description')}</p>
                </div>
                <button
                    onClick={() => { setEditingItem(null); setFormData({ jour: 'Dimanche', heure: '05/04/2026', activite: '', lieu: '' }); setIsModalOpen(true); }}
                    className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all shadow-lg"
                >
                    <Plus className="h-5 w-5" />
                    {t('new_button')}
                </button>
            </div>

            <div className="max-w-sm">
                <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-stone-500">
                    {t('sort_label')}
                </label>
                <select
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value as 'desc' | 'asc')}
                    className="w-full rounded-2xl border border-stone-200 bg-white px-4 py-3 text-sm font-semibold text-stone-900 shadow-sm outline-none transition focus:border-amber-400"
                >
                    <option value="desc">{t('sort_recent')}</option>
                    <option value="asc">{t('sort_oldest')}</option>
                </select>
            </div>

            {loading ? (
                <div className="flex justify-center py-24">
                    <Loader2 className="h-8 w-8 text-amber-600 animate-spin" />
                </div>
            ) : (
                <div className="overflow-x-auto rounded-3xl border border-stone-200 bg-white shadow-sm">
                    <div className="min-w-[920px]">
                        <div className="grid grid-cols-[1fr_0.8fr_1.5fr_2.2fr_0.7fr] border-b border-stone-200 bg-stone-50">
                            <div className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-stone-500">{t('field_day')}</div>
                            <div className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-stone-500">{t('field_date')}</div>
                            <div className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-stone-500">{t('field_celebration')}</div>
                            <div className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-stone-500">{t('field_schedule')}</div>
                            <div className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-stone-500 text-right">{t('table_actions')}</div>
                        </div>

                        {sortedItems.length > 0 ? sortedItems.map(item => (
                            <div key={item.id} className="grid grid-cols-[1fr_0.8fr_1.5fr_2.2fr_0.7fr] border-b border-stone-100 last:border-b-0 hover:bg-stone-50/60 transition-colors group">
                                <div className="px-6 py-5">
                                    <div className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-3 py-1 text-xs font-bold uppercase tracking-wide text-amber-700">
                                        <Calendar className="h-3.5 w-3.5" />
                                        {days.find(day => day.value === item.jour)?.label ?? item.jour}
                                    </div>
                                </div>
                                <div className="px-6 py-5 text-sm font-bold text-stone-900">{item.heure}</div>
                                <div className="px-6 py-5 text-sm font-semibold uppercase leading-6 text-stone-900">{item.activite || t('celebration_empty')}</div>
                                <div className="px-6 py-5">
                                    <div className="space-y-2">
                                        {item.lieu.split('\n').filter(Boolean).map((line: string, index: number) => (
                                            <div key={`${item.id}-${index}`} className="flex items-start gap-2 text-sm text-stone-600">
                                                <ScrollText className="mt-0.5 h-4 w-4 flex-shrink-0 text-amber-600" />
                                                <span>{line}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="px-6 py-5">
                                    <div className="flex justify-end gap-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                                        <button
                                            onClick={() => { setEditingItem(item); setFormData({ jour: item.jour, heure: item.heure, activite: item.activite, lieu: item.lieu }); setIsModalOpen(true); }}
                                            className="p-2 text-stone-400 hover:text-amber-600 transition-colors"
                                        >
                                            <Pencil className="h-4 w-4" />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(item.id)}
                                            className="p-2 text-stone-400 hover:text-red-600 transition-colors"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )) : (
                            <div className="px-8 py-6 text-stone-400 text-sm italic">{t('empty')}</div>
                        )}
                    </div>
                </div>
            )}

            {isModalOpen && (
                <div className="fixed inset-0 bg-stone-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden p-8">
                        <h2 className="text-2xl font-bold text-stone-900 mb-8">{editingItem ? t('modal_edit_title') : t('modal_create_title')}</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-stone-400 uppercase tracking-widest mb-1">{t('field_day')}</label>
                                    <select
                                        className="w-full px-4 py-3 bg-stone-50 rounded-xl border-none focus:ring-2 focus:ring-amber-500/20"
                                        value={formData.jour}
                                        onChange={(e) => setFormData({ ...formData, jour: e.target.value })}
                                    >
                                        {days.map(d => <option key={d.value} value={d.value}>{d.label}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-stone-400 uppercase tracking-widest mb-1">{t('field_date')}</label>
                                    <input
                                        type="text" required
                                        placeholder={t('date_placeholder')}
                                        className="w-full px-4 py-3 bg-stone-50 rounded-xl border-none focus:ring-2 focus:ring-amber-500/20"
                                        value={formData.heure}
                                        onChange={(e) => setFormData({ ...formData, heure: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-stone-400 uppercase tracking-widest mb-1">{t('field_celebration')}</label>
                                <input
                                    type="text" placeholder={t('celebration_placeholder')}
                                    className="w-full px-4 py-3 bg-stone-50 rounded-xl border-none focus:ring-2 focus:ring-amber-500/20"
                                    value={formData.activite}
                                    onChange={(e) => setFormData({ ...formData, activite: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-stone-400 uppercase tracking-widest mb-1">{t('field_schedule')}</label>
                                <textarea
                                    rows={6}
                                    required
                                    placeholder={t('schedule_placeholder')}
                                    className="w-full px-4 py-3 bg-stone-50 rounded-xl border-none focus:ring-2 focus:ring-amber-500/20"
                                    value={formData.lieu}
                                    onChange={(e) => setFormData({ ...formData, lieu: e.target.value })}
                                />
                            </div>
                            <div className="flex justify-end gap-3 pt-8">
                                <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-3 font-bold text-stone-400 ring-offset-background transition-colors hover:text-stone-900">{t('cancel')}</button>
                                <button type="submit" className="bg-amber-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-amber-700 transition-all">{t('save')}</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
