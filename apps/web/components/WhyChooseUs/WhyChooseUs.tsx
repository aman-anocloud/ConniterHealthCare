'use client';

import styles from './WhyChooseUs.module.css';

const features = [
    {
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
            </svg>
        ),
        title: 'Advanced Technology',
        desc: 'Our platform is built on real-time infrastructure. Scheduling, notifications, and status updates happen instantly — not when someone remembers to check.',
    },
    {
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
        ),
        title: '24/7 Availability',
        desc: 'Hospitals don\'t stop, and neither do we. The platform is available around the clock, with support on hand for any coordination issue.',
    },
    {
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
        ),
        title: 'Expert & Verified Network',
        desc: 'Every partner on Conninter — hospital, distributor, or rep — goes through a structured verification process so you always know who you\'re dealing with.',
    },
    {
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="20" x2="18" y2="10"></line>
                <line x1="12" y1="20" x2="12" y2="4"></line>
                <line x1="6" y1="20" x2="6" y2="14"></line>
            </svg>
        ),
        title: 'Real-Time Dashboards',
        desc: 'Administrators get a live view of all active bookings, pending deliveries, and system health — without digging through spreadsheets.',
    },
    {
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
            </svg>
        ),
        title: 'Paperless Operations',
        desc: 'Every visit request, delivery schedule, and approval flows digitally. No clipboards, no printed slips, no manual registers.',
    },
    {
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
            </svg>
        ),
        title: 'Compliance Ready',
        desc: 'Role-based access controls, digital audit trails, and data protection built into the core of the platform from the start.',
    },
];

export default function WhyChooseUs() {
    return (
        <section className={styles.whySection}>
            <div className={styles.container}>
                {/* Left dark panel */}
                <div className={styles.leftPanel}>
                    <span className={styles.tagline}>Why Conninter</span>
                    <h2 className={styles.heading}>
                        Why Leading Hospitals Trust Conninter
                    </h2>
                    <p className={styles.body}>
                        We didn&apos;t build just another scheduling tool. We built a coordination layer for the
                        healthcare supply chain — one that respects how hospitals actually operate.
                    </p>

                    {/* Testimonial */}
                    <div className={styles.testimonial}>
                        <p className={styles.quote}>
                            &ldquo;Conninter cut our unplanned visitor intake by 70%. Our front desk isn&apos;t drowning anymore — and our reps actually show up on time.&rdquo;
                        </p>
                        <div className={styles.author}>
                            <div className={styles.authorAvatar}>SK</div>
                            <div>
                                <p className={styles.authorName}>Suresh Kulkarni</p>
                                <p className={styles.authorRole}>General Manager, Sakra World Hospital</p>
                            </div>
                        </div>
                    </div>

                    <div className={styles.statsStrip}>
                        <div className={styles.stripStat}>
                            <p className={styles.stripValue}>500+</p>
                            <p className={styles.stripLabel}>Hospitals</p>
                        </div>
                        <div className={styles.stripDivider} />
                        <div className={styles.stripStat}>
                            <p className={styles.stripValue}>1M+</p>
                            <p className={styles.stripLabel}>Bookings</p>
                        </div>
                        <div className={styles.stripDivider} />
                        <div className={styles.stripStat}>
                            <p className={styles.stripValue}>45</p>
                            <p className={styles.stripLabel}>Cities</p>
                        </div>
                    </div>
                </div>

                {/* Right features grid */}
                <div className={styles.rightPanel}>
                    {features.map((f, i) => (
                        <div key={i} className={styles.featureItem}>
                            <div className={styles.featureIconWrap}>
                                <span className={styles.featureIcon}>{f.icon}</span>
                            </div>
                            <div className={styles.featureText}>
                                <h4 className={styles.featureTitle}>{f.title}</h4>
                                <p className={styles.featureDesc}>{f.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
