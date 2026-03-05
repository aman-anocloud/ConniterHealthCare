'use client';

import Link from 'next/link';
import { useState } from 'react';
import styles from './BlogInsights.module.css';

const CATEGORIES = ['All', 'Industry Trends', 'Expert Opinion', 'Best Practices'];

const articles = [
    {
        id: 1,
        category: 'Industry Trends',
        title: 'How Digital Visitor Management Is Transforming Indian Hospitals',
        excerpt: 'Traditional paper-based check-in systems are giving way to contactless, data-driven visitor management platforms. Here\'s what leading institutions across Bengaluru and Mumbai are doing differently.',
        readTime: '5 min read',
        author: 'Conninter Desk',
        date: 'Mar 1, 2026',
        accent: '#003399',
        icon: '📈',
    },
    {
        id: 2,
        category: 'Expert Opinion',
        title: 'Why Pharma Reps Need Smarter Scheduling — Not More Cold Calls',
        excerpt: 'A look at how leading medical representatives are switching from unannounced hospital visits to structured, app-based slot systems, and why it matters for everyone.',
        readTime: '7 min read',
        author: 'Dr. Priya Nair',
        date: 'Feb 20, 2026',
        accent: '#6c5ce7',
        icon: '🩺',
    },
    {
        id: 3,
        category: 'Best Practices',
        title: '5 Checklist Items Every Hospital Should Have Before Going Digital',
        excerpt: 'Digital transformation in healthcare is not a plug-and-play exercise. This practical checklist covers infrastructure, staff training, SOP mapping, and compliance requirements.',
        readTime: '6 min read',
        author: 'Aman Gupta',
        date: 'Feb 11, 2026',
        accent: '#00a67a',
        icon: '✅',
    },
    {
        id: 4,
        category: 'Industry Trends',
        title: 'Supply Chain Visibility: The Next Frontier in Medical Logistics',
        excerpt: 'Real-time delivery tracking is no longer a luxury in medical logistics. Hospitals across India are demanding end-to-end visibility — and distributors who can deliver it are winning.',
        readTime: '4 min read',
        author: 'Conninter Desk',
        date: 'Jan 28, 2026',
        accent: '#f4a100',
        icon: '🚛',
    },
    {
        id: 5,
        category: 'Expert Opinion',
        title: 'The Hidden Cost of Uncoordinated Meetings in Hospital Systems',
        excerpt: 'Senior hospital administrators share candid insights on how fragmented, phone-based coordination wastes hundreds of productive hours per month across departments.',
        readTime: '8 min read',
        author: 'Rajesh Menon, MD',
        date: 'Jan 15, 2026',
        accent: '#e84040',
        icon: '💡',
    },
    {
        id: 6,
        category: 'Best Practices',
        title: 'Compliance Without the Chaos: Managing Medical Rep Visits Responsibly',
        excerpt: 'With AHPI guidelines evolving, here\'s how hospitals can ensure every pharma visit is logged, verified, and auditable — without adding friction to daily operations.',
        readTime: '5 min read',
        author: 'Conninter Legal Team',
        date: 'Jan 5, 2026',
        accent: '#003399',
        icon: '🛡️',
    },
];

export default function BlogInsights() {
    const [activeCategory, setActiveCategory] = useState('All');

    const filtered = activeCategory === 'All'
        ? articles
        : articles.filter((a) => a.category === activeCategory);

    return (
        <section className={styles.section} id="insights">
            <div className="container">
                <div className={styles.header}>
                    <div>
                        <div className="badge badge-blue" style={{ marginBottom: 12 }}>Blog & Insights</div>
                        <h2 className={styles.title}>Perspectives from the Field</h2>
                        <p className={styles.subtitle}>
                            Industry trends, expert voices, and practical guides from people who live healthcare coordination every day.
                        </p>
                    </div>
                    <Link href="/blog" className="btn-secondary">
                        See All Articles →
                    </Link>
                </div>

                {/* Category Filter */}
                <div className={styles.filters}>
                    {CATEGORIES.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`${styles.filterBtn} ${activeCategory === cat ? styles.filterActive : ''}`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Articles Grid */}
                <div className={styles.grid}>
                    {filtered.map((article) => (
                        <Link key={article.id} href="/blog" className={`${styles.card} hover-gradient-border`}>
                            <div className={styles.cardTop} style={{ borderColor: article.accent }}>
                                <span className={styles.cardIcon}>{article.icon}</span>
                                <span className={styles.cardCategory} style={{ color: article.accent }}>
                                    {article.category}
                                </span>
                            </div>
                            <h3 className={styles.cardTitle}>{article.title}</h3>
                            <p className={styles.cardExcerpt}>{article.excerpt}</p>
                            <div className={styles.cardMeta}>
                                <div className={styles.authorInfo}>
                                    <div className={styles.authorAvatar} style={{ background: article.accent }}>
                                        {article.author[0]}
                                    </div>
                                    <span className={styles.author}>{article.author}</span>
                                </div>
                                <div className={styles.metaRight}>
                                    <span className={styles.readTime}>{article.readTime}</span>
                                    <span className={styles.dot}>·</span>
                                    <span className={styles.date}>{article.date}</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
