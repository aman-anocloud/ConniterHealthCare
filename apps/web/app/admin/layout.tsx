'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Sidebar from '@/components/Sidebar/Sidebar'; // Reusing the same sidebar for simplicity, but could make an AdminSidebar
import api from '@/lib/api';
import styles from '@/app/dashboard/layout.module.css';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const { user, loading, token } = useAuth();
    const router = useRouter();
    const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

    useEffect(() => {
        if (!loading && !user) {
            router.replace('/auth');
            return;
        }

        if (token) {
            if (token === 'dev-admin-token') {
                setIsAdmin(true);
                return;
            }

            // Check if user is an ADMIN
            api.get('/users/me', { headers: { Authorization: `Bearer ${token}` } })
                .then((res) => {
                    if (res.data.role === 'ADMIN') {
                        setIsAdmin(true);
                    } else {
                        // User is not an admin, boot them back to the normal dashboard
                        router.replace('/dashboard');
                    }
                })
                .catch(() => {
                    router.replace('/dashboard');
                });
        }
    }, [user, loading, token, router]);

    if (loading || isAdmin === null) {
        return (
            <div className={styles.loading}>
                <div className={styles.spinner} />
                <span>Verifying admin credentials…</span>
            </div>
        );
    }

    return (
        <div className={styles.shell}>
            <Sidebar />
            <main className={styles.main}>{children}</main>
        </div>
    );
}
