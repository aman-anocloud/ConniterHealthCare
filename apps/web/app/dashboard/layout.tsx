'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Sidebar from '@/components/Sidebar/Sidebar';
import styles from './layout.module.css';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) router.replace('/auth');
    }, [user, loading, router]);

    if (loading) return (
        <div className={styles.loading}>
            <div className={styles.spinner} />
            <span>Loading your dashboard…</span>
        </div>
    );

    if (!user) return null;

    return (
        <div className={styles.shell}>
            <Sidebar />
            <main className={styles.main}>{children}</main>
        </div>
    );
}
