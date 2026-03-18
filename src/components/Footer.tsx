import { Church, Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-stone-50 dark:bg-stone-900 border-t border-stone-200 dark:border-stone-800 pt-16 pb-8 transition-colors">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                    <div className="col-span-1 md:col-span-2">
                        <div className="flex items-center gap-2 mb-4">
                            <Church className="h-8 w-8 text-amber-600" />
                            <span className="text-2xl font-semibold tracking-tight text-stone-900 dark:text-stone-100 transition-colors">Église Nkom Kana</span>
                        </div>
                        <p className="text-stone-600 dark:text-stone-400 max-w-sm leading-relaxed transition-colors">
                            Une communauté de foi vivante, dévouée au service de Dieu et du prochain dans la joie et la charité.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-stone-900 dark:text-stone-100 font-semibold mb-4 transition-colors">Contact</h3>
                        <ul className="space-y-3 text-stone-600 dark:text-stone-400 text-sm transition-colors">
                            <li className="flex items-center gap-2">
                                <MapPin className="h-4 w-4 text-amber-600" />
                                <span>123 Avenue de l'Église, Ville</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <Mail className="h-4 w-4 text-amber-600" />
                                <span>contact@eglise-nkoma-kana.fr</span>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-stone-900 dark:text-stone-100 font-semibold mb-4 transition-colors">Suivez-nous</h3>
                        <div className="flex gap-4">
                            <a href="#" className="text-stone-400 hover:text-amber-600 transition-colors">
                                <Facebook className="h-5 w-5" />
                            </a>
                            <a href="#" className="text-stone-400 hover:text-amber-600 transition-colors">
                                <Twitter className="h-5 w-5" />
                            </a>
                            <a href="#" className="text-stone-400 hover:text-amber-600 transition-colors">
                                <Instagram className="h-5 w-5" />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="mt-16 pt-8 border-t border-stone-200 dark:border-stone-800 text-center text-stone-500 dark:text-stone-400 text-sm transition-colors">
                    <p>© {new Date().getFullYear()} Église Nkom Kana. Tous droits réservés.</p>
                </div>
            </div>
        </footer>
    );
}
