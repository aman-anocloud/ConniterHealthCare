'use client';

import { useForm, Controller } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import dynamic from 'next/dynamic';
import { useAuth } from '@/context/AuthContext';
import styles from './BlogForm.module.css';
import { BlogPost } from 'shared/types';
import { ArrowLeft, Save } from 'lucide-react';
import Link from 'next/link';

// Dynamically import TipTap so it doesn't break SRR
const RichTextEditor = dynamic(() => import('../RichTextEditor/RichTextEditor'), {
    ssr: false,
    loading: () => <div className={styles.loadingEditor}>Loading editor...</div>,
});

interface BlogFormProps {
    initialData?: BlogPost;
    postId?: string;
}

export default function BlogForm({ initialData, postId }: BlogFormProps) {
    const { token } = useAuth();
    const router = useRouter();
    const [isSaving, setIsSaving] = useState(false);

    const { register, handleSubmit, control, formState: { errors } } = useForm({
        defaultValues: {
            title: initialData?.title || '',
            slug: initialData?.slug || '',
            category: initialData?.category || 'News',
            excerpt: initialData?.excerpt || '',
            content: initialData?.content || '',
            coverImage: initialData?.coverImage || '',
            author: initialData?.author || '',
            readTime: initialData?.readTime || '',
            tags: initialData?.tags?.join(', ') || '',
        },
    });

    const onSubmit = async (data: any) => {
        setIsSaving(true);
        try {
            // Process tags from comma separated string into an array
            const processedData = {
                ...data,
                tags: data.tags ? data.tags.split(',').map((t: string) => t.trim()).filter(Boolean) : [],
            };

            const res = await fetch('/api/blog', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(processedData)
            });

            if (!res.ok) {
                const errData = await res.json();
                throw new Error(errData.message || 'Failed to save post');
            }

            router.push('/admin/blog');
            router.refresh(); // Refresh the listing page
        } catch (err: any) {
            alert(err.message || 'Failed to save post');
            setIsSaving(false);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <Link href="/admin/blog" className="btn-ghost" style={{ padding: 0 }}>
                    <ArrowLeft size={18} /> Back to Posts
                </Link>
                <h1 className={styles.title}>{postId ? 'Edit Post' : 'Create New Post'}</h1>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                <div className={styles.mainCol}>
                    <div className={styles.field}>
                        <label>Title</label>
                        <input
                            type="text"
                            placeholder="Post Title"
                            {...register('title', { required: 'Title is required' })}
                            className={styles.input}
                        />
                        {errors.title && <span className={styles.error}>{errors.title.message as string}</span>}
                    </div>

                    <div className={styles.field}>
                        <label>Content</label>
                        <Controller
                            name="content"
                            control={control}
                            rules={{ required: 'Content is required' }}
                            render={({ field }) => (
                                <RichTextEditor value={field.value} onChange={field.onChange} />
                            )}
                        />
                        {errors.content && <span className={styles.error}>{errors.content.message as string}</span>}
                    </div>
                </div>

                <div className={styles.sideCol}>
                    <div className="glass-card" style={{ padding: 'var(--space-5)' }}>
                        <div className={styles.field}>
                            <label>URL Slug</label>
                            <input
                                type="text"
                                placeholder="my-blog-post"
                                {...register('slug', { required: 'Slug is required' })}
                                className={styles.input}
                            />
                            {errors.slug && <span className={styles.error}>{errors.slug.message as string}</span>}
                        </div>

                        <div className={styles.field}>
                            <label>Category</label>
                            <select {...register('category', { required: 'Category is required' })} className={styles.input}>
                                <option value="Industry Trends">Industry Trends</option>
                                <option value="Case Studies">Case Studies</option>
                                <option value="Product Updates">Product Updates</option>
                                <option value="News">News</option>
                            </select>
                        </div>

                        <div className={styles.field}>
                            <label>Cover Image URL (Optional)</label>
                            <input
                                type="url"
                                placeholder="https://..."
                                {...register('coverImage')}
                                className={styles.input}
                            />
                        </div>

                        <div className={styles.field}>
                            <label>Author</label>
                            <input
                                type="text"
                                placeholder="John Doe"
                                {...register('author')}
                                className={styles.input}
                            />
                        </div>

                        <div className={styles.field}>
                            <label>Read Time</label>
                            <input
                                type="text"
                                placeholder="e.g. 5 min read"
                                {...register('readTime')}
                                className={styles.input}
                            />
                        </div>

                        <div className={styles.field}>
                            <label>Tags (comma separated)</label>
                            <input
                                type="text"
                                placeholder="health, tech, tips"
                                {...register('tags')}
                                className={styles.input}
                            />
                        </div>

                        <div className={styles.field}>
                            <label>Excerpt (Optional)</label>
                            <textarea
                                placeholder="Short description..."
                                {...register('excerpt')}
                                className={styles.input}
                                rows={3}
                            />
                        </div>

                        <button type="submit" disabled={isSaving} className="btn-primary" style={{ width: '100%', marginTop: 'var(--space-4)', justifyContent: 'center' }}>
                            <Save size={18} /> {isSaving ? 'Saving...' : (postId ? 'Update Post' : 'Publish Post')}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}
