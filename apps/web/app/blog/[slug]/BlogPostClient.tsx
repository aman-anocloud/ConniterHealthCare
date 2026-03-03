'use client';

import { motion } from 'framer-motion';
import styles from './page.module.css';

interface BlogPostClientProps {
    post: any;
}

export default function BlogPostClient({ post }: BlogPostClientProps) {
    const fadeIn = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };

    return (
        <article className={styles.article}>
            <motion.header
                className={styles.header}
                initial="hidden"
                animate="visible"
                variants={fadeIn}
                transition={{ duration: 0.5 }}
            >
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: 'var(--space-4)', justifyContent: 'center' }}>
                    <div className="badge badge-purple">{post.category}</div>
                    {post.readTime && <div className="badge" style={{ background: 'var(--glass-bg)', color: 'var(--neutral-300)' }}>⏱ {post.readTime}</div>}
                </div>
                <h1 className={styles.title}>{post.title}</h1>
                <div className={styles.meta} style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'center' }}>
                    {post.author && <span style={{ color: 'var(--brand-primary)', fontWeight: 600 }}>By {post.author}</span>}
                    <span>Published on {new Date(post.publishedAt).toLocaleDateString()}</span>
                </div>
            </motion.header>

            {post.coverImage && (
                <motion.div
                    className={styles.coverImageContainer}
                    initial="hidden"
                    animate="visible"
                    variants={fadeIn}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <img src={post.coverImage} alt={post.title} className={styles.coverImage} />
                </motion.div>
            )}

            <motion.div
                className={styles.content}
                dangerouslySetInnerHTML={{ __html: post.content }}
                initial="hidden"
                animate="visible"
                variants={fadeIn}
                transition={{ duration: 0.5, delay: 0.4 }}
            />

            {post.tags && post.tags.length > 0 && (
                <motion.div
                    style={{ marginTop: 'var(--space-8)', paddingTop: 'var(--space-6)', borderTop: '1px solid var(--glass-border)' }}
                    initial="hidden"
                    animate="visible"
                    variants={fadeIn}
                    transition={{ duration: 0.5, delay: 0.6 }}
                >
                    <h4 style={{ color: 'white', marginBottom: 'var(--space-4)' }}>Tags</h4>
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                        {post.tags.map((tag: string) => (
                            <span key={tag} className="badge" style={{ background: 'var(--glass-bg)', color: 'var(--neutral-300)', padding: '6px 12px' }}>
                                #{tag}
                            </span>
                        ))}
                    </div>
                </motion.div>
            )}
        </article>
    );
}
