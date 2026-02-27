import { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';
import styles from './page.module.css';

export const metadata: Metadata = {
    title: 'Blog & Insights',
    description: 'Healthcare industry trends, case studies, and product updates from the Conninter team.',
};

const CATEGORIES = ['All', 'Industry Trends', 'Case Studies', 'Product Updates', 'Guides'];

const posts = [
    { slug: 'eliminating-unplanned-doctor-visits', title: 'Eliminating Unplanned Doctor Visits in Pharma Sales', excerpt: 'How medical representatives can use digital slot booking to increase meeting success rates by 3x while reducing hospital friction.', category: 'Industry Trends', readTime: '6 min', date: 'Feb 20, 2026', emoji: '📅' },
    { slug: 'hospital-delivery-congestion', title: 'The Hidden Cost of Hospital Delivery Congestion', excerpt: 'A supply chain analysis of how unscheduled deliveries cost Indian hospitals ₹12 crores annually in gate management alone.', category: 'Case Studies', readTime: '8 min', date: 'Feb 14, 2026', emoji: '🚚' },
    { slug: 'vms-roi-case-study', title: 'How Sakra World Cut Lobby Wait Times by 70%', excerpt: 'An inside look at how Sakra World Hospital deployed Conninter VMS and transformed their visitor experience in 90 days.', category: 'Case Studies', readTime: '10 min', date: 'Feb 08, 2026', emoji: '🏥' },
    { slug: 'otp-healthcare-security', title: 'Why OTP Authentication Is the Right Choice for Healthcare Apps', excerpt: 'Zero-friction phone authentication balances security and usability for time-pressed medical professionals.', category: 'Industry Trends', readTime: '5 min', date: 'Jan 30, 2026', emoji: '🔐' },
    { slug: 'conninter-dms-launch', title: 'Introducing Conninter DMS – Delivery Management for Hospitals', excerpt: 'Our new Delivery Management System lets distributors schedule hospital gate slots in advance. Here is everything you need to know.', category: 'Product Updates', readTime: '4 min', date: 'Jan 22, 2026', emoji: '🆕' },
    { slug: 'digital-transformation-hospital', title: 'A Complete Guide to Digital Transformation for Hospitals', excerpt: 'From visitor management to supply chain — how Indian hospitals can modernise operations with connected digital tools.', category: 'Guides', readTime: '12 min', date: 'Jan 15, 2026', emoji: '⚡' },
];

export default function BlogPage() {
    return (
        <>
            <Navbar />
            <main className={styles.main}>
                <div className="container">
                    <div className={styles.header}>
                        <div className="badge badge-purple" style={{ marginBottom: 16 }}>Blog & Insights</div>
                        <h1 className={styles.title}>Healthcare <span className="gradient-text">Intelligence</span></h1>
                        <p className={styles.subtitle}>Industry trends, product updates, and case studies from our network of 120+ hospitals.</p>
                    </div>

                    <div className={styles.catRow}>
                        {CATEGORIES.map((c) => (
                            <button key={c} className={`${styles.cat} ${c === 'All' ? styles.catActive : ''}`}>{c}</button>
                        ))}
                    </div>

                    <div className={styles.grid}>
                        {/* Featured */}
                        <div className={styles.featured}>
                            <div className={styles.featEmoji}>{posts[0].emoji}</div>
                            <span className="badge badge-purple">{posts[0].category}</span>
                            <h2 className={styles.featTitle}>{posts[0].title}</h2>
                            <p className={styles.featExcerpt}>{posts[0].excerpt}</p>
                            <div className={styles.featMeta}>
                                <span>🕐 {posts[0].readTime} read</span>
                                <span>{posts[0].date}</span>
                            </div>
                            <Link href={`/blog/${posts[0].slug}`} className="btn-primary" style={{ width: 'fit-content' }}>
                                Read Article →
                            </Link>
                        </div>

                        {/* Rest */}
                        <div className={styles.rest}>
                            {posts.slice(1).map((p) => (
                                <Link key={p.slug} href={`/blog/${p.slug}`} className={styles.postCard}>
                                    <div className={styles.postEmoji}>{p.emoji}</div>
                                    <div style={{ flex: 1, minWidth: 0 }}>
                                        <span className="badge badge-purple" style={{ marginBottom: 8, display: 'inline-flex' }}>{p.category}</span>
                                        <h3 className={styles.postTitle}>{p.title}</h3>
                                        <p className={styles.postExcerpt}>{p.excerpt}</p>
                                        <div className={styles.postMeta}>
                                            <span>🕐 {p.readTime}</span>
                                            <span>{p.date}</span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
