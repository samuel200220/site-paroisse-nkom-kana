'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Church, Lock, User, ArrowRight } from 'lucide-react';

export default function AdminLoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // Simple mock authentication for demonstration
        if (username === 'admin' && password === 'eglise2026') {
            router.push('/admin');
        } else {
            setError('Identifiants invalides. Veuillez réessayer.');
        }
    };

    return (
        <div className="min-h-screen bg-stone-50 flex items-center justify-center p-4">
            <div className="max-w-md w-full">
                <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center p-3 bg-amber-600 rounded-2xl text-white mb-6 shadow-xl shadow-amber-900/20">
                        <Church className="h-10 w-10" />
                    </div>
                    <h1 className="text-3xl font-bold text-stone-900">Administration</h1>
                    <p className="text-stone-500 mt-2 font-medium">Accédez à la gestion de votre paroisse</p>
                </div>

                <div className="bg-white rounded-3xl border border-stone-200 p-10 shadow-sm">
                    {error && (
                        <div className="mb-6 p-4 bg-red-50 text-red-600 text-sm rounded-xl border border-red-100 font-medium">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div>
                            <label className="block text-xs font-bold text-stone-400 uppercase tracking-widest mb-2 px-1">Nom d'utilisateur</label>
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-stone-300" />
                                <input
                                    type="text" required
                                    className="w-full pl-12 pr-4 py-4 bg-stone-50 rounded-2xl border-none focus:ring-2 focus:ring-amber-500/20 text-stone-900"
                                    placeholder="admin"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-stone-400 uppercase tracking-widest mb-2 px-1">Mot de passe</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-stone-300" />
                                <input
                                    type="password" required
                                    className="w-full pl-12 pr-4 py-4 bg-stone-50 rounded-2xl border-none focus:ring-2 focus:ring-amber-500/20 text-stone-900"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-stone-900 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-stone-800 transition-all shadow-xl shadow-stone-900/10 group"
                        >
                            Se connecter
                            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </form>
                </div>

                <p className="text-center mt-8 text-stone-400 text-sm">
                    &copy; {new Date().getFullYear()} Église Saint-Augustin • Direction technique
                </p>
            </div>
        </div>
    );
}
