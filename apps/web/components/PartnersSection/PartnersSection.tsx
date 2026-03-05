'use client';

import styles from './PartnersSection.module.css';

const alliances = [
    {
        name: 'Apollo Hospitals',
        role: 'Digital Integration Partner',
        logoText: 'A',
        color: '#e84040',
        description: 'Pioneering API-driven OPD slot distribution and seamless patient handoffs across 4 major metropolitan branches.',
        projects: ['OPD API Sync', 'Real-time Waitlists']
    },
    {
        name: 'Fortis Healthcare',
        role: 'Emergency Routing Pilot',
        logoText: 'F',
        color: '#6c5ce7',
        description: 'First network to implement our automated ambulance redirect protocol, cutting average emergency intake times by 22%.',
        projects: ['ER Fast-Track', 'Dispatch Comm']
    },
    {
        name: 'Sakra World',
        role: 'VMS Innovation Hub',
        logoText: 'S',
        color: '#003399',
        description: 'Serving as the primary testing ground for our advanced, contactless Visitor Management protocols and kiosk integrations.',
        projects: ['Contactless VMS', 'Smart Kiosks']
    },
    {
        name: 'Manipal Hospital',
        role: 'Supply Chain Integration',
        logoText: 'M',
        color: '#00c896',
        description: 'Collaborating deep into the distributor network to integrate real-time supply chain logic directly into ward procurement.',
        projects: ['DMS Live Tracking', 'Inventory Sync']
    }
];

export default function PartnersSection() {
    return (
        <section className={styles.section} id="alliances">
            <div className={`container ${styles.container}`}>
                <div className={styles.header}>
                    <div className="badge badge-purple" style={{ marginBottom: 16 }}>Key Alliances</div>
                    <h2 className={styles.title}>
                        Collaborative <span className="gradient-text">Partnerships</span>
                    </h2>
                    <p className={styles.subtitle}>
                        We work hand-in-hand with leading healthcare institutions to co-develop the future of unified medical coordination.
                    </p>
                </div>

                <div className={styles.grid}>
                    {alliances.map((partner, idx) => (
                        <div key={idx} className={`${styles.card} hover-gradient-border`}>
                            <div className={styles.cardHeader}>
                                <div className={styles.avatar} style={{ background: partner.color }}>
                                    {partner.logoText}
                                </div>
                                <div>
                                    <h3 className={styles.name}>{partner.name}</h3>
                                    <span className={styles.role}>{partner.role}</span>
                                </div>
                            </div>

                            <p className={styles.description}>{partner.description}</p>

                            <div className={styles.projectsWrap}>
                                <span className={styles.projectsLabel}>Key Initiatives:</span>
                                <div className={styles.tags}>
                                    {partner.projects.map((p, i) => (
                                        <span key={i} className={styles.tag}>{p}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
