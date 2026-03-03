'use client';

import Link from 'next/link';
import styles from './EmergencyCTA.module.css';

export default function EmergencyCTA() {
    return (
        <section className={styles.cta}>
            <div className={styles.container}>
                {/* Left: Content */}
                <div className={styles.content}>
                    <div className={styles.badge}>
                        <span className={styles.badgeDot} />
                        Always Available
                    </div>
                    <h2 className={styles.heading}>
                        Need to Connect with a<br />
                        Hospital Right Now?
                    </h2>
                    <p className={styles.body}>
                        Our coordination team is available around the clock to help hospitals, reps, and distributors
                        resolve scheduling conflicts, emergency visits, and urgent delivery requests.
                    </p>
                    <div className={styles.actions}>
                        <Link href="tel:+918000000000" className={styles.callBtn}>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                            </svg>
                            Call Support Line
                        </Link>
                        <Link href="/hospitals" className={styles.findBtn}>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                                <circle cx="12" cy="10" r="3"></circle>
                            </svg>
                            Find a Hospital
                        </Link>
                    </div>
                </div>

                {/* Right: Floating status cards (isolated column) */}
                <div className={styles.cardsCol}>
                    <div className={styles.floatCard}>
                        <div className={styles.floatIcon} style={{ background: '#e8f4ff' }}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0a84ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                                <line x1="16" y1="2" x2="16" y2="6"></line>
                                <line x1="8" y1="2" x2="8" y2="6"></line>
                                <line x1="3" y1="10" x2="21" y2="10"></line>
                            </svg>
                        </div>
                        <div>
                            <p className={styles.floatTitle}>Slot Confirmed</p>
                            <p className={styles.floatSub}>Sakra Hospital · Today 3:00 PM</p>
                        </div>
                        <div className={styles.floatCheck}>
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                        </div>
                    </div>

                    <div className={styles.floatCard}>
                        <div className={styles.floatIcon} style={{ background: '#e6faf5' }}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00c896" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="1" y="3" width="15" height="13" rx="1"></rect>
                                <path d="M16 8h5l2 4v4h-7V8z"></path>
                                <circle cx="5.5" cy="18.5" r="2.5"></circle>
                                <circle cx="18.5" cy="18.5" r="2.5"></circle>
                            </svg>
                        </div>
                        <div>
                            <p className={styles.floatTitle}>Delivery Scheduled</p>
                            <p className={styles.floatSub}>Gate B · Tomorrow 9:00 AM</p>
                        </div>
                        <div className={styles.floatCheck} style={{ background: '#00c896' }}>
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                        </div>
                    </div>

                    <div className={styles.liveIndicator}>
                        <span className={styles.liveDot} />
                        <span>Live coordination active now</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
