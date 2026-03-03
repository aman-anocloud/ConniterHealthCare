'use client';

import Link from 'next/link';
import styles from './Departments.module.css';

const mainDepts = [
    {
        color: '#0a84ff',
        bgColor: '#e8f4ff',
        name: 'Visitor Management System',
        desc: 'Digital pre-booking for doctors, department heads, and wards. Reps schedule visits in advance, eliminating waiting rooms and front-desk chaos.',
        link: '/hospitals',
        linkText: 'Explore VMS',
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
            </svg>
        ),
    },
    {
        color: '#00c896',
        bgColor: '#e6faf5',
        name: 'Delivery Management System',
        desc: 'Schedule gate-level deliveries in advance. Hospitals control when supplies arrive — no surprise congestion, no delayed packages.',
        link: '/hospitals',
        linkText: 'Explore DMS',
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="1" y="3" width="15" height="13" rx="1"></rect>
                <path d="M16 8h5l2 4v4h-7V8z"></path>
                <circle cx="5.5" cy="18.5" r="2.5"></circle>
                <circle cx="18.5" cy="18.5" r="2.5"></circle>
            </svg>
        ),
    },
    {
        color: '#e84040',
        bgColor: '#ffeaea',
        name: 'Emergency Services 24/7',
        desc: 'Our emergency coordination line is staffed around the clock with trained responders ready to connect the right people in seconds.',
        link: '/auth',
        linkText: 'Contact Support',
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
            </svg>
        ),
    },
];

const sideDepts = [
    {
        name: 'Hospital Directory',
        desc: 'Search and discover verified hospitals by city, specialty, and available slots.',
        link: '/hospitals',
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
        ),
    },
    {
        name: 'Professional Network',
        desc: 'A curated network of medical representatives, distributors, and hospital staff.',
        link: '/auth',
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
        ),
    },
    {
        name: 'Admin Analytics',
        desc: 'Live dashboards for hospital coordinators — bookings, deliveries, and capacity at a glance.',
        link: '/dashboard',
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="20" x2="18" y2="10"></line>
                <line x1="12" y1="20" x2="12" y2="4"></line>
                <line x1="6" y1="20" x2="6" y2="14"></line>
            </svg>
        ),
    },
];

export default function Departments() {
    return (
        <section className={styles.depts}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <span className={styles.tagline}>What We Offer</span>
                    <h2 className={styles.heading}>Featured Departments</h2>
                    <p className={styles.sub}>A unified platform covering everything from scheduled visits to last-mile delivery coordination.</p>
                </div>

                <div className={styles.mainGrid}>
                    {mainDepts.map((dept, i) => (
                        <div key={i} className={styles.mainCard} style={{ '--dept-color': dept.color } as React.CSSProperties}>
                            <div className={styles.mainCardIconWrap} style={{ background: dept.bgColor, color: dept.color }}>
                                {dept.icon}
                            </div>
                            <h3 className={styles.mainCardTitle}>{dept.name}</h3>
                            <p className={styles.mainCardDesc}>{dept.desc}</p>
                            <Link href={dept.link} className={styles.mainCardLink} style={{ color: dept.color }}>
                                {dept.linkText}
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M5 12h14M12 5l7 7-7 7" />
                                </svg>
                            </Link>
                        </div>
                    ))}
                </div>

                <div className={styles.sideGrid}>
                    {sideDepts.map((dept, i) => (
                        <Link href={dept.link} key={i} className={styles.sideCard}>
                            <span className={styles.sideCardIcon}>{dept.icon}</span>
                            <div>
                                <h4 className={styles.sideCardTitle}>{dept.name}</h4>
                                <p className={styles.sideCardDesc}>{dept.desc}</p>
                            </div>
                            <svg className={styles.sideCardArrow} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
