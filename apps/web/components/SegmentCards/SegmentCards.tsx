'use client';

import { useState } from 'react';
import styles from './SegmentCards.module.css';
import LeadModal from '@/components/LeadModal/LeadModal';

const segments = [
    {
        id: 'hospital',
        icon: '🏥',
        title: 'Hospitals',
        subtitle: 'For Healthcare Institutions',
        description:
            'Modernise your visitor and delivery management. Reduce gate congestion, eliminate unscheduled visits, and give departments full visibility over incoming representatives.',
        features: ['Slot Management Dashboard', 'Multi-department Scheduling', 'Real-time Analytics', 'Security Integration'],
        cta: 'Register Your Hospital',
        accent: 'blue',
        badge: 'VMS + DMS',
    },
    {
        id: 'distributor',
        icon: '🚚',
        title: 'Distributors',
        subtitle: 'For Medical Supply Chains',
        description:
            'Schedule hospital delivery windows in advance. Get confirmed slots, track delivery status, and eliminate wasted trips caused by unannounced arrivals.',
        features: ['Advance Slot Booking', 'Delivery Status Tracking', 'Multi-hospital Coverage', 'Route Optimisation'],
        cta: 'Join as Distributor',
        accent: 'green',
        badge: 'DMS',
    },
    {
        id: 'medRep',
        icon: '💼',
        title: 'Medical Reps',
        subtitle: 'For Pharma / Device Representatives',
        description:
            'Book confirmed doctor meeting slots from your phone. No more waiting in lobbies, security friction, or last-minute cancellations without notice.',
        features: ['Doctor Slot Booking', 'Visit History & Reports', 'Push Notifications', 'Calendar Sync'],
        cta: 'Start Booking Visits',
        accent: 'purple',
        badge: 'VMS',
    },
];

export default function SegmentCards() {
    const [activeModal, setActiveModal] = useState<string | null>(null);

    return (
        <section className={styles.section} id="segments">
            <div className="container">
                <div className={styles.header}>
                    <div className="badge badge-blue" style={{ marginBottom: 16 }}>Who We Serve</div>
                    <h2 className={styles.title}>
                        Built for Every <span className="gradient-text">Healthcare Stakeholder</span>
                    </h2>
                    <p className={styles.subtitle}>
                        One platform, three powerful workflows — tailored for hospitals, distributors, and medical representatives.
                    </p>
                </div>

                <div className={styles.grid}>
                    {segments.map((seg, i) => (
                        <div
                            key={seg.id}
                            className={`${styles.card} ${styles[`card_${seg.accent}`]}`}
                            style={{ animationDelay: `${i * 0.15}s` }}
                        >
                            <div className={styles.cardHeader}>
                                <span className={styles.icon}>{seg.icon}</span>
                                <span className={`badge badge-${seg.accent}`}>{seg.badge}</span>
                            </div>

                            <h3 className={styles.cardTitle}>{seg.title}</h3>
                            <p className={styles.cardSub}>{seg.subtitle}</p>
                            <p className={styles.cardDesc}>{seg.description}</p>

                            <ul className={styles.features}>
                                {seg.features.map((f) => (
                                    <li key={f}>
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                            <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        {f}
                                    </li>
                                ))}
                            </ul>

                            <button
                                className={`${styles.cta} btn-${seg.accent === 'blue' ? 'primary' : 'secondary'}`}
                                onClick={() => setActiveModal(seg.id)}
                            >
                                {seg.cta}
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M5 12h14M12 5l7 7-7 7" />
                                </svg>
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {activeModal && (
                <LeadModal
                    segment={activeModal as 'hospital' | 'distributor' | 'medRep'}
                    onClose={() => setActiveModal(null)}
                />
            )}
        </section>
    );
}
