'use client';

import { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, X, Loader2, Calendar, MapPin, Clock } from 'lucide-react';

export default function AdminProgramme() {
    const [items, setItems] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<any>(null);
    const [formData, setFormData] = useState({
        jour: 'Dimanche',
        heure: '09:00',
        activite: '',
        lieu: 'Grande Paroisse'
    });

    const days = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];

    const fetchItems = () => {
        setLoading(true);
        fetch('/api/programme').then(res => res.json()).then(data => {
            setItems(data);
            setLoading(false);
        }).catch(() => setLoading(false));
    };

    useEffect(() => { fetchItems(); }, []);

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
        if (confirm('Supprimer cette activité ?')) {
            await fetch(`/api/programme?id=${id}`, { method: 'DELETE' });
            fetchItems();
        }
    };

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-bold text-stone-900">Programme Hebdomadaire</h1>
                    <p className="text-stone-500">Gérez l'agenda des célébrations et réunions.</p>
                </div>
                <button
                    onClick={() => { setEditingItem(null); setFormData({ jour: 'Dimanche', heure: '09:00', activite: '', lieu: 'Grande Paroisse' }); setIsModalOpen(true); }}
                    className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all shadow-lg"
                >
                    <Plus className="h-5 w-5" />
                    Ajouter une activité
                </button>
            </div>

            <div className="space-y-6">
                {days.map(day => (
                    <div key={day} className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-sm">
                        <div className="px-8 py-5 bg-stone-50 border-b border-stone-100 flex items-center justify-between">
                            <h2 className="font-bold text-stone-900 flex items-center gap-2 uppercase tracking-widest text-xs">
                                <Calendar className="h-4 w-4 text-amber-600" />
                                {day}
                            </h2>
                        </div>

                        <div className="divide-y divide-stone-50">
                            {items.filter(i => i.jour === day).length > 0 ? (
                                items.filter(i => i.jour === day).map(item => (
                                    <div key={item.id} className="px-8 py-6 flex items-center justify-between hover:bg-stone-50/50 transition-colors group">
                                        <div className="flex items-center gap-8">
                                            <div className="text-amber-600 font-bold bg-amber-50 px-4 py-2 rounded-xl text-sm min-w-[70px] text-center">
                                                {item.heure}
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-stone-900">{item.activite}</h4>
                                                <div className="flex items-center gap-1.5 text-stone-400 text-xs mt-1">
                                                    <MapPin className="h-3.5 w-3.5" />
                                                    {item.lieu}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
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
                                ))
                            ) : (
                                <div className="px-8 py-6 text-stone-400 text-sm italic">Aucune activité enregistrée.</div>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-stone-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden p-8">
                        <h2 className="text-2xl font-bold text-stone-900 mb-8">{editingItem ? 'Modifier' : 'Ajouter'} Activité</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-stone-400 uppercase tracking-widest mb-1">Jour</label>
                                    <select
                                        className="w-full px-4 py-3 bg-stone-50 rounded-xl border-none focus:ring-2 focus:ring-amber-500/20"
                                        value={formData.jour}
                                        onChange={(e) => setFormData({ ...formData, jour: e.target.value })}
                                    >
                                        {days.map(d => <option key={d} value={d}>{d}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-stone-400 uppercase tracking-widest mb-1">Heure</label>
                                    <input
                                        type="time" required
                                        className="w-full px-4 py-3 bg-stone-50 rounded-xl border-none focus:ring-2 focus:ring-amber-500/20"
                                        value={formData.heure}
                                        onChange={(e) => setFormData({ ...formData, heure: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-stone-400 uppercase tracking-widest mb-1">Activité</label>
                                <input
                                    type="text" required placeholder="Ex: Catéchèse des jeunes"
                                    className="w-full px-4 py-3 bg-stone-50 rounded-xl border-none focus:ring-2 focus:ring-amber-500/20"
                                    value={formData.activite}
                                    onChange={(e) => setFormData({ ...formData, activite: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-stone-400 uppercase tracking-widest mb-1">Lieu</label>
                                <input
                                    type="text" required placeholder="Ex: Salle paroissiale"
                                    className="w-full px-4 py-3 bg-stone-50 rounded-xl border-none focus:ring-2 focus:ring-amber-500/20"
                                    value={formData.lieu}
                                    onChange={(e) => setFormData({ ...formData, lieu: e.target.value })}
                                />
                            </div>
                            <div className="flex justify-end gap-3 pt-8">
                                <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-3 font-bold text-stone-400 ring-offset-background transition-colors hover:text-stone-900">Annuler</button>
                                <button type="submit" className="bg-amber-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-amber-700 transition-all">Enregistrer</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
