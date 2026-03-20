'use client';

import { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, X, Loader2, Users, ShieldCheck, Activity } from 'lucide-react';

export default function AdminOrganisations() {
    const [orgs, setOrgs] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingOrg, setEditingOrg] = useState<any>(null);
    const [formData, setFormData] = useState({
        nom: '',
        description: '',
        responsable: '',
        activites: ''
    });

    const fetchOrgs = () => {
        setLoading(true);
        fetch('/api/organisations').then(res => res.json()).then(data => {
            setOrgs(data);
            setLoading(false);
        }).catch(() => setLoading(false));
    };

    useEffect(() => { fetchOrgs(); }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await fetch('/api/organisations', {
            method: editingOrg ? 'PUT' : 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(editingOrg ? { ...formData, id: editingOrg.id } : formData),
        });
        setIsModalOpen(false);
        fetchOrgs();
    };

    const handleDelete = async (id: string) => {
        if (confirm('Supprimer cette organisation ?')) {
            await fetch(`/api/organisations?id=${id}`, { method: 'DELETE' });
            fetchOrgs();
        }
    };

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-bold text-stone-900">Groupes & Organisations</h1>
                    <p className="text-stone-500">Gérez les différents mouvements de l'église.</p>
                </div>
                <button
                    onClick={() => { setEditingOrg(null); setFormData({ nom: '', description: '', responsable: '', activites: '' }); setIsModalOpen(true); }}
                    className="bg-stone-900 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-stone-800 transition-all shadow-xl shadow-stone-900/10"
                >
                    <Plus className="h-5 w-5" />
                    Nouveau Groupe
                </button>
            </div>

            {loading ? (
                <div className="flex justify-center py-24">
                    <Loader2 className="h-8 w-8 text-amber-600 animate-spin" />
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-4">
                    {orgs.length > 0 ? orgs.map(org => (
                        <div key={org.id} className="bg-white rounded-3xl border border-stone-200 p-8 flex flex-col md:flex-row md:items-center justify-between gap-8 hover:border-amber-200 transition-all shadow-sm">
                            <div className="flex items-center gap-6">
                                <div className="w-16 h-16 bg-stone-100 text-stone-900 rounded-2xl flex items-center justify-center">
                                    <Users className="h-8 w-8" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-stone-900 mb-1">{org.nom}</h3>
                                    <div className="flex flex-wrap gap-4 items-center">
                                        <span className="flex items-center gap-1.5 text-stone-500 text-xs font-bold uppercase tracking-widest">
                                            <ShieldCheck className="h-3.5 w-3.5 text-amber-600" />
                                            {org.responsable}
                                        </span>
                                        <span className="text-stone-300">|</span>
                                        <span className="text-stone-400 text-xs font-medium italic truncate max-w-[300px]">
                                            {org.activites}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => { setEditingOrg(org); setFormData({ nom: org.nom, description: org.description, responsable: org.responsable, activites: org.activites }); setIsModalOpen(true); }}
                                    className="bg-stone-50 p-4 rounded-2xl text-stone-400 hover:text-amber-600 hover:bg-amber-50 transition-all"
                                >
                                    <Pencil className="h-5 w-5" />
                                </button>
                                <button
                                    onClick={() => handleDelete(org.id)}
                                    className="bg-stone-50 p-4 rounded-2xl text-stone-400 hover:text-red-600 hover:bg-red-50 transition-all"
                                >
                                    <Trash2 className="h-5 w-5" />
                                </button>
                            </div>
                        </div>
                    )) : (
                        <div className="py-24 text-center text-stone-400 italic bg-white rounded-3xl border border-dashed border-stone-200">
                            Aucun groupe enregistré.
                        </div>
                    )}
                </div>
            )}

            {isModalOpen && (
                <div className="fixed inset-0 bg-stone-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden p-10">
                        <div className="flex justify-between items-center mb-10">
                            <h2 className="text-2xl font-bold text-stone-900">{editingOrg ? 'Éditer' : 'Nouveau'} Groupe</h2>
                            <button onClick={() => setIsModalOpen(false)} className="text-stone-400 hover:text-stone-900"><X className="h-6 w-6" /></button>
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-2 gap-6">
                                <div className="col-span-1">
                                    <label className="block text-xs font-bold text-stone-400 uppercase tracking-widest mb-2 font-mono">Nom du groupe</label>
                                    <input
                                        type="text" required
                                        className="w-full px-5 py-4 bg-stone-50 rounded-2xl border-none focus:ring-2 focus:ring-amber-500/20 text-stone-900 font-bold"
                                        value={formData.nom}
                                        onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                                    />
                                </div>
                                <div className="col-span-1">
                                    <label className="block text-xs font-bold text-stone-400 uppercase tracking-widest mb-2 font-mono">Responsable</label>
                                    <input
                                        type="text" required
                                        className="w-full px-5 py-4 bg-stone-50 rounded-2xl border-none focus:ring-2 focus:ring-amber-500/20 text-stone-900"
                                        value={formData.responsable}
                                        onChange={(e) => setFormData({ ...formData, responsable: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-stone-400 uppercase tracking-widest mb-2 font-mono">Description générale</label>
                                <textarea
                                    required rows={3}
                                    className="w-full px-5 py-4 bg-stone-50 rounded-2xl border-none focus:ring-2 focus:ring-amber-500/20 text-stone-900"
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-stone-400 uppercase tracking-widest mb-2 font-mono">Activités principales</label>
                                <input
                                    type="text" required placeholder="Réunions, visites aux malades, kermesses..."
                                    className="w-full px-5 py-4 bg-stone-50 rounded-2xl border-none focus:ring-2 focus:ring-amber-500/20 text-stone-900"
                                    value={formData.activites}
                                    onChange={(e) => setFormData({ ...formData, activites: e.target.value })}
                                />
                            </div>
                            <div className="flex justify-end gap-3 pt-8">
                                <button type="button" onClick={() => setIsModalOpen(false)} className="px-8 py-4 font-bold text-stone-400 hover:text-stone-900 transition-colors">Fermer</button>
                                <button type="submit" className="bg-stone-900 text-white px-10 py-4 rounded-2xl font-bold hover:bg-amber-600 transition-all shadow-lg">Enregistrer</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
