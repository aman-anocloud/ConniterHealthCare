'use client';

import Link from 'next/link';
import styles from './AboutSection.module.css';

const features = [
    {
        title: 'Digital Slot Booking',
        desc: 'Medical representatives book hospital visits in advance — no more waiting in reception or being turned away at the gate.',
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
        ),
        color: '#0a84ff',
        bg: '#e8f4ff',
    },
    {
        title: 'Verified Professionals',
        desc: 'Every hospital, distributor, and med rep on the platform goes through a structured verification process before they can operate.',
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
        ),
        color: '#00c896',
        bg: '#e6faf5',
    },
    {
        title: 'Real-Time Delivery Tracking',
        desc: 'Gate-level visibility for hospital deliveries. Know exactly when supplies arrive, reduce congestion, and stay on schedule.',
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="1" y="3" width="15" height="13" rx="1"></rect>
                <path d="M16 8h5l2 4v4h-7V8z"></path>
                <circle cx="5.5" cy="18.5" r="2.5"></circle>
                <circle cx="18.5" cy="18.5" r="2.5"></circle>
            </svg>
        ),
        color: '#6c5ce7',
        bg: '#f0eeff',
    },
    {
        title: 'Secure & Compliant',
        desc: 'Data privacy, role-based access, and audit trails built in from day one — so your operations stay protected.',
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
            </svg>
        ),
        color: '#f4a100',
        bg: '#fff8e6',
    },
];

export default function AboutSection() {
    return (
        <section className={styles.about}>
            <div className={styles.container}>
                {/* Left Text Column */}
                <div className={styles.leftCol}>
                    <span className={styles.tagline}>Our Story</span>
                    <h2 className={styles.heading}>
                        Compassionate Care,<br />
                        <span className="gradient-text">Powered by Technology</span>
                    </h2>
                    <p className={styles.body}>
                        For years, hospital corridors were clogged with unplanned visits, surprise deliveries, and
                        overflowing waiting rooms. We built Conninter because we saw a better way — one where
                        hospitals could open their doors on their own terms, and where healthcare professionals
                        could spend less time waiting and more time actually helping people.
                    </p>
                    <p className={styles.body}>
                        Today, we work with hospitals, distributors, and medical representatives across India to
                        bring order and efficiency to healthcare coordination. It&apos;s not just scheduling software —
                        it&apos;s a system built around how healthcare actually works.
                    </p>
                    <Link href="/about" className="btn-primary">
                        Learn More About Us
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </Link>

                    {/* 24/7 Badge */}
                    <div className={styles.emergencyBadge}>
                        <div className={styles.badgeDot} />
                        <div>
                            <p className={styles.badgeTitle}>24/7 Emergency Support</p>
                            <p className={styles.badgeSub}>Always here when you need us most</p>
                        </div>
                    </div>
                </div>

                {/* Right Features Grid */}
                <div className={styles.rightCol}>
                    <div className={styles.featuresGrid}>
                        {features.map((f, i) => (
                            <div key={i} className={styles.featureCard}>
                                <div className={styles.featureIconWrap} style={{ background: f.bg, color: f.color }}>
                                    {f.icon}
                                </div>
                                <h4 className={styles.featureTitle}>{f.title}</h4>
                                <p className={styles.featureDesc}>{f.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
