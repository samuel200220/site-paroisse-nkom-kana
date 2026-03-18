'use client';

import { MapPin, Phone, Mail, Clock, Info } from 'lucide-react';
import dynamic from 'next/dynamic';

const Map = dynamic(() => import('@/components/Map'), {
    ssr: false,
    loading: () => (
        <div className="w-full h-full bg-stone-100 dark:bg-stone-800 animate-pulse flex items-center justify-center">
            <span className="text-stone-400 font-medium">Chargement de la carte...</span>
        </div>
    )
});

export default function LocalisationPage() {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="mb-16">
                <h1 className="text-4xl font-bold text-stone-900 dark:text-stone-100 mb-4 transition-colors">Nous Trouver</h1>
                <p className="text-stone-600 dark:text-stone-400 text-lg max-w-2xl transition-colors">
                    Venez nous rendre visite. L'Église Nkom Kana est située au cœur du quartier,
                    facilement accessible en transports et à pied.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Contact Info */}
                <div className="space-y-8">
                    <div className="bg-stone-900 dark:bg-stone-800 text-white p-10 rounded-3xl shadow-xl shadow-stone-900/10 transition-colors">
                        <h2 className="text-2xl font-bold mb-8">Informations de Contact</h2>
                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <MapPin className="h-6 w-6 text-amber-500 flex-shrink-0" />
                                <div>
                                    <span className="block text-stone-400 text-[10px] font-bold uppercase tracking-widest mb-1">Adresse</span>
                                    <p className="text-lg leading-snug">123 Avenue de l'Église,<br />Ville, 75000</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <Mail className="h-6 w-6 text-amber-500 flex-shrink-0" />
                                <div>
                                    <span className="block text-stone-400 text-[10px] font-bold uppercase tracking-widest mb-1">Email</span>
                                    <p className="text-lg">contact@eglise-nkomkana.fr</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-amber-50 dark:bg-stone-900/50 p-10 rounded-3xl border border-amber-100 dark:border-stone-800 flex items-start gap-6 transition-colors">
                        <div className="p-3 bg-white dark:bg-stone-800 rounded-2xl text-amber-600 shadow-sm flex-shrink-0 transition-colors">
                            <Clock className="h-6 w-6" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-stone-900 dark:text-stone-100 mb-3 transition-colors">Ouverture du Secrétariat</h3>
                            <p className="text-stone-600 dark:text-stone-400 transition-colors">
                                Du Lundi au Vendredi<br />
                                <span className="font-bold text-stone-900 dark:text-stone-100">09:00 — 12:00</span><br />
                                <span className="font-bold text-stone-900 dark:text-stone-100">14:00 — 18:00</span>
                            </p>
                        </div>
                    </div>
                </div>

                {/* Map Integration */}
                <div className="lg:col-span-2 h-[600px] bg-stone-100 dark:bg-stone-800 rounded-3xl border border-stone-200 dark:border-stone-800 overflow-hidden relative group transition-colors">
                    <Map />
                </div>
            </div>

            <div className="mt-16 p-8 bg-stone-50 dark:bg-stone-900/50 rounded-3xl border border-stone-100 dark:border-stone-800 flex items-center gap-6 transition-colors">
                <div className="p-2 bg-amber-100 dark:bg-amber-900/20 rounded-lg text-amber-700 dark:text-amber-500">
                    <Info className="h-5 w-5" />
                </div>
                <p className="text-stone-600 dark:text-stone-400 text-sm transition-colors">
                    <strong>Note aux visiteurs :</strong> Des parkings gratuits sont disponibles à proximité immédiate de l'entrée principale.
                    L'accès est facilité pour les personnes à mobilité réduite par le portail latéral sud.
                </p>
            </div>
        </div>
    );
}
