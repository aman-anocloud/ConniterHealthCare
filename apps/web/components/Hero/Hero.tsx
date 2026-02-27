'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './Hero.module.css';

const slides = [
    {
        badge: 'Visitor Management System',
        headline: 'End Unplanned Hospital Visits',
        sub: 'Digital slot booking for doctors, departments, and wards — eliminating waiting times and security risks for medical representatives.',
        cta1: 'Connect With Us',
        cta2: 'Explore Hospitals',
        accent: '#0a84ff',
    },
    {
        badge: 'Delivery Management System',
        headline: 'Schedule Deliveries. Prevent Congestion.',
        sub: 'Distributors schedule hospital gate deliveries in advance — no more material congestion, reception bottlenecks, or gate delays.',
        cta1: 'Start Scheduling',
        cta2: 'Explore Hospitals',
        accent: '#00c896',
    },
    {
        badge: 'Healthcare Ecosystem',
        headline: 'One Platform. Every Stakeholder.',
        sub: 'Hospitals, distributors, and medical representatives — all coordinated through a single intelligent dashboard with real-time updates.',
        cta1: 'Join the Network',
        cta2: 'Explore Hospitals',
        accent: '#6c5ce7',
    },
];

export default function Hero() {
    const [current, setCurrent] = useState(0);
    const [animating, setAnimating] = useState(false);

    useEffect(() => {
        const timer = setInterval(() => {
            setAnimating(true);
            setTimeout(() => {
                setCurrent((c) => (c + 1) % slides.length);
                setAnimating(false);
            }, 400);
        }, 5500);
        return () => clearInterval(timer);
    }, []);

    const slide = slides[current];

    return (
        <section className={styles.hero}>
            {/* Animated background grid */}
            <div className={styles.grid} />

            {/* Glow orbs */}
            <div className={styles.orb1} style={{ background: slide.accent }} />
            <div className={styles.orb2} />

            {/* Floating badge */}
            <div className={`${styles.content} ${animating ? styles.fadeOut : styles.fadeIn}`}>
                <div className="badge badge-blue" style={{ marginBottom: 24 }}>
                    <span className={styles.dot} />
                    {slide.badge}
                </div>

                <h1 className={styles.headline}>
                    {slide.headline.split(' ').map((word, i) => (
                        <span key={i} style={{ animationDelay: `${i * 0.08}s` }}>{word} </span>
                    ))}
                </h1>

                <p className={styles.sub}>{slide.sub}</p>

                <div className={styles.ctas}>
                    <Link href="/auth" className="btn-primary">
                        {slide.cta1}
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </Link>
                    <Link href="/hospitals" className="btn-secondary">
                        {slide.cta2}
                    </Link>
                </div>

                {/* Slide indicators */}
                <div className={styles.dots}>
                    {slides.map((_, i) => (
                        <button
                            key={i}
                            className={`${styles.dotBtn} ${i === current ? styles.dotActive : ''}`}
                            onClick={() => setCurrent(i)}
                            aria-label={`Slide ${i + 1}`}
                        />
                    ))}
                </div>
            </div>

            {/* Stats row */}
            <div className={styles.statsRow}>
                {[
                    { label: 'Partner Hospitals', value: '120+' },
                    { label: 'Appointments Booked', value: '50K+' },
                    { label: 'Deliveries Managed', value: '200K+' },
                    { label: 'Cities Covered', value: '28' },
                ].map((stat) => (
                    <div key={stat.label} className={styles.statCard}>
                        <span className={`${styles.statValue} gradient-text`}>{stat.value}</span>
                        <span className={styles.statLabel}>{stat.label}</span>
                    </div>
                ))}
            </div>
        </section>
    );
}
