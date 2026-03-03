'use client';

import styles from './StatsBar.module.css';
import { useCountUp } from '@/hooks/useScrollAnimation';

function StatItem({ value, suffix, label, icon }: { value: number, suffix: string, label: string, icon: React.ReactNode }) {
    const numRef = useCountUp(value, 1800);
    return (
        <div className={styles.stat}>
            <span className={styles.icon}>{icon}</span>
            <div className={styles.textGroup}>
                <span className={styles.value}>
                    <span ref={numRef}>0</span>{suffix}
                </span>
                <span className={styles.label}>{label}</span>
            </div>
        </div>
    );
}

export default function StatsBar() {
    return (
        <section className={styles.statsBar}>
            <div className={styles.inner}>
                <StatItem
                    value={500}
                    suffix="+"
                    label="Hospitals Connected"
                    icon={
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"></path>
                            <polyline points="9 22 9 12 15 12 15 22"></polyline>
                        </svg>
                    }
                />
                <div className={styles.divider} />
                <StatItem
                    value={1000000}
                    suffix="+"
                    label="Appointments Scheduled"
                    icon={
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                            <line x1="16" y1="2" x2="16" y2="6"></line>
                            <line x1="8" y1="2" x2="8" y2="6"></line>
                            <line x1="3" y1="10" x2="21" y2="10"></line>
                        </svg>
                    }
                />
                <div className={styles.divider} />
                <StatItem
                    value={50000}
                    suffix="+"
                    label="Healthcare Professionals"
                    icon={
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"></path>
                            <circle cx="9" cy="7" r="4"></circle>
                            <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"></path>
                        </svg>
                    }
                />
                <div className={styles.divider} />
                <StatItem
                    value={98}
                    suffix="%"
                    label="Satisfaction Rate"
                    icon={
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                        </svg>
                    }
                />
            </div>
        </section>
    );
}
