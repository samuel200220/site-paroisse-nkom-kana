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
    Church,
    X
} from 'lucide-react';

interface AdminSidebarProps {
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
}

export default function AdminSidebar({ isOpen, setIsOpen }: AdminSidebarProps) {
    const pathname = usePathname();

    const menuItems = [
        { name: 'Dashboard', href: '/admin', icon: <LayoutDashboard className="h-5 w-5" /> },
        { name: 'Annonces', href: '/admin/annonces', icon: <Megaphone className="h-5 w-5" /> },
        { name: 'Organisations', href: '/admin/organisations', icon: <Users className="h-5 w-5" /> },
        { name: 'Chorales', href: '/admin/chorales', icon: <Music className="h-5 w-5" /> },
        { name: 'Programme', href: '/admin/programme', icon: <Calendar className="h-5 w-5" /> },
    ];

    return (
        <aside className={`
            fixed lg:sticky top-0 left-0 z-50
            w-64 bg-white dark:bg-stone-900 border-r border-stone-200 dark:border-stone-800 
            h-screen flex flex-col transition-transform duration-300 ease-in-out
            ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}>
            <div className="p-6 border-b border-stone-100 dark:border-stone-800 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                    <div className="bg-amber-600 p-2 rounded-lg text-white">
                        <Church className="h-6 w-6" />
                    </div>
                    <span className="font-bold text-stone-900 dark:text-stone-100 tracking-tight text-lg">Admin Eglise</span>
                </div>
                <button
                    onClick={() => setIsOpen(false)}
                    className="lg:hidden p-2 text-stone-500 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-lg"
                >
                    <X className="h-5 w-5" />
                </button>
            </div>

            <nav className="flex-grow p-4 space-y-2 overflow-y-auto font-sans">
                {menuItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            onClick={() => setIsOpen(false)}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${isActive
                                ? 'bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-500'
                                : 'text-stone-500 dark:text-stone-400 hover:bg-stone-50 dark:hover:bg-stone-800 hover:text-stone-900 dark:hover:text-stone-100'
                                }`}
                        >
                            {item.icon}
                            {item.name}
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-stone-100 dark:border-stone-800">
                <button className="flex items-center gap-3 px-4 py-3 w-full text-stone-500 dark:text-stone-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all font-medium text-left">
                    <LogOut className="h-5 w-5" />
                    Déconnexion
                </button>
            </div>
        </aside>
    );
}
