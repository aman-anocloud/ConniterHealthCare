'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import api from '@/lib/api';
import styles from './Sidebar.module.css';

const nav = [
    { href: '/dashboard', label: 'Dashboard', icon: '▦', exact: true },
    { href: '/dashboard/visits', label: 'My Visits', icon: '📅' },
    { href: '/dashboard/deliveries', label: 'My Deliveries', icon: '🚚' },
    { href: '/dashboard/notifications', label: 'Notifications', icon: '🔔' },
    { href: '/dashboard/settings', label: 'Settings', icon: '⚙️' },
];

export default function Sidebar() {
    const pathname = usePathname();
    const { user, token } = useAuth();
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        if (token) {
            if (token === 'dev-admin-token') {
                setIsAdmin(true);
                return;
            }

            api.get('/users/me', { headers: { Authorization: `Bearer ${token}` } })
                .then((res) => {
                    setIsAdmin(res.data.role === 'ADMIN');
                })
                .catch(() => setIsAdmin(false));
        }
    }, [token]);

    const isActive = (href: string, exact?: boolean) =>
        exact ? pathname === href : pathname.startsWith(href);

    return (
        <aside className={styles.sidebar}>
            {/* Logo */}
            <Link href="/" className={styles.logo}>
                <span className={styles.logoIcon}>⊕</span>
                <span>Conninter</span>
            </Link>

            {/* Profile */}
            <div className={styles.profile}>
                <div className={styles.avatar}>
                    {user?.phoneNumber?.slice(-2) ?? 'U'}
                </div>
                <div className={styles.profileInfo}>
                    <p className={styles.profileName}>{user?.displayName ?? 'User'}</p>
                    <p className={styles.profilePhone}>{user?.phoneNumber ?? ''}</p>
                </div>
            </div>

            <div className={styles.divider} />

            {/* Nav */}
            <nav className={styles.nav}>
                {nav.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={`${styles.navItem} ${isActive(item.href, item.exact) ? styles.navActive : ''}`}
                    >
                        <span className={styles.navIcon}>{item.icon}</span>
                        <span>{item.label}</span>
                        {item.label === 'Notifications' && (
                            <span className={styles.badge}>3</span>
                        )}
                    </Link>
                ))}

                {isAdmin && (
                    <Link
                        href="/admin"
                        className={`${styles.navItem} ${pathname.startsWith('/admin') ? styles.navActive : ''}`}
                        style={{ marginTop: 'var(--space-4)', border: '1px solid var(--brand-primary)', background: 'rgba(168,85,247,0.05)' }}
                    >
                        <span className={styles.navIcon}>🛡️</span>
                        <span style={{ color: 'var(--brand-primary)', fontWeight: 600 }}>Admin Panel</span>
                    </Link>
                )}
            </nav>

            <div className={styles.divider} />

            {/* Quick actions */}
            <div className={styles.quick}>
                <Link href="/hospitals" className={styles.quickBtn}>
                    <span>🔍</span> Find Hospital
                </Link>
                <Link href="/hospitals" className={styles.quickBtn}>
                    <span>➕</span> Book Slot
                </Link>
            </div>

            {/* Sign out */}
            <button className={styles.signout} onClick={() => signOut(auth)}>
                <span>↩</span> Sign Out
            </button>
        </aside>
    );
}
