'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import styles from './page.module.css';

export default function SettingsPage() {
    const { user } = useAuth();
    const [name, setName] = useState(user?.displayName ?? '');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('medRep');
    const [org, setOrg] = useState('');
    const [saved, setSaved] = useState(false);

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
    };

    return (
        <div className={styles.page}>
            <div>
                <h1 className={styles.title}>Settings</h1>
                <p className={styles.subtitle}>Manage your profile and account preferences.</p>
            </div>

            <form className={styles.form} onSubmit={handleSave}>
                {/* Profile */}
                <div className={styles.section}>
                    <h2 className={styles.sectionTitle}>Profile</h2>
                    <div className={styles.row}>
                        <div className={styles.avatarBlock}>
                            <div className={styles.bigAvatar}>{(name || 'U')[0].toUpperCase()}</div>
                            <button type="button" className="btn-ghost" style={{ fontSize: 12 }}>Change Photo</button>
                        </div>
                        <div className={styles.fields}>
                            <div className={styles.field}>
                                <label>Full Name</label>
                                <input value={name} onChange={e => setName(e.target.value)} placeholder="Dr. Ananya Sharma" />
                            </div>
                            <div className={styles.field}>
                                <label>Email Address</label>
                                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" />
                            </div>
                            <div className={styles.field}>
                                <label>Phone Number</label>
                                <input value={user?.phoneNumber ?? ''} disabled />
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles.divider} />

                {/* Role */}
                <div className={styles.section}>
                    <h2 className={styles.sectionTitle}>Role & Organisation</h2>
                    <div className={styles.roleRow}>
                        {[
                            { value: 'medRep', label: 'Medical Rep', icon: '💼' },
                            { value: 'distributor', label: 'Distributor', icon: '🚚' },
                            { value: 'hospital', label: 'Hospital Staff', icon: '🏥' },
                        ].map((r) => (
                            <button
                                key={r.value}
                                type="button"
                                className={`${styles.roleBtn} ${role === r.value ? styles.roleActive : ''}`}
                                onClick={() => setRole(r.value)}
                            >
                                <span>{r.icon}</span>
                                {r.label}
                            </button>
                        ))}
                    </div>
                    <div className={styles.field} style={{ marginTop: 16 }}>
                        <label>Organisation / Company</label>
                        <input value={org} onChange={e => setOrg(e.target.value)} placeholder="e.g. Roche Pharma India" />
                    </div>
                </div>

                <div className={styles.divider} />

                <div className={styles.footer}>
                    {saved && <span className={styles.saved}>✓ Changes saved!</span>}
                    <button type="submit" className="btn-primary" style={{ padding: '12px 28px' }}>
                        Save Changes
                    </button>
                </div>
            </form>
        </div>
    );
}
