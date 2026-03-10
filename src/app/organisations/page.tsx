'use client';

import { useState, useEffect } from 'react';
import { Users, User, ShieldCheck, Activity, ArrowRight } from 'lucide-react';

export default function OrganisationsPage() {
    const [organisations, setOrganisations] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

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
                <h1 className="text-4xl md:text-5xl font-bold text-stone-900 mb-6">Nos Organisations</h1>
                <p className="text-stone-600 max-w-2xl mx-auto text-lg leading-relaxed">
                    Découvrez les groupes et mouvements qui animent la vie de notre paroisse.
                    Chacun a sa place dans la vigne du Seigneur.
                </p>
            </div>

            {loading ? (
                <div className="flex justify-center py-24">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600"></div>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {organisations.length > 0 ? (
                        organisations.map((org) => (
                            <div key={org.id} className="bg-white rounded-3xl p-10 border border-stone-100 shadow-sm hover:shadow-2xl transition-all duration-500 group relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                                    <Users className="h-32 w-32" />
                                </div>

                                <h2 className="text-3xl font-bold text-stone-900 mb-6 group-hover:text-amber-600 transition-colors">{org.nom}</h2>
                                <p className="text-stone-600 text-lg mb-8 leading-relaxed">
                                    {org.description}
                                </p>

                                <div className="space-y-6 pt-8 border-t border-stone-50">
                                    <div className="flex items-start gap-4">
                                        <div className="p-2 bg-amber-50 rounded-lg text-amber-600">
                                            <ShieldCheck className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <span className="block text-xs font-bold text-stone-400 uppercase tracking-widest mb-1">Responsable</span>
                                            <span className="text-stone-900 font-semibold">{org.responsable}</span>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="p-2 bg-stone-50 rounded-lg text-stone-600">
                                            <Activity className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <span className="block text-xs font-bold text-stone-400 uppercase tracking-widest mb-1">Activités</span>
                                            <p className="text-stone-700 leading-relaxed font-medium">
                                                {org.activites}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full py-24 text-center bg-white rounded-3xl border border-stone-100">
                            <Users className="h-16 w-16 text-stone-200 mx-auto mb-4" />
                            <p className="text-stone-400 text-lg">Aucune organisation répertoriée pour le moment.</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
