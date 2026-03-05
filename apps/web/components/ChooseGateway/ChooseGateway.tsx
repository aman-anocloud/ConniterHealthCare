'use client';

import Link from 'next/link';
import styles from './ChooseGateway.module.css';

const gateways = [
    {
        id: 'hospitals',
        title: 'For Hospitals',
        icon: '🏥',
        description: 'A unified portal to manage digital slot bookings, internal visitor tracking, and dispatch reporting.',
        benefits: ['Streamlined Visitor Management', '24/7 Ward Analytics', 'Med Rep Filtering'],
        link: '/hospitals',
        lightBg: '#e8eeff',
        color: 'var(--brand-primary)',
    },
    {
        id: 'distributors',
        title: 'For Distributors',
        icon: '🚛',
        description: 'Ensure your delivery timelines are perfectly aligned with hospital operation hours and inventory needs.',
        benefits: ['Real-Time Supply Tracking', 'Direct Ward Communication', 'Automated Verification'],
        link: '/auth',
        lightBg: '#f4fbf9',
        color: 'var(--brand-secondary-dark)',
    },
    {
        id: 'medreps',
        title: 'For Med Reps',
        icon: '🩺',
        description: 'Digitally request meeting slots with top doctors without waiting in line or cold-calling the reception.',
        benefits: ['Instant Slot Approvals', 'In-App Doctor Chat', 'Product Catalog Uploads'],
        link: '/auth',
        lightBg: '#f7f6fd',
        color: 'var(--brand-accent)',
    },
];

export default function ChooseGateway() {
    return (
        <section className={styles.section} id="gateway">
            <div className="container">
                <div className={styles.header}>
                    <h2 className={styles.title}>Choose Your Gateway</h2>
                    <p className={styles.subtitle}>
                        Select the portal that best fits your role to access specialized tools and analytics tailored to your daily operations in the healthcare ecosystem.
                    </p>
                </div>

                <div className={styles.grid}>
                    {gateways.map((g) => (
                        <div key={g.id} className={`${styles.card} hover-gradient-border`}>
                            <div className={styles.iconWrap} style={{ background: g.lightBg, color: g.color }}>
                                {g.icon}
                            </div>
                            <h3 className={styles.cardTitle}>{g.title}</h3>
                            <p className={styles.cardDesc}>{g.description}</p>

                            <ul className={styles.benefitsList}>
                                {g.benefits.map((b, i) => (
                                    <li key={i}>
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={g.color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                            <polyline points="20 6 9 17 4 12" />
                                        </svg>
                                        {b}
                                    </li>
                                ))}
                            </ul>

                            <Link href={g.link} className={styles.ctaBtn} style={{ background: g.color, borderColor: g.color }}>
                                Select Your Gateway
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M5 12h14M12 5l7 7-7 7" />
                                </svg>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
