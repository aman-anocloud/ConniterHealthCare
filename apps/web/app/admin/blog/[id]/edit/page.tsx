'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import BlogForm from '@/components/BlogForm/BlogForm';
import api from '@/lib/api';
import { BlogPost } from 'shared/types';

export default function EditBlogPostPage() {
    const params = useParams();
    const [post, setPost] = useState<BlogPost | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const res = await fetch(`/api/blog?slug=${params.id}`);
                if (res.ok) {
                    const data = await res.json();
                    setPost(data);
                } else {
                    throw new Error('Not found');
                }
            } catch (err) {
                console.error(err);
                alert('Failed to load post');
            } finally {
                setLoading(false);
            }
        };

        if (params.id) fetchPost();
    }, [params.id]);

    if (loading) return <div>Loading post data...</div>;
    if (!post) return <div>Post not found</div>;

    return <BlogForm initialData={post} postId={post.id} />;
}
