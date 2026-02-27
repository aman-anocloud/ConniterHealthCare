'use client';

import Link from 'next/link';
import styles from '../visits/page.module.css';

const deliveries = [
    { id: 1, item: 'Surgical Instruments Set', hospital: 'Sakra World Hospital', date: 'Mar 05, 2026', time: '9:00 AM', slot: 'Gate A – Bay 3', status: 'confirmed' },
    { id: 2, item: 'Chemotherapy Drugs (Cold Chain)', hospital: 'Apollo Hospitals', date: 'Mar 12, 2026', time: '2:30 PM', slot: 'Gate B – Bay 1', status: 'confirmed' },
    { id: 3, item: 'Diagnostic Equipment', hospital: 'Fortis Healthcare', date: 'Mar 20, 2026', time: '11:00 AM', slot: 'Gate A – Bay 2', status: 'pending' },
    { id: 4, item: 'IV Fluids & Consumables', hospital: 'Columbia Asia', date: 'Feb 25, 2026', time: '1:00 PM', slot: 'Gate C – Bay 1', status: 'completed' },
    { id: 5, item: 'Lab Reagents', hospital: 'Manipal Hospital', date: 'Feb 14, 2026', time: '10:00 AM', slot: 'Gate A – Bay 1', status: 'completed' },
];

export default function DeliveriesPage() {
    return (
        <div className={styles.page}>
            <div className={styles.header}>
                <div>
                    <h1 className={styles.title}>My Deliveries</h1>
                    <p className={styles.subtitle}>Scheduled and past delivery windows via DMS.</p>
                </div>
                <Link href="/hospitals" className="btn-primary" style={{ fontSize: 14, padding: '10px 20px' }}>
                    ➕ Schedule Delivery
                </Link>
            </div>

            <div className={styles.tabs}>
                {['All', 'Upcoming', 'Completed', 'Cancelled'].map((t) => (
                    <button key={t} className={styles.tab}>{t}</button>
                ))}
            </div>

            <div className={styles.list}>
                {deliveries.map((d) => (
                    <div key={d.id} className={styles.card}>
                        <div className={styles.cardLeft}>
                            <div className={styles.hospitalAvatar} style={{ background: 'var(--gradient-success)' }}>🚚</div>
                            <div>
                                <p className={styles.doctorName}>{d.item}</p>
                                <p className={styles.dept}>🏥 {d.hospital} · {d.slot}</p>
                                <p className={styles.datetime}>📅 {d.date} &nbsp;🕐 {d.time}</p>
                            </div>
                        </div>
                        <div className={styles.cardRight}>
                            <span className={`badge badge-${d.status === 'confirmed' ? 'blue' : d.status === 'pending' ? 'orange' : 'green'}`}>
                                {d.status.charAt(0).toUpperCase() + d.status.slice(1)}
                            </span>
                            {d.status !== 'completed' && (
                                <button className="btn-ghost" style={{ fontSize: 13 }}>Cancel</button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
