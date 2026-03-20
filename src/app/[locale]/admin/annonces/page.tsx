'use client';

import {useEffect, useState} from 'react';
import {Loader2, Pencil, Plus, Search, Trash2, X} from 'lucide-react';
import {useTranslations} from 'next-intl';

export default function AdminAnnonces() {
    const [annonces, setAnnonces] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingAnnonce, setEditingAnnonce] = useState<any>(null);
    const [formData, setFormData] = useState({
        titre: '',
        description: '',
        date: new Date().toISOString().split('T')[0],
        auteur: 'Administration'
    });
    const t = useTranslations('AdminAnnouncements');

    const fetchAnnonces = () => {
        setLoading(true);
        fetch('/api/annonces')
            .then(res => res.json())
            .then(data => {
                setAnnonces(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    };

    useEffect(() => {
        fetchAnnonces();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const method = editingAnnonce ? 'PUT' : 'POST';
        const body = editingAnnonce ? {...formData, id: editingAnnonce.id} : formData;

        await fetch('/api/annonces', {
            method,
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(body),
        });

        setIsModalOpen(false);
        setEditingAnnonce(null);
        setFormData({titre: '', description: '', date: new Date().toISOString().split('T')[0], auteur: 'Administration'});
        fetchAnnonces();
    };

    const handleDelete = async (id: string) => {
        if (!confirm(t('delete_confirm'))) return;
        await fetch(`/api/annonces?id=${id}`, {method: 'DELETE'});
        fetchAnnonces();
    };

    const openEdit = (annonce: any) => {
        setEditingAnnonce(annonce);
        setFormData({
            titre: annonce.titre,
            description: annonce.description,
            date: new Date(annonce.date).toISOString().split('T')[0],
            auteur: annonce.auteur
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
                    onClick={() => { setEditingAnnonce(null); setIsModalOpen(true); }}
                    className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all shadow-lg shadow-amber-900/10"
                >
                    <Plus className="h-5 w-5" />
                    {t('new_button')}
                </button>
            </div>

            <div className="bg-white rounded-3xl border border-stone-200 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-stone-50 bg-stone-50/50">
                    <div className="relative max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" />
                        <input
                            type="text"
                            placeholder={t('search_placeholder')}
                            className="w-full pl-10 pr-4 py-2 rounded-lg border border-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-500/20 text-sm"
                        />
                    </div>
                </div>

                {loading ? (
                    <div className="flex justify-center py-24">
                        <Loader2 className="h-8 w-8 text-amber-600 animate-spin" />
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[720px] text-left">
                            <thead>
                                <tr className="bg-stone-50 text-stone-400 text-[10px] font-bold uppercase tracking-widest border-b border-stone-100">
                                    <th className="px-8 py-4">{t('table_title')}</th>
                                    <th className="px-8 py-4">{t('table_author')}</th>
                                    <th className="px-8 py-4">{t('table_date')}</th>
                                    <th className="px-8 py-4 text-right">{t('table_actions')}</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-stone-50">
                                {annonces.length > 0 ? annonces.map((annonce) => (
                                    <tr key={annonce.id} className="hover:bg-stone-50/50 transition-colors group">
                                        <td className="px-8 py-4">
                                            <span className="font-bold text-stone-900 block">{annonce.titre}</span>
                                            <span className="text-xs text-stone-500 line-clamp-1">{annonce.description}</span>
                                        </td>
                                        <td className="px-8 py-4 text-stone-600 text-sm whitespace-nowrap">{annonce.auteur}</td>
                                        <td className="px-8 py-4 text-stone-600 text-sm whitespace-nowrap">
                                            {new Date(annonce.date).toLocaleDateString()}
                                        </td>
                                        <td className="px-8 py-4 text-right">
                                            <div className="flex justify-end gap-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                                                <button onClick={() => openEdit(annonce)} className="p-2 text-stone-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-all">
                                                    <Pencil className="h-4 w-4" />
                                                </button>
                                                <button onClick={() => handleDelete(annonce.id)} className="p-2 text-stone-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all">
                                                    <Trash2 className="h-4 w-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan={4} className="px-8 py-12 text-center text-stone-400">
                                            {t('empty')}
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-stone-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
                        <div className="p-8 border-b border-stone-50 flex justify-between items-center">
                            <h2 className="text-2xl font-bold text-stone-900">
                                {editingAnnonce ? t('modal_edit_title') : t('modal_create_title')}
                            </h2>
                            <button onClick={() => setIsModalOpen(false)} className="text-stone-400 hover:text-stone-900 transition-colors">
                                <X className="h-6 w-6" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-8 space-y-6">
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-bold text-stone-700 mb-2">{t('field_title')}</label>
                                    <input type="text" required className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-500/20" placeholder={t('title_placeholder')} value={formData.titre} onChange={(e) => setFormData({...formData, titre: e.target.value})} />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-stone-700 mb-2">{t('field_description')}</label>
                                    <textarea required rows={4} className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-500/20" placeholder={t('description_placeholder')} value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-bold text-stone-700 mb-2">{t('field_date')}</label>
                                        <input type="date" required className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-500/20" value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})} />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-stone-700 mb-2">{t('field_author')}</label>
                                        <input type="text" required className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-500/20" value={formData.auteur} onChange={(e) => setFormData({...formData, auteur: e.target.value})} />
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-end gap-3 pt-4">
                                <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-3 rounded-xl font-bold text-stone-500 hover:bg-stone-50 transition-colors">
                                    {t('cancel')}
                                </button>
                                <button type="submit" className="bg-stone-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-stone-800 transition-all">
                                    {editingAnnonce ? t('update') : t('publish')}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
