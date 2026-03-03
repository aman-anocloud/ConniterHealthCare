import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';
import styles from './MinimalBlogList.module.css';

async function getRecentPosts() {
    try {
        const directory = path.join(process.cwd(), 'content', 'blog');
        if (!fs.existsSync(directory)) return [];

        const filenames = fs.readdirSync(directory);
        const posts = filenames
            .filter((name) => name.endsWith('.md'))
            .map((name) => {
                const fullPath = path.join(directory, name);
                const fileContents = fs.readFileSync(fullPath, 'utf8');
                const { data } = matter(fileContents);

                return {
                    slug: name.replace('.md', ''),
                    ...data,
                };
            })
            .sort((a: any, b: any) => new Date(b.publishedAt || 0).getTime() - new Date(a.publishedAt || 0).getTime())
            .slice(0, 3); // Get only the latest 3

        return posts;
    } catch (err) {
        console.error('Failed to read local markdown posts', err);
        return [];
    }
}

export default async function MinimalBlogList() {
    const posts = await getRecentPosts();

    if (posts.length === 0) {
        return null;
    }

    return (
        <section className={styles.section}>
            <div className={styles.header}>
                <h2 className={styles.title}>Latest Platform Updates</h2>
                <Link href="/blog" className={styles.viewAll}>
                    View All Insights →
                </Link>
            </div>

            <div className={styles.grid}>
                {posts.map((post: any) => (
                    <Link href={`/blog/${post.slug}`} key={post.slug} className={styles.card}>
                        {post.coverImage && (
                            <div className={styles.imageWrapper}>
                                <img src={post.coverImage} alt={post.title} className={styles.image} />
                            </div>
                        )}
                        <div className={styles.content}>
                            <span className={styles.category}>{post.category || 'Update'}</span>
                            <h3 className={styles.cardTitle}>{post.title}</h3>
                            <p className={styles.excerpt}>{post.excerpt || 'Read more about our latest update.'}</p>
                            <span className={styles.date}>
                                {new Date(post.publishedAt || Date.now()).toLocaleDateString('en-US', {
                                    month: 'short',
                                    day: 'numeric',
                                    year: 'numeric'
                                })}
                            </span>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}
