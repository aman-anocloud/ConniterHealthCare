import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';
import BlogPostClient from './BlogPostClient';
import styles from './page.module.css';

async function getPost(slug: string): Promise<any | null> {
    try {
        const filePath = path.join(process.cwd(), 'content', 'blog', `${slug}.md`);
        if (!fs.existsSync(filePath)) return null;

        const fileContents = fs.readFileSync(filePath, 'utf8');
        const { data, content } = matter(fileContents);
        const htmlContent = marked.parse(content);

        return {
            slug,
            ...data,
            content: htmlContent,
        };
    } catch (err) {
        console.error("Failed to read post file", err);
        return null;
    }
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    const post = await getPost(params.slug);
    if (!post) return { title: 'Post Not Found' };
    return {
        title: `${post.title} | Conninter`,
        description: post.excerpt,
        openGraph: {
            title: post.title,
            description: post.excerpt,
            images: post.coverImage ? [post.coverImage] : [],
        },
    };
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
    const post = await getPost(params.slug);

    if (!post) {
        notFound();
    }

    return (
        <>
            <Navbar />
            <main className={styles.main}>
                <BlogPostClient post={post} />
            </main>
            <Footer />
        </>
    );
}
