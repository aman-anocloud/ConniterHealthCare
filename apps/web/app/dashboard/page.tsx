'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from './page.module.css';

// Simple calendar data
const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// Mock events keyed by day of month
const EVENTS: Record<number, { title: string; time: string; type: 'vms' | 'dms'; hospital: string }[]> = {
    1: [{ title: 'Cardiology Dept Visit', time: '10:00 AM', type: 'vms', hospital: 'Apollo Hospitals' }],
    5: [{ title: 'Medicine Delivery', time: '2:30 PM', type: 'dms', hospital: 'Fortis Healthcare' }],
    8: [{ title: 'Ortho Dept Meeting', time: '11:00 AM', type: 'vms', hospital: 'Manipal Hospital' }],
    12: [{ title: 'Surgical Supplies', time: '9:00 AM', type: 'dms', hospital: 'Sakra World' }],
    15: [
        { title: 'Oncology Visit', time: '3:00 PM', type: 'vms', hospital: 'Apollo Hospitals' },
        { title: 'Device Delivery', time: '5:00 PM', type: 'dms', hospital: 'Apollo Hospitals' },
    ],
    20: [{ title: 'Pharma Presentation', time: '10:30 AM', type: 'vms', hospital: 'Narayana Health' }],
    25: [{ title: 'Lab Equipment', time: '1:00 PM', type: 'dms', hospital: 'Columbia Asia' }],
};

export default function DashboardPage() {
    const today = new Date();
    const [view, setView] = useState<{ year: number; month: number }>({ year: today.getFullYear(), month: today.getMonth() });
    const [selectedDay, setSelectedDay] = useState<number | null>(today.getDate());

    const firstDay = new Date(view.year, view.month, 1).getDay();
    const daysInMonth = new Date(view.year, view.month + 1, 0).getDate();

    const prevMonth = () => setView(v => v.month === 0 ? { year: v.year - 1, month: 11 } : { ...v, month: v.month - 1 });
    const nextMonth = () => setView(v => v.month === 11 ? { year: v.year + 1, month: 0 } : { ...v, month: v.month + 1 });

    const selectedEvents = selectedDay ? EVENTS[selectedDay] ?? [] : [];

    return (
        <div className={styles.page}>
            {/* Header */}
            <div className={styles.header}>
                <div>
                    <h1 className={styles.title}>Dashboard</h1>
                    <p className={styles.subtitle}>Manage your visits, deliveries, and schedule.</p>
                </div>
                <div className={styles.headerActions}>
                    <Link href="/hospitals" className="btn-primary" style={{ fontSize: 14, padding: '10px 20px' }}>
                        ➕ Book Slot
                    </Link>
                </div>
            </div>

            {/* Quick stats */}
            <div className={styles.statsRow}>
                {[
                    { label: 'Upcoming Visits', value: '3', icon: '📅', color: 'blue' },
                    { label: 'Deliveries This Month', value: '7', icon: '🚚', color: 'green' },
                    { label: 'Completed', value: '28', icon: '✅', color: 'purple' },
                    { label: 'Notifications', value: '3', icon: '🔔', color: 'orange' },
                ].map((s) => (
                    <div key={s.label} className={`${styles.statCard} ${styles[`stat_${s.color}`]}`}>
                        <div className={styles.statIcon}>{s.icon}</div>
                        <div>
                            <p className={styles.statValue}>{s.value}</p>
                            <p className={styles.statLabel}>{s.label}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Calendar + event detail */}
            <div className={styles.calendarSection}>
                <div className={styles.calendar}>
                    {/* Calendar header */}
                    <div className={styles.calHeader}>
                        <button className={styles.calNav} onClick={prevMonth}>←</button>
                        <h3>{MONTHS[view.month]} {view.year}</h3>
                        <button className={styles.calNav} onClick={nextMonth}>→</button>
                    </div>

                    {/* Day names */}
                    <div className={styles.dayNames}>
                        {DAYS.map(d => <span key={d}>{d}</span>)}
                    </div>

                    {/* Day cells */}
                    <div className={styles.days}>
                        {Array.from({ length: firstDay }).map((_, i) => <div key={`e-${i}`} />)}
                        {Array.from({ length: daysInMonth }).map((_, i) => {
                            const day = i + 1;
                            const hasEvent = !!EVENTS[day];
                            const isToday = day === today.getDate() && view.month === today.getMonth() && view.year === today.getFullYear();
                            const isSelected = day === selectedDay;
                            return (
                                <button
                                    key={day}
                                    className={`${styles.dayCell} ${isToday ? styles.today : ''} ${isSelected ? styles.selectedDay : ''}`}
                                    onClick={() => setSelectedDay(day)}
                                >
                                    {day}
                                    {hasEvent && <div className={styles.eventDot} />}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Events Panel */}
                <div className={styles.events}>
                    <h3 className={styles.eventsTitle}>
                        {selectedDay ? `Events – ${MONTHS[view.month]} ${selectedDay}` : 'Select a date'}
                    </h3>
                    {selectedEvents.length === 0 ? (
                        <div className={styles.noEvents}>
                            <span>📭</span>
                            <p>No events scheduled for this day.</p>
                            <Link href="/hospitals" className="btn-secondary" style={{ fontSize: 13, padding: '8px 16px' }}>
                                Book a Slot
                            </Link>
                        </div>
                    ) : (
                        <div className={styles.eventList}>
                            {selectedEvents.map((ev, i) => (
                                <div key={i} className={`${styles.eventCard} ${styles[`event_${ev.type}`]}`}>
                                    <div className={styles.eventBadge}>
                                        <span className={`badge badge-${ev.type === 'vms' ? 'blue' : 'green'}`}>{ev.type.toUpperCase()}</span>
                                    </div>
                                    <h4 className={styles.eventTitle}>{ev.title}</h4>
                                    <p className={styles.eventHospital}>🏥 {ev.hospital}</p>
                                    <p className={styles.eventTime}>🕐 {ev.time}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
