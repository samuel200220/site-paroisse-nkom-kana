import { MapPin, Phone, Mail, Clock, Info } from 'lucide-react';

export default function LocalisationPage() {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="mb-16">
                <h1 className="text-4xl font-bold text-stone-900 mb-4">Nous Trouver</h1>
                <p className="text-stone-600 text-lg max-w-2xl">
                    Venez nous rendre visite. L'Église Nkom Kana est située au cœur du quartier,
                    facilement accessible en transports et à pied.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Contact Info */}
                <div className="space-y-8">
                    <div className="bg-stone-900 text-white p-10 rounded-3xl shadow-xl shadow-stone-900/10">
                        <h2 className="text-2xl font-bold mb-8">Informations de Contact</h2>
                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <MapPin className="h-6 w-6 text-amber-500 flex-shrink-0" />
                                <div>
                                    <span className="block text-stone-400 text-[10px] font-bold uppercase tracking-widest mb-1">Adresse</span>
                                    <p className="text-lg leading-snug">123 Avenue de l'Église,<br />Ville, 75000</p>
                                </div>
                            </div>

                            {/* <div className="flex items-start gap-4">
                                <Phone className="h-6 w-6 text-amber-500 flex-shrink-0" />
                                <div>
                                    <span className="block text-stone-400 text-[10px] font-bold uppercase tracking-widest mb-1">Téléphone</span>
                                    <p className="text-lg">+33 1 23 45 67 89</p>
                                </div>
                            </div> */}

                            <div className="flex items-start gap-4">
                                <Mail className="h-6 w-6 text-amber-500 flex-shrink-0" />
                                <div>
                                    <span className="block text-stone-400 text-[10px] font-bold uppercase tracking-widest mb-1">Email</span>
                                    <p className="text-lg">contact@eglise-nkomkana.fr</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-amber-50 p-10 rounded-3xl border border-amber-100 flex items-start gap-6">
                        <div className="p-3 bg-white rounded-2xl text-amber-600 shadow-sm flex-shrink-0">
                            <Clock className="h-6 w-6" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-stone-900 mb-3">Ouverture du Secrétariat</h3>
                            <p className="text-stone-600">
                                Du Lundi au Vendredi<br />
                                <span className="font-bold text-stone-900">09:00 — 12:00</span><br />
                                <span className="font-bold text-stone-900">14:00 — 18:00</span>
                            </p>
                        </div>
                    </div>
                </div>

                {/* Map Placeholder */}
                <div className="lg:col-span-2 h-[600px] bg-stone-100 rounded-3xl border border-stone-200 overflow-hidden relative group">
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                        <div className="p-6 bg-white rounded-full shadow-lg mb-6 group-hover:scale-110 transition-transform">
                            <MapPin className="h-12 w-12 text-amber-600" />
                        </div>
                        <h3 className="text-2xl font-bold text-stone-900 mb-2">Carte Interactive</h3>
                        <p className="text-stone-500 max-w-xs mx-auto mb-8">
                            L'intégration de la carte sera affichée ici pour aider vos fidèles à se repérer.
                        </p>
                        <div className="flex gap-4">
                            <button className="bg-stone-900 text-white px-6 py-3 rounded-full font-bold hover:bg-stone-800 transition-colors">
                                Itinéraire Google Maps
                            </button>
                            <button className="bg-white text-stone-900 border border-stone-200 px-6 py-3 rounded-full font-bold hover:bg-stone-50 transition-colors">
                                Apple Maps
                            </button>
                        </div>
                    </div>

                    {/* Subtle grid pattern for visual interest */}
                    <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:20px_20px]"></div>
                </div>
            </div>

            <div className="mt-16 p-8 bg-stone-50 rounded-3xl border border-stone-100 flex items-center gap-6">
                <div className="p-2 bg-amber-100 rounded-lg text-amber-700">
                    <Info className="h-5 w-5" />
                </div>
                <p className="text-stone-600 text-sm">
                    <strong>Note aux visiteurs :</strong> Des parkings gratuits sont disponibles à proximité immédiate de l'entrée principale.
                    L'accès est facilité pour les personnes à mobilité réduite par le portail latéral sud.
                </p>
            </div>
        </div>
    );
}
