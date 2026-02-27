'use client';

import styles from './HowItWorks.module.css';

const steps = [
    {
        step: '01',
        title: 'Search & Discover',
        desc: 'Find hospitals near you by city, speciality, or department. No login required to browse.',
        icon: '🔍',
        color: 'blue',
    },
    {
        step: '02',
        title: 'Pick a Slot',
        desc: 'See real-time available slots for doctors or delivery windows. Click to select your preferred time.',
        icon: '📅',
        color: 'green',
    },
    {
        step: '03',
        title: 'OTP Verification',
        desc: 'Verify your phone number with a one-time password. Zero friction, no passwords to remember.',
        icon: '🔐',
        color: 'purple',
    },
    {
        step: '04',
        title: 'Confirmed & Tracked',
        desc: 'Receive a digital confirmation. Track your visit or delivery from your personalised dashboard.',
        icon: '✅',
        color: 'green',
    },
];

export default function HowItWorks() {
    return (
        <section className={styles.section} id="how-it-works">
            <div className="container">
                <div className={styles.header}>
                    <div className="badge badge-purple" style={{ marginBottom: 16 }}>Simple Process</div>
                    <h2 className={styles.title}>
                        How <span className="gradient-text">Conninter</span> Works
                    </h2>
                    <p className={styles.subtitle}>
                        From discovery to confirmed appointment — the entire flow takes under 2 minutes.
                    </p>
                </div>

                <div className={styles.steps}>
                    {steps.map((s, i) => (
                        <div key={s.step} className={`${styles.step} ${styles[`step_${s.color}`]}`} style={{ animationDelay: `${i * 0.12}s` }}>
                            <div className={styles.stepNum}>{s.step}</div>
                            {i < steps.length - 1 && <div className={styles.connector} />}
                            <div className={styles.stepIcon}>{s.icon}</div>
                            <h3 className={styles.stepTitle}>{s.title}</h3>
                            <p className={styles.stepDesc}>{s.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
