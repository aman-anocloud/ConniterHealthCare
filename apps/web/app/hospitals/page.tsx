'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';
import styles from './page.module.css';

const CITIES = ['All', 'Bengaluru', 'Mumbai', 'Delhi', 'Chennai', 'Hyderabad', 'Pune'];

const hospitals = [
    { id: '1', name: 'Apollo Hospitals', city: 'Chennai', rating: 4.8, beds: 710, specialities: ['Cardiology', 'Oncology', 'Neurology'], nextSlot: 'Today, 2:30 PM', tier: 'Premium' },
    { id: '2', name: 'Sakra World Hospital', city: 'Bengaluru', rating: 4.7, beds: 340, specialities: ['Orthopaedics', 'Sports Medicine', 'Spine'], nextSlot: 'Today, 4:00 PM', tier: 'Premium' },
    { id: '3', name: 'Fortis Healthcare', city: 'Delhi', rating: 4.6, beds: 500, specialities: ['Cardiology', 'General Surgery', 'Gynaecology'], nextSlot: 'Tomorrow, 10:00 AM', tier: 'Premium' },
    { id: '4', name: 'Manipal Hospital', city: 'Bengaluru', rating: 4.5, beds: 600, specialities: ['Oncology', 'Neurology', 'Paediatrics'], nextSlot: 'Tomorrow, 11:30 AM', tier: 'Partner' },
    { id: '5', name: 'Narayana Health', city: 'Bengaluru', rating: 4.6, beds: 1400, specialities: ['Cardiac Surgery', 'Transplants', 'Nephrology'], nextSlot: 'Mar 02, 9:00 AM', tier: 'Partner' },
    { id: '6', name: 'Aster Hospitals', city: 'Hyderabad', rating: 4.4, beds: 450, specialities: ['General Medicine', 'Orthopaedics'], nextSlot: 'Mar 03, 3:00 PM', tier: 'Partner' },
];

export default function HospitalsPage() {
    const [city, setCity] = useState('All');
    const [query, setQuery] = useState('');

    const filtered = hospitals.filter(
        (h) =>
            (city === 'All' || h.city === city) &&
            h.name.toLowerCase().includes(query.toLowerCase()),
    );

    return (
        <>
            <Navbar />
            <main className={styles.main}>
                <div className="container">
                    {/* Header */}
                    <div className={styles.header}>
                        <div className="badge badge-blue" style={{ marginBottom: 12 }}>Hospital Directory</div>
                        <h1 className={styles.title}>Find <span className="gradient-text">Partner Hospitals</span></h1>
                        <p className={styles.subtitle}>Search and book slots at 120+ verified partner hospitals across India.</p>
                    </div>

                    {/* Search bar */}
                    <div className={styles.search}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
                        </svg>
                        <input placeholder="Search by hospital name…" value={query} onChange={e => setQuery(e.target.value)} />
                    </div>

                    {/* City filter */}
                    <div className={styles.cityRow}>
                        {CITIES.map((c) => (
                            <button key={c} className={`${styles.chip} ${city === c ? styles.chipActive : ''}`} onClick={() => setCity(c)}>
                                {c}
                            </button>
                        ))}
                    </div>

                    {/* Results */}
                    <p className={styles.count}>{filtered.length} hospitals found</p>

                    <div className={styles.grid}>
                        {filtered.map((h) => (
                            <Link key={h.id} href={`/hospitals/${h.id}`} className={styles.card}>
                                <div className={styles.cardTop}>
                                    <div className={styles.hosAvatar}>{h.name[0]}</div>
                                    <span className={`badge badge-${h.tier === 'Premium' ? 'blue' : 'green'}`}>{h.tier}</span>
                                </div>
                                <h2 className={styles.hosName}>{h.name}</h2>
                                <p className={styles.hosCity}>📍 {h.city}</p>
                                <div className={styles.specs}>
                                    <span>⭐ {h.rating}</span>
                                    <span>🛏 {h.beds} beds</span>
                                </div>
                                <div className={styles.specialities}>
                                    {h.specialities.slice(0, 2).map((s) => (
                                        <span key={s} className={styles.specialityPill}>{s}</span>
                                    ))}
                                    {h.specialities.length > 2 && <span className={styles.specialityPill}>+{h.specialities.length - 2}</span>}
                                </div>
                                <div className={styles.slot}>
                                    <span className={styles.slotDot} />
                                    Next slot: {h.nextSlot}
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
