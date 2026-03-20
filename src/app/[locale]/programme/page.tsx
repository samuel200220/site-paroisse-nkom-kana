'use client';

import { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, Bell } from 'lucide-react';

export default function ProgrammePage() {
    const [programme, setProgramme] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/programme')
            .then(res => res.json())
            .then(data => {
                setProgramme(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    const days = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];

    const getProgramByDay = (day: string) => {
        return Array.isArray(programme) ? programme.filter(p => p.jour === day) : [];
    };

    return (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="mb-16">
                <h1 className="text-4xl font-bold text-stone-900 mb-4">Programme de la Semaine</h1>
                <p className="text-stone-600 text-lg">
                    Planifiez vos moments de recueillement et vos activités communautaires.
                </p>
            </div>

            <div className="space-y-12">
                {days.map((day) => {
                    const items = getProgramByDay(day);
                    return (
                        <div key={day} className="relative pl-8 md:pl-0">
                            <div className="md:grid md:grid-cols-4 gap-8">
                                <div className="mb-6 md:mb-0">
                                    <div className="bg-stone-900 text-white p-6 rounded-2xl md:text-center sticky top-24 inline-block md:block min-w-[140px]">
                                        <span className="block text-amber-500 font-bold uppercase tracking-widest text-[10px] mb-1">Jour</span>
                                        <span className="text-2xl font-bold tracking-tight">{day}</span>
                                    </div>
                                </div>

                                <div className="md:col-span-3 space-y-4">
                                    {items.length > 0 ? (
                                        items.map((item) => (
                                            <div key={item.id} className="bg-white border border-stone-200 rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-amber-200 transition-colors shadow-sm group">
                                                <div className="flex items-center gap-6">
                                                    <div className="flex flex-col items-center justify-center p-3 bg-stone-50 rounded-xl min-w-[80px] text-amber-600 group-hover:bg-amber-600 group-hover:text-white transition-all">
                                                        <Clock className="h-5 w-5 mb-1" />
                                                        <span className="font-bold">{item.heure}</span>
                                                    </div>
                                                    <div>
                                                        <h3 className="text-xl font-bold text-stone-900 mb-1">{item.activite}</h3>
                                                        <div className="flex items-center gap-1.5 text-stone-500 text-sm">
                                                            <MapPin className="h-4 w-4" />
                                                            {item.lieu}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex-shrink-0">
                                                    <span className="px-4 py-2 bg-stone-50 text-stone-600 rounded-full text-xs font-bold uppercase tracking-wide group-hover:bg-amber-50 group-hover:text-amber-600 transition-all">
                                                        Confirmation
                                                    </span>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="bg-stone-50/50 border border-dashed border-stone-200 rounded-2xl p-8 text-center text-stone-400 italic">
                                            Pas d'activités programmées officiellement pour ce jour.
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="mt-24 p-12 bg-stone-900 rounded-3xl text-white flex flex-col md:flex-row items-center gap-12 overflow-hidden relative">
                <div className="absolute -bottom-12 -right-12 p-8 opacity-10">
                    <Bell className="h-64 w-64" />
                </div>
                <div className="relative z-10">
                    <h2 className="text-3xl font-bold mb-4">Confessions & Écoute</h2>
                    <p className="text-stone-300 max-w-xl text-lg mb-0 font-light leading-relaxed">
                        Les prêtres sont disponibles pour le sacrement de réconciliation ou un temps de dialogue spirituel
                        avant et après chaque messe dominicale, ainsi que sur rendez-vous en semaine.
                    </p>
                </div>
                <div className="flex-shrink-0 relative z-10 w-full md:w-auto">
                    <a href="/localisation" className="block w-full text-center bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 rounded-full font-bold transition-all whitespace-nowrap">
                        Prendre contact
                    </a>
                </div>
            </div>
        </div>
    );
}
