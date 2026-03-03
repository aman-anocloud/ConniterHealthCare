'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import api from '@/lib/api';
import { BlogPost } from 'shared/types';
import styles from './page.module.css';
import { Trash2, Edit, Plus } from 'lucide-react';

export default function AdminBlogPage() {
    const { token } = useAuth();
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchPosts = async () => {
        try {
            const res = await fetch('/api/blog');
            if (res.ok) {
                const data = await res.json();
                setPosts(data);
            }
        } catch (err) {
            console.error('Failed to fetch posts');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (token) fetchPosts();
    }, [token]);

    const handleDelete = async (id: string, title: string) => {
        if (!window.confirm(`Are you sure you want to delete "${title}"?`)) return;
        try {
            const res = await fetch(`/api/blog?slug=${id}`, { method: 'DELETE' });
            if (res.ok) {
                setPosts(posts.filter((p) => p.id !== id));
            } else {
                alert('Delete failed');
            }
        } catch (err) {
            alert('Error deleting post');
        }
    };

    if (loading) return <div>Loading posts...</div>;

    return (
        <div className={styles.page}>
            <div className={styles.header}>
                <div>
                    <h1 className={styles.title}>Blog Posts</h1>
                    <p className={styles.subtitle}>Manage your content and insights.</p>
                </div>
                <Link href="/admin/blog/new" className="btn-primary">
                    <Plus size={18} /> New Post
                </Link>
            </div>

            <div className="glass-card">
                {posts.length === 0 ? (
                    <div className={styles.empty}>No posts found. Create your first one!</div>
                ) : (
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Category</th>
                                <th>Published</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {posts.map((post) => (
                                <tr key={post.id}>
                                    <td className={styles.fontWeightMedium}>{post.title}</td>
                                    <td><span className={`badge badge-blue`}>{post.category}</span></td>
                                    <td>{new Date(post.publishedAt).toLocaleDateString()}</td>
                                    <td>
                                        <div className={styles.actions}>
                                            <Link href={`/admin/blog/${post.id}/edit`} className={styles.iconBtn}>
                                                <Edit size={16} />
                                            </Link>
                                            <button onClick={() => handleDelete(post.id, post.title)} className={`${styles.iconBtn} ${styles.delete}`}>
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}
