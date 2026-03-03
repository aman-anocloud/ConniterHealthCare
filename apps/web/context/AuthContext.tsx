'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebase';

interface AuthContextType {
    user: User | null;
    loading: boolean;
    token: string | null;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    loading: true,
    token: null,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Developer Bypass for missing Firebase credentials
        const isDummyConfig = !process.env.NEXT_PUBLIC_FIREBASE_API_KEY || process.env.NEXT_PUBLIC_FIREBASE_API_KEY === 'dummy-api-key-for-build';

        if (isDummyConfig) {
            console.warn("Using Dummy Firebase Config - Bypassing Auth with Mock Admin User for Local Development.");
            setUser({ uid: 'dev-admin-uid', phoneNumber: '+919999999999' } as User);
            setToken('dev-admin-token');
            localStorage.setItem('conninter_token', 'dev-admin-token');
            setLoading(false);
            return;
        }

        const unsub = onAuthStateChanged(auth, async (u) => {
            setUser(u);
            if (u) {
                const idToken = await u.getIdToken();
                setToken(idToken);
                localStorage.setItem('conninter_token', idToken);
            } else {
                setToken(null);
                localStorage.removeItem('conninter_token');
            }
            setLoading(false);
        });
        return unsub;
    }, []);

    return (
        <AuthContext.Provider value={{ user, loading, token }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
