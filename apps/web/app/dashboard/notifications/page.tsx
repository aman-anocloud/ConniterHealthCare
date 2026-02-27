'use client';

import styles from './page.module.css';

const notifications = [
    { id: 1, icon: '✅', title: 'Visit Confirmed', body: 'Your visit to Apollo Hospitals (Cardiology) on Mar 01 is confirmed.', time: '2 hrs ago', read: false },
    { id: 2, icon: '🚚', title: 'Delivery Slot Approved', body: 'Gate A – Bay 3 at Sakra World Hospital approved for Mar 05, 9:00 AM.', time: '5 hrs ago', read: false },
    { id: 3, icon: '⚠️', title: 'Slot Change Request', body: 'Apollo Hospitals has rescheduled your Mar 15 slot to 4:00 PM. Please confirm.', time: '1 day ago', read: false },
    { id: 4, icon: '📋', title: 'Visit Completed', body: 'Your visit to Narayana Health on Feb 20 has been marked complete.', time: '1 week ago', read: true },
    { id: 5, icon: '🔔', title: 'Reminder', body: 'You have a visit at Manipal Hospital tomorrow at 11:00 AM.', time: '1 week ago', read: true },
];

export default function NotificationsPage() {
    return (
        <div className={styles.page}>
            <div className={styles.header}>
                <div>
                    <h1 className={styles.title}>Notifications</h1>
                    <p className={styles.subtitle}>Real-time updates on your visits and deliveries.</p>
                </div>
                <button className="btn-ghost" style={{ fontSize: 13 }}>Mark all as read</button>
            </div>

            <div className={styles.list}>
                {notifications.map((n) => (
                    <div key={n.id} className={`${styles.notifCard} ${n.read ? styles.read : ''}`}>
                        <div className={styles.notifIcon}>{n.icon}</div>
                        <div className={styles.notifBody}>
                            <p className={styles.notifTitle}>{n.title}</p>
                            <p className={styles.notifText}>{n.body}</p>
                            <p className={styles.notifTime}>{n.time}</p>
                        </div>
                        {!n.read && <div className={styles.unreadDot} />}
                    </div>
                ))}
            </div>
        </div>
    );
}
