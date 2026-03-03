'use client';

import Link from 'next/link';
import Image from 'next/image';
import styles from './Hero.module.css';

const trustHospitals = [
    { initials: 'S', name: 'Sakra World', color: '#003399' },
    { initials: 'A', name: 'Apollo', color: '#e84040' },
    { initials: 'F', name: 'Fortis', color: '#6c5ce7' },
    { initials: 'M', name: 'Manipal', color: '#00c896' },
];

export default function Hero() {
    return (
        <section className={styles.hero}>
            <div className={styles.container}>
                {/* ── Left Content Column ── */}
                <div className={styles.contentCol}>
                    <div className={`badge badge-blue ${styles.pillBadge}`}>
                        <span className={styles.dot} />
                        New: Smart Scheduling System
                    </div>

                    <h1 className={styles.headline}>
                        Meetings Made <span className="gradient-text">Easy</span> for Healthcare
                    </h1>

                    <p className={styles.sub}>
                        Streamline visitor management and coordinate medical representative meetings with
                        efficiency. Secure, compliant, and designed for modern hospitals.
                    </p>

                    <div className={styles.ctas}>
                        <Link href="/auth" className="btn-primary">
                            Connect With Us
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                        </Link>
                        <Link href="/hospitals" className="btn-secondary">
                            Explore Hospitals
                        </Link>
                    </div>

                    {/* Trust markers with hospital names */}
                    <div className={styles.trustSection}>
                        <p className={styles.trustLabel}>Trusted by leading medical institutions</p>
                        <div className={styles.trustLogos}>
                            {trustHospitals.map((h, i) => (
                                <div key={i} className={styles.trustPill} title={h.name}>
                                    <span className={styles.trustAvatar} style={{ background: h.color }}>
                                        {h.initials}
                                    </span>
                                    <span className={styles.trustName}>{h.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* ── Right Image Column ── */}
                <div className={styles.imageCol}>
                    <div className={styles.imageWrapper}>
                        {/* Real hero image */}
                        <div className={styles.mainImagePlaceholder}>
                            <div className={styles.topStatusBadge}>
                                <span className={styles.statusDot}></span> System Active
                            </div>
                            <div className={styles.dashboardImgWrap}>
                                <Image
                                    src="/hero-image.png"
                                    alt="Conninter – Doctor and patient using digital health platform"
                                    fill
                                    style={{ objectFit: 'cover', objectPosition: 'center top', borderRadius: '0 0 20px 20px' }}
                                    priority
                                />
                            </div>
                        </div>

                        {/* Floating "Meeting Confirmed" Card */}
                        <div className={styles.floatingCard}>
                            <div className={styles.cardIcon}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                                    <line x1="16" y1="2" x2="16" y2="6"></line>
                                    <line x1="8" y1="2" x2="8" y2="6"></line>
                                    <line x1="3" y1="10" x2="21" y2="10"></line>
                                </svg>
                            </div>
                            <div className={styles.cardContent}>
                                <h4>Meeting Confirmed</h4>
                                <p>Dr. Sarah Jenkins • Cardiology</p>
                            </div>
                            <div className={styles.cardCheck}>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="20 6 9 17 4 12"></polyline>
                                </svg>
                            </div>
                            <div className={styles.cardTime}>
                                11:30 AM
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Background glow orb */}
            <div className={styles.orb} />
        </section>
    );
}
