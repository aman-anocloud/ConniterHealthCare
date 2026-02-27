'use client';

import Link from 'next/link';
import styles from './page.module.css';

const visits = [
    { id: 1, doctor: 'Dr. Rajesh Kumar', dept: 'Cardiology', hospital: 'Apollo Hospitals', date: 'Mar 01, 2026', time: '10:00 AM', status: 'confirmed' },
    { id: 2, doctor: 'Dr. Priya Nair', dept: 'Orthopaedics', hospital: 'Manipulation Hospital', date: 'Mar 08, 2026', time: '11:00 AM', status: 'confirmed' },
    { id: 3, doctor: 'Dr. S. Venkatesh', dept: 'Oncology', hospital: 'Apollo Hospitals', date: 'Mar 15, 2026', time: '3:00 PM', status: 'pending' },
    { id: 4, doctor: 'Dr. Anil Mehta', dept: 'General Surgery', hospital: 'Narayana Health', date: 'Feb 20, 2026', time: '10:30 AM', status: 'completed' },
    { id: 5, doctor: 'Dr. Deepika Rao', dept: 'Neurology', hospital: 'Fortis Healthcare', date: 'Feb 10, 2026', time: '2:00 PM', status: 'cancelled' },
];

const STATUS_COLOR: Record<string, string> = {
    confirmed: 'blue',
    pending: 'orange',
    completed: 'green',
    cancelled: 'error',
};

export default function VisitsPage() {
    return (
        <div className={styles.page}>
            <div className={styles.header}>
                <div>
                    <h1 className={styles.title}>My Visits</h1>
                    <p className={styles.subtitle}>All your scheduled and past hospital visits via VMS.</p>
                </div>
                <Link href="/hospitals" className="btn-primary" style={{ fontSize: 14, padding: '10px 20px' }}>
                    ➕ Book New Visit
                </Link>
            </div>

            {/* Filter tabs */}
            <div className={styles.tabs}>
                {['All', 'Upcoming', 'Completed', 'Cancelled'].map((t) => (
                    <button key={t} className={styles.tab}>{t}</button>
                ))}
            </div>

            <div className={styles.list}>
                {visits.map((v) => (
                    <div key={v.id} className={styles.card}>
                        <div className={styles.cardLeft}>
                            <div className={styles.hospitalAvatar}>{v.hospital[0]}</div>
                            <div>
                                <p className={styles.doctorName}>{v.doctor}</p>
                                <p className={styles.dept}>{v.dept} · {v.hospital}</p>
                                <p className={styles.datetime}>📅 {v.date} &nbsp;🕐 {v.time}</p>
                            </div>
                        </div>
                        <div className={styles.cardRight}>
                            <span className={`badge badge-${STATUS_COLOR[v.status] === 'error' ? 'blue' : STATUS_COLOR[v.status]}`}
                                style={v.status === 'cancelled' ? { background: 'rgba(232,64,64,0.15)', color: '#e84040', border: '1px solid rgba(232,64,64,0.3)' } : undefined}>
                                {v.status.charAt(0).toUpperCase() + v.status.slice(1)}
                            </span>
                            {v.status !== 'completed' && v.status !== 'cancelled' && (
                                <button className="btn-ghost" style={{ fontSize: 13 }}>Cancel</button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
