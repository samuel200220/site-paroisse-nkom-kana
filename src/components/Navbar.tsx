'use client';

import Link from 'next/link';
import { Church, Menu, X, Sun, Moon, Languages } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme();

    useEffect(() => setMounted(true), []);

    const navLinks = [
        { name: 'Accueil', href: '/' },
        { name: 'Annonces', href: '/annonces' },
        { name: 'Chorales', href: '/chorales' },
        { name: 'Organisations', href: '/organisations' },
        { name: 'Programme', href: '/programme' },
        { name: 'Localisation', href: '/localisation' },
    ];

    if (!mounted) return null;

    return (
        <nav className="fixed top-0 w-full bg-white/80 dark:bg-stone-900/80 backdrop-blur-md z-50 border-b border-stone-200 dark:border-stone-800 transition-colors">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <Link href="/">
                        <div className="flex items-center gap-2">
                            <Church className="h-8 w-8 text-amber-600" />
                            <span className="text-xl font-semibold tracking-tight text-stone-900 dark:text-stone-100">Paroisse Saint Jean de Nkom-Nkana</span>
                        </div>
                    </Link>

                    <div className="hidden md:flex items-center space-x-6">
                        <div className="flex space-x-6">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className="text-stone-600 dark:text-stone-400 hover:text-amber-600 dark:hover:text-amber-500 transition-colors font-medium text-sm"
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>

                        <div className="h-4 w-px bg-stone-200 dark:bg-stone-700" />

                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                                className="p-2 rounded-lg text-stone-500 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
                            >
                                {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                            </button>
                            <button className="flex items-center gap-1 p-2 rounded-lg text-stone-500 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors text-sm font-bold">
                                <Languages className="h-5 w-5" />
                                FR
                            </button>
                        </div>
                    </div>

                    <div className="md:hidden flex items-center gap-4">
                        <button
                            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                            className="p-2 rounded-lg text-stone-500"
                        >
                            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                        </button>
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-stone-600 dark:text-stone-400 hover:text-amber-600 p-2"
                        >
                            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-white dark:bg-stone-900 border-b border-stone-200 dark:border-stone-800 animate-in slide-in-from-top duration-300">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="block px-3 py-2 text-stone-600 dark:text-stone-400 hover:text-amber-600 dark:hover:text-amber-500 font-medium"
                                onClick={() => setIsOpen(false)}
                            >
                                {link.name}
                            </Link>
                        ))}
                        <div className="px-3 py-2">
                            <button className="flex items-center gap-2 text-stone-600 dark:text-stone-400 font-medium">
                                <Languages className="h-5 w-5" />
                                Français (FR)
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}
