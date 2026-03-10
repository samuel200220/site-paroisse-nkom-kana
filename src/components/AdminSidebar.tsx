'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard,
    Megaphone,
    Users,
    Music,
    Calendar,
    LogOut,
    Church
} from 'lucide-react';

export default function AdminSidebar() {
    const pathname = usePathname();

    const menuItems = [
        { name: 'Dashboard', href: '/admin', icon: <LayoutDashboard className="h-5 w-5" /> },
        { name: 'Annonces', href: '/admin/annonces', icon: <Megaphone className="h-5 w-5" /> },
        { name: 'Organisations', href: '/admin/organisations', icon: <Users className="h-5 w-5" /> },
        { name: 'Chorales', href: '/admin/chorales', icon: <Music className="h-5 w-5" /> },
        { name: 'Programme', href: '/admin/programme', icon: <Calendar className="h-5 w-5" /> },
    ];

    return (
        <aside className="w-64 bg-white border-r border-stone-200 h-screen sticky top-0 flex flex-col">
            <div className="p-6 border-b border-stone-100 flex items-center gap-3">
                <div className="bg-amber-600 p-2 rounded-lg text-white">
                    <Church className="h-6 w-6" />
                </div>
                <span className="font-bold text-stone-900 tracking-tight text-lg">Admin Eglise</span>
            </div>

            <nav className="flex-grow p-4 space-y-2">
                {menuItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${isActive
                                    ? 'bg-amber-50 text-amber-600'
                                    : 'text-stone-500 hover:bg-stone-50 hover:text-stone-900'
                                }`}
                        >
                            {item.icon}
                            {item.name}
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-stone-100">
                <button className="flex items-center gap-3 px-4 py-3 w-full text-stone-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all font-medium">
                    <LogOut className="h-5 w-5" />
                    Déconnexion
                </button>
            </div>
        </aside>
    );
}
