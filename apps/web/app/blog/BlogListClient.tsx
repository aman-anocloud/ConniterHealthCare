'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import styles from './page.module.css';

interface BlogListClientProps {
    posts: any[];
}

export default function BlogListClient({ posts }: BlogListClientProps) {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };

    if (posts.length === 0) {
        return (
            <div style={{ color: 'var(--neutral-400)', gridColumn: '1 / -1', textAlign: 'center', padding: '40px 0' }}>
                No articles published yet. Check back soon!
            </div>
        );
    }

    return (
        <motion.div
            className={styles.grid}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            {/* Featured Post */}
            <motion.div variants={itemVariants} className={styles.featured}>
                {posts[0].coverImage ? (
                    <img
                        src={posts[0].coverImage}
                        alt={posts[0].title}
                        style={{ width: '100%', height: '240px', objectFit: 'cover', borderRadius: 'var(--radius-lg) var(--radius-lg) 0 0', margin: '-var(--space-6) -var(--space-6) var(--space-4) -var(--space-6)', display: 'block' }}
                    />
                ) : (
                    <div className={styles.featEmoji}>📰</div>
                )}
                <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                    <span className="badge badge-purple">{posts[0].category}</span>
                    {posts[0].readTime && <span className="badge" style={{ background: 'rgba(255,255,255,0.1)' }}>⏱ {posts[0].readTime}</span>}
                </div>
                <h2 className={styles.featTitle}>{posts[0].title}</h2>
                <p className={styles.featExcerpt}>{posts[0].excerpt || 'Read the full article to learn more.'}</p>
                <div className={styles.featMeta} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                        {posts[0].author && <span style={{ color: 'white', fontWeight: 500, fontSize: '14px' }}>{posts[0].author}</span>}
                        <span style={{ color: 'var(--neutral-400)' }}>{new Date(posts[0].publishedAt).toLocaleDateString()}</span>
                    </div>
                </div>
                <Link href={`/blog/${posts[0].slug}`} className="btn-primary" style={{ width: 'fit-content', marginTop: 'var(--space-4)' }}>
                    Read Article →
                </Link>
            </motion.div>

            {/* Rest of the posts */}
            <div className={styles.rest}>
                {posts.slice(1).map((p: any) => (
                    <motion.div key={p.slug} variants={itemVariants}>
                        <Link href={`/blog/${p.slug}`} className={styles.postCard}>
                            {p.coverImage ? (
                                <img src={p.coverImage} alt={p.title} style={{ width: '120px', height: '120px', objectFit: 'cover', borderRadius: 'var(--radius-md)' }} />
                            ) : (
                                <div className={styles.postEmoji}>📰</div>
                            )}
                            <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
                                <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                                    <span className="badge badge-purple" style={{ display: 'inline-flex' }}>{p.category}</span>
                                    {p.readTime && <span className="badge" style={{ background: 'rgba(255,255,255,0.1)', display: 'inline-flex' }}>⏱ {p.readTime}</span>}
                                </div>
                                <h3 className={styles.postTitle}>{p.title}</h3>
                                <p className={styles.postExcerpt}>{p.excerpt || 'Read the full article...'}</p>
                                <div className={styles.postMeta} style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between' }}>
                                    {p.author && <span style={{ color: 'white' }}>{p.author}</span>}
                                    <span>{new Date(p.publishedAt).toLocaleDateString()}</span>
                                </div>
                            </div>
                        </Link>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
}
