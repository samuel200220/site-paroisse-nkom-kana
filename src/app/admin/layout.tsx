'use client';

import AdminSidebar from "@/components/AdminSidebar";
import { useState } from "react";
import { Menu, X, Church } from "lucide-react";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const sidebarLabel = isSidebarOpen ? "Fermer le menu admin" : "Ouvrir le menu admin";

    return (
        <div className="flex min-h-screen bg-stone-50 dark:bg-stone-950 transition-colors">
            {/* Mobile Header */}
            <div className="lg:hidden fixed top-0 w-full bg-white dark:bg-stone-900 border-b border-stone-200 dark:border-stone-800 z-40 px-4 py-3">
                <div className="flex flex-col items-start gap-3">
                    <div className="flex items-center gap-2">
                        <div className="bg-amber-600 p-1.5 rounded-lg text-white">
                            <Church className="h-5 w-5" />
                        </div>
                        <span className="font-bold text-stone-900 dark:text-stone-100 tracking-tight">
                            Admin
                        </span>
                    </div>

                    <button
                        type="button"
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="inline-flex items-center gap-2 rounded-xl bg-stone-900 text-white px-4 py-2.5 shadow-lg shadow-stone-900/10 hover:bg-stone-800 transition-colors"
                        aria-label={sidebarLabel}
                        title={sidebarLabel}
                    >
                        {isSidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                        <span className="text-sm font-semibold">Menu admin</span>
                    </button>
                </div>
            </div>

            <AdminSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

            <main className="flex-grow p-4 md:p-8 lg:p-12 overflow-y-auto mt-28 lg:mt-0">
                <div className="max-w-6xl mx-auto">
                    {children}
                </div>
            </main>

            {/* Backdrop for mobile */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-stone-900/50 backdrop-blur-sm z-40 lg:hidden transition-opacity"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}
        </div>
    );
}
