'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';
import styles from './page.module.css';

const HOSPITAL = {
    name: 'Apollo Hospitals',
    city: 'Chennai',
    address: '21 Greams Lane, off Greams Road, Chennai – 600006',
    rating: 4.8,
    beds: 710,
    founded: 1983,
    about: 'Apollo Hospitals Chennai is one of India\'s premier tertiary care hospitals, featuring 55+ specialities and world-class infrastructure. A trusted partner in the Conninter network for seamless visitor and delivery coordination.',
    departments: ['Cardiology', 'Oncology', 'Neurology', 'Orthopaedics', 'General Surgery', 'Gynaecology', 'Paediatrics', 'Nephrology'],
};

const SLOT_DAYS = ['Today', 'Tomorrow', 'Mar 02', 'Mar 03', 'Mar 04'];
const SLOTS: Record<string, { time: string; type: 'VMS' | 'DMS'; dept?: string; available: boolean }[]> = {
    Today: [
        { time: '10:00 AM', type: 'VMS', dept: 'Cardiology', available: true },
        { time: '11:30 AM', type: 'VMS', dept: 'Oncology', available: false },
        { time: '2:30 PM', type: 'VMS', dept: 'Cardiology', available: true },
        { time: '4:00 PM', type: 'DMS', available: true },
    ],
    Tomorrow: [
        { time: '9:00 AM', type: 'DMS', available: true },
        { time: '11:00 AM', type: 'VMS', dept: 'Neurology', available: true },
        { time: '3:00 PM', type: 'VMS', dept: 'General Surgery', available: true },
    ],
};

export default function HospitalDetailPage() {
    const { user } = useAuth();
    const router = useRouter();
    const [day, setDay] = useState('Today');
    const [type, setType] = useState<'All' | 'VMS' | 'DMS'>('All');
    const [confirmSlot, setConfirmSlot] = useState<string | null>(null);

    const slots = (SLOTS[day] || SLOTS['Today']).filter((s) => type === 'All' || s.type === type);

    const handleSlotClick = (slotTime: string) => {
        if (!user) {
            router.push('/auth');
        } else {
            setConfirmSlot(slotTime);
        }
    };

    return (
        <>
            <Navbar />
            <main className={styles.main}>
                <div className="container">
                    {/* Hospital header */}
                    <div className={styles.hosHeader}>
                        <div className={styles.hosAvatar}>{HOSPITAL.name[0]}</div>
                        <div>
                            <p className={styles.breadcrumb}><a href="/hospitals">Hospitals</a> / {HOSPITAL.name}</p>
                            <h1 className={styles.hosName}>{HOSPITAL.name}</h1>
                            <p className={styles.hosAddr}>📍 {HOSPITAL.address}</p>
                            <div className={styles.hosMeta}>
                                <span>⭐ {HOSPITAL.rating}</span>
                                <span>🛏 {HOSPITAL.beds} beds</span>
                                <span>🏛 Est. {HOSPITAL.founded}</span>
                                <span className="badge badge-blue">Premium Partner</span>
                            </div>
                        </div>
                    </div>

                    <div className={styles.grid}>
                        {/* Left: About + depts */}
                        <div className={styles.left}>
                            <div className={styles.section}>
                                <h2 className={styles.sectionTitle}>About</h2>
                                <p className={styles.about}>{HOSPITAL.about}</p>
                            </div>
                            <div className={styles.section}>
                                <h2 className={styles.sectionTitle}>Departments</h2>
                                <div className={styles.depts}>
                                    {HOSPITAL.departments.map((d) => (
                                        <span key={d} className={styles.deptPill}>{d}</span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Right: Slot picker */}
                        <div className={styles.right}>
                            <div className={styles.slotPicker}>
                                <h2 className={styles.sectionTitle}>Available Slots</h2>

                                {/* Day tabs */}
                                <div className={styles.dayTabs}>
                                    {SLOT_DAYS.map((d) => (
                                        <button key={d} className={`${styles.dayTab} ${day === d ? styles.dayActive : ''}`} onClick={() => setDay(d)}>
                                            {d}
                                        </button>
                                    ))}
                                </div>

                                {/* Type filter */}
                                <div className={styles.typeRow}>
                                    {(['All', 'VMS', 'DMS'] as const).map((t) => (
                                        <button key={t} className={`${styles.typeBtn} ${type === t ? styles.typeActive : ''}`} onClick={() => setType(t)}>
                                            {t === 'VMS' ? '📅 Visit' : t === 'DMS' ? '🚚 Delivery' : 'All'}
                                        </button>
                                    ))}
                                </div>

                                {/* Slot grid */}
                                <div className={styles.slots}>
                                    {slots.length === 0 ? (
                                        <p className={styles.noSlots}>No slots available for the selected filter.</p>
                                    ) : (
                                        slots.map((s, i) => (
                                            <button
                                                key={i}
                                                className={`${styles.slot} ${!s.available ? styles.slotTaken : ''} ${s.type === 'DMS' ? styles.slotDms : styles.slotVms}`}
                                                disabled={!s.available}
                                                onClick={() => s.available && handleSlotClick(s.time)}
                                            >
                                                <span className={styles.slotTime}>{s.time}</span>
                                                <span className={styles.slotType}>{s.type}{s.dept ? ` · ${s.dept}` : ''}</span>
                                                {!s.available && <span className={styles.slotBooked}>Booked</span>}
                                            </button>
                                        ))
                                    )}
                                </div>

                                {!user && (
                                    <p className={styles.loginNote}>
                                        📱 <a href="/auth">Sign in with phone</a> to book a slot.
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Confirmation modal */}
                    {confirmSlot && (
                        <div className={styles.overlay} onClick={() => setConfirmSlot(null)}>
                            <div className={styles.confirmModal} onClick={e => e.stopPropagation()}>
                                <h3>Confirm Booking</h3>
                                <p>You are booking a slot at <strong>{HOSPITAL.name}</strong></p>
                                <p className={styles.slotBig}>🕐 {confirmSlot} – {day}</p>
                                <div className={styles.confirmActions}>
                                    <button className="btn-secondary" onClick={() => setConfirmSlot(null)}>Cancel</button>
                                    <button className="btn-primary" onClick={() => { alert('Slot booked! Check My Visits.'); setConfirmSlot(null); }}>Confirm Booking</button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </>
    );
}
