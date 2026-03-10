import {
    Megaphone,
    Users,
    Music,
    Calendar,
    TrendingUp,
    Clock,
    ExternalLink,
    ArrowRight
} from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboard() {
    const stats = [
        { name: 'Annonces', scale: 'Total', count: 12, icon: <Megaphone className="h-6 w-6" />, color: 'bg-blue-500' },
        { name: 'Organisations', scale: 'Total', count: 5, icon: <Users className="h-6 w-6" />, color: 'bg-purple-500' },
        { name: 'Chorales', scale: 'Total', count: 3, icon: <Music className="h-6 w-6" />, color: 'bg-amber-500' },
        { name: 'Programme', scale: 'Hebdo', count: 8, icon: <Calendar className="h-6 w-6" />, color: 'bg-emerald-500' },
    ];

    return (
        <div>
            <div className="mb-12">
                <h1 className="text-3xl font-bold text-stone-900 mb-2">Tableau de Bord</h1>
                <p className="text-stone-500">Gérez le contenu de votre Église depuis cet espace.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {stats.map((stat) => (
                    <div key={stat.name} className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm">
                        <div className={`w-12 h-12 ${stat.color} text-white rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-${stat.color.split('-')[1]}-200`}>
                            {stat.icon}
                        </div>
                        <p className="text-stone-400 text-sm font-medium uppercase tracking-widest">{stat.name}</p>
                        <div className="flex items-end justify-between">
                            <span className="text-4xl font-bold text-stone-900">{stat.count}</span>
                            <span className="text-stone-500 text-xs mb-1">{stat.scale}</span>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-sm">
                    <div className="p-6 border-b border-stone-50 flex items-center justify-between">
                        <h2 className="font-bold text-stone-900 flex items-center gap-2">
                            <Clock className="h-5 w-5 text-stone-400" />
                            Activités Récentes
                        </h2>
                        <Link href="/admin/annonces" className="text-amber-600 text-xs font-bold hover:underline">Voir tout</Link>
                    </div>
                    <div className="p-0">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="px-6 py-4 flex items-center gap-4 hover:bg-stone-50 transition-colors border-b border-stone-50 last:border-0">
                                <div className="w-10 h-10 bg-amber-50 text-amber-600 rounded-full flex items-center justify-center font-bold text-xs">
                                    {i === 1 ? 'M' : 'E'}
                                </div>
                                <div className="flex-grow">
                                    <h4 className="text-sm font-bold text-stone-900">Nouvelle annonce publiée</h4>
                                    <p className="text-xs text-stone-500 mt-1">Il y a {i * 2} heures • Par Administration</p>
                                </div>
                                <ArrowRight className="h-4 w-4 text-stone-300" />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-stone-900 rounded-3xl p-8 text-white relative overflow-hidden flex flex-col justify-between">
                    <div className="absolute top-0 right-0 p-8 opacity-10">
                        <TrendingUp className="h-24 w-24" />
                    </div>
                    <div className="relative z-10">
                        <h2 className="text-2xl font-bold mb-4">Aperçu du site</h2>
                        <p className="text-stone-400 mb-8 max-w-xs leading-relaxed">
                            Consultez le site public pour voir les modifications en temps réel.
                        </p>
                    </div>
                    <Link href="/" target="_blank" className="relative z-10 self-start flex items-center gap-2 bg-white text-stone-900 px-6 py-3 rounded-xl font-bold hover:bg-stone-100 transition-colors shadow-xl">
                        Visiter le site <ExternalLink className="h-4 w-4" />
                    </Link>
                </div>
            </div>
        </div>
    );
}
