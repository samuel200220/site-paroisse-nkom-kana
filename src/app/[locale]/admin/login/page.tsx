'use client';

import {useState} from 'react';
import {ArrowRight, Church, Lock, User} from 'lucide-react';
import {useLocale, useTranslations} from 'next-intl';

import {useRouter} from '@/i18n/navigation';

export default function AdminLoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();
    const locale = useLocale();
    const t = useTranslations('AdminLogin');

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();

        if (username === 'admin' && password === 'eglise2026') {
            router.push('/admin');
        } else {
            setError(t('error_invalid_credentials'));
        }
    };

    return (
        <div className="min-h-screen bg-stone-50 flex items-center justify-center p-4">
            <div className="max-w-md w-full">
                <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center p-3 bg-amber-600 rounded-2xl text-white mb-6 shadow-xl shadow-amber-900/20">
                        <Church className="h-10 w-10" />
                    </div>
                    <h1 className="text-3xl font-bold text-stone-900">{t('title')}</h1>
                    <p className="text-stone-500 mt-2 font-medium">{t('description')}</p>
                </div>

                <div className="bg-white rounded-3xl border border-stone-200 p-10 shadow-sm">
                    {error && (
                        <div className="mb-6 p-4 bg-red-50 text-red-600 text-sm rounded-xl border border-red-100 font-medium">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div>
                            <label className="block text-xs font-bold text-stone-400 uppercase tracking-widest mb-2 px-1">{t('username')}</label>
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-stone-300" />
                                <input
                                    type="text" required
                                    className="w-full pl-12 pr-4 py-4 bg-stone-50 rounded-2xl border-none focus:ring-2 focus:ring-amber-500/20 text-stone-900"
                                    placeholder={t('username_placeholder')}
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-stone-400 uppercase tracking-widest mb-2 px-1">{t('password')}</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-stone-300" />
                                <input
                                    type="password" required
                                    className="w-full pl-12 pr-4 py-4 bg-stone-50 rounded-2xl border-none focus:ring-2 focus:ring-amber-500/20 text-stone-900"
                                    placeholder={t('password_placeholder')}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-stone-900 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-stone-800 transition-all shadow-xl shadow-stone-900/10 group"
                        >
                            {t('submit')}
                            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </form>
                </div>

                <p className="text-center mt-8 text-stone-400 text-sm">
                    {t('footer', {year: new Date().getFullYear(), locale: locale.toUpperCase()})}
                </p>
            </div>
        </div>
    );
}
