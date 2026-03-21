'use client';

import { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, X, Loader2, Music, Clock } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function AdminChorales() {
    const [chorales, setChorales] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingChorale, setEditingChorale] = useState<any>(null);
    const [formData, setFormData] = useState({
        nom: '',
        responsable: '',
        horaireRepetition: '',
        chantsStr: ''
    });
    const t = useTranslations('AdminChoirs');

    const fetchChorales = () => {
        setLoading(true);
        fetch('/api/chorales')
            .then(res => res.json())
            .then(data => {
                setChorales(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    };

    useEffect(() => {
        fetchChorales();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const chants = formData.chantsStr.split('\n').filter(c => c.trim() !== '');
        const body = {
            nom: formData.nom,
            responsable: formData.responsable,
            horaireRepetition: formData.horaireRepetition,
            chants,
            ...(editingChorale && { id: editingChorale.id })
        };

        await fetch('/api/chorales', {
            method: editingChorale ? 'PUT' : 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        });

        setIsModalOpen(false);
        setEditingChorale(null);
        setFormData({ nom: '', responsable: '', horaireRepetition: '', chantsStr: '' });
        fetchChorales();
    };

    const handleDelete = async (id: string) => {
        if (!confirm(t('delete_confirm'))) return;
        await fetch(`/api/chorales?id=${id}`, { method: 'DELETE' });
        fetchChorales();
    };

    const openEdit = (chorale: any) => {
        setEditingChorale(chorale);
        setFormData({
            nom: chorale.nom,
            responsable: chorale.responsable,
            horaireRepetition: chorale.horaireRepetition,
            chantsStr: (chorale.chants || []).join('\n')
        });
        setIsModalOpen(true);
    };

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-bold text-stone-900">{t('title')}</h1>
                    <p className="text-stone-500">{t('description')}</p>
                </div>
                <button
                    onClick={() => { setEditingChorale(null); setFormData({ nom: '', responsable: '', horaireRepetition: '', chantsStr: '' }); setIsModalOpen(true); }}
                    className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all shadow-lg"
                >
                    <Plus className="h-5 w-5" />
                    {t('new_button')}
                </button>
            </div>

            {loading ? (
                <div className="flex justify-center py-24">
                    <Loader2 className="h-8 w-8 text-amber-600 animate-spin" />
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {chorales.length > 0 ? chorales.map((chorale) => (
                        <div key={chorale.id} className="bg-white rounded-3xl border border-stone-200 p-6 flex flex-col justify-between shadow-sm hover:border-amber-200 transition-all">
                            <div>
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="p-3 bg-stone-900 text-amber-500 rounded-2xl">
                                        <Music className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-xl text-stone-900">{chorale.nom}</h3>
                                        <p className="text-stone-500 text-sm">{t('responsible_short', { name: chorale.responsable })}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 text-stone-600 text-sm mb-4">
                                    <Clock className="h-4 w-4" />
                                    <span>{chorale.horaireRepetition}</span>
                                </div>
                                <div className="text-stone-400 text-xs px-2 py-1 bg-stone-50 rounded inline-block">
                                    {t('songs_count', { count: chorale.chants?.length || 0 })}
                                </div>
                            </div>

                            <div className="flex justify-end gap-2 mt-8 pt-6 border-t border-stone-50">
                                <button
                                    onClick={() => openEdit(chorale)}
                                    className="p-2 text-stone-400 hover:text-amber-600 transition-all"
                                >
                                    <Pencil className="h-5 w-5" />
                                </button>
                                <button
                                    onClick={() => handleDelete(chorale.id)}
                                    className="p-2 text-stone-400 hover:text-red-600 transition-all"
                                >
                                    <Trash2 className="h-5 w-5" />
                                </button>
                            </div>
                        </div>
                    )) : (
                        <div className="col-span-full py-24 text-center text-stone-400 italic bg-white rounded-3xl border border-dashed border-stone-200">
                            {t('empty')}
                        </div>
                    )}
                </div>
            )}

            {isModalOpen && (
                <div className="fixed inset-0 bg-stone-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-3xl w-full max-w-xl shadow-2xl overflow-hidden">
                        <div className="p-8 border-b border-stone-50 flex justify-between items-center text-stone-900">
                            <h2 className="text-2xl font-bold">{editingChorale ? t('modal_edit_title') : t('modal_create_title')}</h2>
                            <button onClick={() => setIsModalOpen(false)}><X className="h-6 w-6" /></button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-8 space-y-4">
                            <input
                                type="text" placeholder={t('field_name_placeholder')} required
                                className="w-full px-4 py-3 rounded-xl border border-stone-200"
                                value={formData.nom}
                                onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                            />
                            <input
                                type="text" placeholder={t('field_responsible_placeholder')} required
                                className="w-full px-4 py-3 rounded-xl border border-stone-200"
                                value={formData.responsable}
                                onChange={(e) => setFormData({ ...formData, responsable: e.target.value })}
                            />
                            <input
                                type="text" placeholder={t('field_schedule_placeholder')} required
                                className="w-full px-4 py-3 rounded-xl border border-stone-200"
                                value={formData.horaireRepetition}
                                onChange={(e) => setFormData({ ...formData, horaireRepetition: e.target.value })}
                            />
                            <div>
                                <label className="block text-xs font-bold text-stone-400 uppercase tracking-widest mb-2 px-1">{t('songs_label')}</label>
                                <textarea
                                    rows={6}
                                    className="w-full px-4 py-3 rounded-xl border border-stone-200 font-mono text-sm"
                                    placeholder={t('songs_placeholder')}
                                    value={formData.chantsStr}
                                    onChange={(e) => setFormData({ ...formData, chantsStr: e.target.value })}
                                />
                            </div>

                            <div className="flex justify-end gap-3 pt-6">
                                <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-3 font-bold text-stone-400">{t('cancel')}</button>
                                <button type="submit" className="bg-stone-900 text-white px-8 py-3 rounded-xl font-bold">{t('save')}</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
