'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from './HospitalRibbon.module.css';

const CITIES = ['All Cities', 'Bengaluru', 'Mumbai', 'Delhi', 'Chennai', 'Hyderabad', 'Pune', 'Kolkata'];

const partners = [
    { name: 'Sakra World', cities: ['Bengaluru'], tier: 'Premium' },
    { name: 'Apollo Hospitals', cities: ['Chennai', 'Hyderabad', 'Bengaluru', 'Delhi', 'Mumbai'], tier: 'Premium' },
    { name: 'Fortis Healthcare', cities: ['Delhi', 'Mumbai', 'Bengaluru', 'Chennai'], tier: 'Premium' },
    { name: 'Manipal Hospital', cities: ['Bengaluru', 'Mumbai', 'Delhi'], tier: 'Partner' },
    { name: 'Columbia Asia', cities: ['Bengaluru', 'Pune'], tier: 'Partner' },
    { name: 'Narayana Health', cities: ['Bengaluru', 'Kolkata', 'Delhi'], tier: 'Partner' },
    { name: 'Aster Hospitals', cities: ['Bengaluru', 'Hyderabad'], tier: 'Partner' },
    { name: 'Global Hospitals', cities: ['Mumbai', 'Chennai', 'Hyderabad'], tier: 'Partner' },
];

// Duplicate for infinite marquee
const marqueeItems = [...partners, ...partners];

export default function HospitalRibbon() {
    const [city, setCity] = useState('All Cities');
    const [query, setQuery] = useState('');

    const filtered = partners.filter(
        (h) =>
            (city === 'All Cities' || h.cities.includes(city)) &&
            h.name.toLowerCase().includes(query.toLowerCase())
    );

    return (
        <section className={styles.section} id="partners">
            <div className="container">
                <div className={styles.header}>
                    <div className="badge badge-green" style={{ marginBottom: 16 }}>Trusted Network</div>
                    <h2 className={styles.title}>
                        Partner <span className="gradient-text-green">Hospitals</span>
                    </h2>
                    <p className={styles.subtitle}>Trusted by India's leading hospitals. Search by city to find slots near you.</p>
                </div>

                {/* Search + City Filter */}
                <div className={styles.searchBar}>
                    <div className={styles.searchInput}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
                        </svg>
                        <input
                            type="text"
                            placeholder="Search hospitals…"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                        />
                    </div>
                    <div className={styles.cityChips}>
                        {CITIES.map((c) => (
                            <button
                                key={c}
                                className={`${styles.chip} ${city === c ? styles.chipActive : ''}`}
                                onClick={() => setCity(c)}
                            >
                                {c}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Filtered results grid */}
                {(query || city !== 'All Cities') ? (
                    <div className={styles.resultGrid}>
                        {filtered.length === 0 ? (
                            <p className={styles.empty}>No hospitals found. Try a different city or search.</p>
                        ) : (
                            filtered.map((h) => (
                                <Link key={h.name} href={`/hospitals`} className={styles.resultCard}>
                                    <div className={styles.hospitalAvatar}>{h.name.charAt(0)}</div>
                                    <div>
                                        <p className={styles.hosName}>{h.name}</p>
                                        <p className={styles.hosCities}>{h.cities.join(', ')}</p>
                                    </div>
                                    <span className={`badge badge-${h.tier === 'Premium' ? 'blue' : 'green'}`}>{h.tier}</span>
                                </Link>
                            ))
                        )}
                    </div>
                ) : (
                    /* Marquee ribbon */
                    <div className={styles.marqueeWrap}>
                        <div className={styles.fade} />
                        <div className={styles.fadeRight} />
                        <div className={styles.marquee}>
                            {marqueeItems.map((h, i) => (
                                <div key={i} className={styles.pill}>
                                    <div className={styles.pillAvatar}>{h.name.charAt(0)}</div>
                                    <span>{h.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <div style={{ textAlign: 'center', marginTop: 40 }}>
                    <Link href="/hospitals" className="btn-secondary">
                        View All Hospitals
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </Link>
                </div>
            </div>
        </section>
    );
}
