import styles from './HealthcareInsights.module.css';

const insights = [
    {
        category: 'Digital Health',
        title: 'The Rise of Telemedicine in 2026',
        description: 'How hospitals are drastically reducing wait times by shifting preliminary consultations online.',
        date: 'March 1, 2026',
        color: '#0a84ff', // brand primary
    },
    {
        category: 'Hospital Management',
        title: 'Optimizing OPD Patient Flow',
        description: 'Strategies to manage high patient volumes efficiently without compromising care quality.',
        date: 'February 28, 2026',
        color: '#00c896', // brand secondary
    },
    {
        category: 'Technology',
        title: 'AI in Medical Diagnosis',
        description: 'New algorithms are assisting doctors in identifying anomalies in scans faster than ever.',
        date: 'February 25, 2026',
        color: '#6c5ce7', // brand accent
    },
    {
        category: 'Patient Experience',
        title: 'Zero Wait Time Guarantee',
        description: 'A study on how digital booking platforms are improving patient satisfaction scores.',
        date: 'February 20, 2026',
        color: '#ff3b30', // error/alert red but used as accent here
    },
];

export default function HealthcareInsights() {
    return (
        <section className={styles.container}>
            <div className={styles.header}>
                <div>
                    <h2 className={styles.title}>Healthcare Insights</h2>
                    <p className={styles.subtitle}>Stay updated with the latest trends and practices in digital healthcare.</p>
                </div>
                <div className={styles.controls}>
                    {/* Visual controls just for aesthetic, scroll handles the actual movement */}
                    <button className={styles.controlBtn} aria-label="Previous">←</button>
                    <button className={styles.controlBtn} aria-label="Next">→</button>
                </div>
            </div>

            <div className={styles.scrollContainer}>
                <div className={styles.scrollTrack}>
                    {insights.map((insight, i) => (
                        <div key={i} className={styles.card}>
                            <div className={styles.cardTop}>
                                <span className={styles.category} style={{ color: insight.color, backgroundColor: `${insight.color}15` }}>
                                    {insight.category}
                                </span>
                                <span className={styles.date}>{insight.date}</span>
                            </div>
                            <h3 className={styles.cardTitle}>{insight.title}</h3>
                            <p className={styles.cardDesc}>{insight.description}</p>
                            <a href="#" className={styles.readMore} style={{ color: insight.color }}>Read story →</a>
                        </div>
                    ))}
                    {/* Duplicate for infinite feel visual if needed, but horizontal scroll is fine */}
                </div>
            </div>
        </section>
    );
}
