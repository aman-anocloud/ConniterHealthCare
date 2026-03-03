import { NextResponse } from 'next/server';
import TurndownService from 'turndown';
import matter from 'gray-matter';
import { marked } from 'marked';
import fs from 'fs';
import path from 'path';

let turndownService: TurndownService | null = null;
if (typeof window === 'undefined') {
    turndownService = new TurndownService({ headingStyle: 'atx' });
}

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_OWNER = process.env.GITHUB_OWNER;
const GITHUB_REPO = process.env.GITHUB_REPO;
const BRANCH = 'main';

// Helper to interact with GitHub API
async function githubApi(path: string, method: string = 'GET', body?: any) {
    if (!GITHUB_TOKEN || !GITHUB_OWNER || !GITHUB_REPO) {
        throw new Error('GitHub credentials are not configured in environment variables.');
    }

    const url = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${path}`;
    const headers = {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        Accept: 'application/vnd.github.v3+json',
        'X-GitHub-Api-Version': '2022-11-28',
    };

    const options: RequestInit = { method, headers };
    if (body) {
        options.body = JSON.stringify(body);
        options.headers = { ...headers, 'Content-Type': 'application/json' };
    }

    return fetch(url, options);
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { title, slug, content, category, excerpt, coverImage, author, readTime, tags } = body;

        if (!title || !slug || !content) {
            return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
        }

        // Convert HTML content to Markdown
        const markdownContent = turndownService?.turndown(content) || content;

        // Create Frontmatter
        const frontmatter = {
            title,
            slug,
            category,
            excerpt: excerpt || '',
            coverImage: coverImage || '',
            author: author || '',
            readTime: readTime || '',
            tags: tags || [],
            publishedAt: new Date().toISOString()
        };

        // Combine using gray-matter
        const fileContent = matter.stringify(markdownContent, frontmatter);

        if (!GITHUB_TOKEN || !GITHUB_OWNER || !GITHUB_REPO) {
            console.warn("Missing credentials. Saving file locally for development...");
            const dirPath = path.join(process.cwd(), 'content', 'blog');
            const absoluteFilePath = path.join(dirPath, `${slug}.md`);

            if (!fs.existsSync(dirPath)) {
                fs.mkdirSync(dirPath, { recursive: true });
            }

            fs.writeFileSync(absoluteFilePath, fileContent);
            return NextResponse.json({ message: 'Saved locally for development (No GitHub Credentials)' }, { status: 200 });
        }

        // Upload to GitHub
        const filePath = `apps/web/content/blog/${slug}.md`;

        let fileSha = null;
        try {
            // Try to get the file first to see if we are updating an existing one
            const getRes = await githubApi(filePath);
            if (getRes.ok) {
                const getJson = await getRes.json();
                fileSha = getJson.sha;
            }
        } catch (e) {
            console.log("File does not exist yet. Creating a new one.");
        }

        // Push to GitHub
        const putRes = await githubApi(filePath, 'PUT', {
            message: fileSha ? `Update blog post: ${slug}` : `Create blog post: ${slug}`,
            content: Buffer.from(fileContent).toString('base64'),
            branch: BRANCH,
            ...(fileSha && { sha: fileSha }),
        });

        if (!putRes.ok) {
            const errorText = await putRes.text();
            console.error('GitHub API Error:', errorText);
            throw new Error(`Failed to push to GitHub: ${putRes.statusText}`);
        }

        return NextResponse.json({ message: 'Post saved successfully to GitHub' }, { status: 200 });

    } catch (error: any) {
        console.error('Error in GitHub Git-Backed API:', error);
        return NextResponse.json({ message: error.message || 'Internal server error' }, { status: 500 });
    }
}

// Admin API to fetch list of files from GitHub directly (so the dashboard always sees live repo state)
export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const slug = searchParams.get('slug');

        if (slug) {
            // Fetch single post
            const filePath = `apps/web/content/blog/${slug}.md`;
            const res = await githubApi(filePath);

            if (!res.ok) {
                return NextResponse.json({ message: 'Post not found' }, { status: 404 });
            }

            const file = await res.json();
            const decodedContent = Buffer.from(file.content, 'base64').toString('utf8');
            const { data: frontmatter, content: markdownBody } = matter(decodedContent);
            const htmlContent = marked.parse(markdownBody); // Convert MD back to HTML for TipTap

            return NextResponse.json({
                id: frontmatter.slug || slug,
                ...frontmatter,
                content: htmlContent,
            }, { status: 200 });
        }

        // Otherwise fetch all posts
        const filePath = `apps/web/content/blog`;
        const res = await githubApi(filePath);

        if (!res.ok) {
            if (res.status === 404) {
                return NextResponse.json([], { status: 200 }); // Directory doesn't exist yet
            }
            throw new Error(`Failed to fetch from GitHub: ${res.statusText}`);
        }

        const files = await res.json();

        // We only return basic info here for the admin table. Full parsing happens on the public pages.
        const posts = files
            .filter((file: any) => file.name.endsWith('.md'))
            .map((file: any) => ({
                id: file.name.replace('.md', ''),
                title: file.name.replace('.md', ''),
                slug: file.name.replace('.md', ''),
                category: 'Unknown (Parse file for accurate category)',
                publishedAt: new Date().toISOString()
            }));

        return NextResponse.json(posts, { status: 200 });
    } catch (error: any) {
        console.error('Error fetching from GitHub:', error);
        return NextResponse.json([], { status: 200 }); // Return empty array gracefully for local dev without credentials
    }
}

export async function DELETE(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const slug = searchParams.get('slug');

        if (!slug) {
            return NextResponse.json({ message: 'Missing slug' }, { status: 400 });
        }

        const filePath = `apps/web/content/blog/${slug}.md`;

        let fileSha = null;
        try {
            const getRes = await githubApi(filePath);
            if (getRes.ok) {
                const getJson = await getRes.json();
                fileSha = getJson.sha;
            }
        } catch (e) {
            return NextResponse.json({ message: 'File not found' }, { status: 404 });
        }

        if (!fileSha) {
            return NextResponse.json({ message: 'File not found' }, { status: 404 });
        }

        const delRes = await githubApi(filePath, 'DELETE', {
            message: `Delete blog post: ${slug}`,
            sha: fileSha,
            branch: BRANCH,
        });

        if (!delRes.ok) {
            const errorText = await delRes.text();
            throw new Error(`Failed to delete from GitHub: ${delRes.statusText}`);
        }

        return NextResponse.json({ message: 'Post deleted successfully from GitHub' }, { status: 200 });

    } catch (error: any) {
        console.error('Error deleting from GitHub:', error);
        if (error.message.includes('not configured')) {
            console.warn("Simulated Delete: Missing GitHub credentials.");
            return NextResponse.json({ message: 'Simulated Delete' }, { status: 200 });
        }
        return NextResponse.json({ message: error.message || 'Internal server error' }, { status: 500 });
    }
}
