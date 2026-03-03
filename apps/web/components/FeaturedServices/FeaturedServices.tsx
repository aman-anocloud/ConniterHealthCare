'use client';

import Link from 'next/link';
import styles from './FeaturedServices.module.css';

const mainServices = [
    {
        gradient: 'linear-gradient(135deg, #0a84ff 0%, #45a3ff 100%)',
        iconBg: '#e8f4ff',
        iconColor: '#0a84ff',
        title: 'Slot Booking for Hospital Visits',
        desc: 'Medical representatives plan their hospital visits digitally. No walk-ins, no waiting — just confirmed, scheduled access to the right department at the right time.',
        link: '/hospitals',
        icon: (
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
                <path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01"></path>
            </svg>
        ),
    },
    {
        gradient: 'linear-gradient(135deg, #00c896 0%, #00b4d8 100%)',
        iconBg: '#e6faf5',
        iconColor: '#00c896',
        title: 'Supply Dispatch Coordination',
        desc: 'Distributors pre-schedule gate deliveries so hospitals can prepare receiving teams and avoid backlog at the entry point.',
        link: '/hospitals',
        icon: (
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="1" y="3" width="15" height="13" rx="1"></rect>
                <path d="M16 8h5l2 4v4h-7V8z"></path>
                <circle cx="5.5" cy="18.5" r="2.5"></circle>
                <circle cx="18.5" cy="18.5" r="2.5"></circle>
            </svg>
        ),
    },
    {
        gradient: 'linear-gradient(135deg, #6c5ce7 0%, #a29bfe 100%)',
        iconBg: '#f0eeff',
        iconColor: '#6c5ce7',
        title: 'Diagnostics & Lab Coordination',
        desc: 'Route lab samples, diagnostic requests, and specialist consultations through a single digital channel rather than phone calls and paper slips.',
        link: '/hospitals',
        icon: (
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v11m0 0h6m-6 0a2 2 0 0 0 0 4h6a2 2 0 0 0 0-4m0-11v11"></path>
            </svg>
        ),
    },
];

const miniServices = [
    {
        name: 'Med Rep Tour Management',
        icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>,
    },
    {
        name: 'Vaccination Drive Scheduling',
        icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3l18 18M10.5 10.677a2 2 0 0 0 2.823 2.823"></path><path d="M7.362 5.104a9 9 0 0 1 12.534 12.534M5.104 7.362A9 9 0 1 0 17.638 19.9"></path></svg>,
    },
    {
        name: 'Emergency Routing',
        icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>,
    },
    {
        name: 'Smart Analytics Dashboard',
        icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>,
    },
    {
        name: 'Digital Health Records',
        icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line></svg>,
    },
    {
        name: 'Staff Scheduling',
        icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>,
    },
];

export default function FeaturedServices() {
    return (
        <section className={styles.services}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <span className={styles.tagline}>What We Do</span>
                    <h2 className={styles.heading}>Comprehensive Healthcare <span className="gradient-text">Coordination</span></h2>
                    <p className={styles.sub}>We connect every part of the healthcare supply chain — from the front gate to the operating room.</p>
                </div>

                <div className={styles.mainGrid}>
                    {mainServices.map((s, i) => (
                        <div key={i} className={styles.serviceCard}>
                            <div className={styles.serviceIconWrap} style={{ background: s.iconBg, color: s.iconColor }}>
                                {s.icon}
                            </div>
                            <h3 className={styles.serviceTitle}>{s.title}</h3>
                            <p className={styles.serviceDesc}>{s.desc}</p>
                            <Link href={s.link} className={styles.serviceLink}>
                                Learn more
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M5 12h14M12 5l7 7-7 7" />
                                </svg>
                            </Link>
                        </div>
                    ))}
                </div>

                <div className={styles.miniGrid}>
                    {miniServices.map((m, i) => (
                        <div key={i} className={styles.miniChip}>
                            <span className={styles.miniIcon}>{m.icon}</span>
                            <span className={styles.miniName}>{m.name}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
