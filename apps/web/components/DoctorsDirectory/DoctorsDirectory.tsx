'use client';

import Link from 'next/link';
import styles from './DoctorsDirectory.module.css';

const contacts = [
    {
        initials: 'AK',
        name: 'Ananya Krishnan',
        role: 'Hospital Coordinator',
        hospital: 'Sakra World Hospital, Bengaluru',
        color: '#0a84ff',
        specialty: 'VMS & Slot Management',
    },
    {
        initials: 'RS',
        name: 'Rohit Sharma',
        role: 'Medical Representative Lead',
        hospital: 'Manipal Hospital, Pune',
        color: '#00c896',
        specialty: 'Pharmaceutical Liaison',
    },
    {
        initials: 'PD',
        name: 'Priya Desai',
        role: 'Supply Chain Manager',
        hospital: 'Fortis Healthcare, Mumbai',
        color: '#6c5ce7',
        specialty: 'DMS & Gate Deliveries',
    },
    {
        initials: 'MJ',
        name: 'Mohammed Javed',
        role: 'Hospital Admin',
        hospital: 'Apollo Hospitals, Chennai',
        color: '#f4a100',
        specialty: 'Operations & Compliance',
    },
    {
        initials: 'SP',
        name: 'Savita Patil',
        role: 'Distributor Partner',
        hospital: 'MedHub Distributors, Hyderabad',
        color: '#e84040',
        specialty: 'Logistics & Dispatch',
    },
    {
        initials: 'VN',
        name: 'Vikram Nair',
        role: 'Regional Sales Head',
        hospital: 'Narayana Health, Bengaluru',
        color: '#00c896',
        specialty: 'Territory & Schedule Planning',
    },
];

export default function DoctorsDirectory() {
    return (
        <section className={styles.directory}>
            <div className={styles.container}>
                {/* Header */}
                <div className={styles.header}>
                    <span className={styles.tagline}>And Those We Serve</span>
                    <h2 className={styles.heading}>
                        Find Your Healthcare<br />
                        <span className="gradient-text">Contact & Partner</span>
                    </h2>
                    <p className={styles.sub}>
                        Search our network of hospital coordinators, medical representatives, and logistics partners working across India.
                    </p>
                </div>

                {/* Search / Filter row */}
                <div className={styles.searchRow}>
                    <div className={styles.searchField}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                        </svg>
                        <input type="text" placeholder="Search by name, hospital, or specialty..." />
                    </div>
                    <select className={styles.filterSelect}>
                        <option>All Roles</option>
                        <option>Hospital Coordinator</option>
                        <option>Medical Rep</option>
                        <option>Distributor</option>
                    </select>
                    <button className="btn-primary">Search</button>
                </div>

                {/* Cards grid */}
                <div className={styles.cardsGrid}>
                    {contacts.map((c, i) => (
                        <div key={i} className={styles.card}>
                            <div className={styles.cardAvatar} style={{ background: c.color }}>
                                {c.initials}
                            </div>
                            <div className={styles.cardInfo}>
                                <h4 className={styles.cardName}>{c.name}</h4>
                                <p className={styles.cardRole}>{c.role}</p>
                                <p className={styles.cardHospital}>
                                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                                        <circle cx="12" cy="10" r="3"></circle>
                                    </svg>
                                    {c.hospital}
                                </p>
                                <div className={styles.cardSpecialtyTag}>{c.specialty}</div>
                            </div>
                            <div className={styles.cardActions}>
                                <Link href="/hospitals" className={styles.viewBtn}>View Profile</Link>
                                <Link href="/auth" className={styles.bookBtn}>
                                    Book Now
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

                {/* View All CTA */}
                <div className={styles.viewAllWrap}>
                    <Link href="/hospitals" className="btn-secondary">
                        View All Contacts
                    </Link>
                </div>
            </div>
        </section>
    );
}
