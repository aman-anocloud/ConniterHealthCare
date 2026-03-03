import { Metadata } from 'next';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';
import BlogListClient from './BlogListClient';
import styles from './page.module.css';

export const metadata: Metadata = {
    title: 'Blog & Insights',
    description: 'Healthcare industry trends, case studies, and product updates from the Conninter team.',
};

const CATEGORIES = ['All', 'Industry Trends', 'Case Studies', 'Product Updates', 'News'];

async function getPosts() {
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
            .sort((a: any, b: any) => new Date(b.publishedAt || 0).getTime() - new Date(a.publishedAt || 0).getTime());

        return posts;
    } catch (err) {
        console.error('Failed to read local markdown posts', err);
        return [];
    }
}

export default async function BlogPage() {
    const posts = await getPosts();

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

                    <BlogListClient posts={posts} />
                </div>
            </main>
            <Footer />
        </>
    );
}
