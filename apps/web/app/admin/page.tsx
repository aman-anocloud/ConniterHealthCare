'use client';

import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import { FileText, Users, Building2, CalendarCheck, TrendingUp } from 'lucide-react';

export default function AdminOverview() {
    const { user } = useAuth();

    return (
        <div style={{ padding: 'var(--space-8)' }}>
            <header style={{ marginBottom: 'var(--space-8)' }}>
                <div className="badge badge-purple" style={{ marginBottom: 'var(--space-2)' }}>Administrator</div>
                <h1 style={{ fontSize: '32px', color: 'white' }}>Welcome back, Admin</h1>
                <p style={{ color: 'var(--neutral-400)', marginTop: 'var(--space-2)' }}>Overview of platform activity and content management.</p>
            </header>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: 'var(--space-6)',
                marginBottom: 'var(--space-10)'
            }}>
                {/* Stats Cards */}
                <div style={{ background: 'var(--glass-bg)', padding: 'var(--space-6)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--glass-border)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-4)' }}>
                        <div style={{ background: 'rgba(168,85,247,0.1)', padding: '12px', borderRadius: '12px', color: 'var(--brand-primary)' }}>
                            <FileText size={24} />
                        </div>
                        <span style={{ color: '#10b981', fontSize: '14px', fontWeight: 600 }}>+2 this week</span>
                    </div>
                    <p style={{ color: 'var(--neutral-400)', fontSize: '14px', marginBottom: '4px' }}>Published Articles</p>
                    <h3 style={{ fontSize: '28px', color: 'white', fontWeight: 700 }}>12</h3>
                </div>

                <div style={{ background: 'var(--glass-bg)', padding: 'var(--space-6)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--glass-border)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-4)' }}>
                        <div style={{ background: 'rgba(56,189,248,0.1)', padding: '12px', borderRadius: '12px', color: 'var(--brand-secondary)' }}>
                            <Building2 size={24} />
                        </div>
                        <span style={{ color: '#10b981', fontSize: '14px', fontWeight: 600 }}>+5 this month</span>
                    </div>
                    <p style={{ color: 'var(--neutral-400)', fontSize: '14px', marginBottom: '4px' }}>Partner Hospitals</p>
                    <h3 style={{ fontSize: '28px', color: 'white', fontWeight: 700 }}>124</h3>
                </div>

                <div style={{ background: 'var(--glass-bg)', padding: 'var(--space-6)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--glass-border)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-4)' }}>
                        <div style={{ background: 'rgba(16,185,129,0.1)', padding: '12px', borderRadius: '12px', color: '#10b981' }}>
                            <CalendarCheck size={24} />
                        </div>
                        <span style={{ color: '#10b981', fontSize: '14px', fontWeight: 600 }}>+15% vs last week</span>
                    </div>
                    <p style={{ color: 'var(--neutral-400)', fontSize: '14px', marginBottom: '4px' }}>Total Appointments</p>
                    <h3 style={{ fontSize: '28px', color: 'white', fontWeight: 700 }}>8,492</h3>
                </div>

                <div style={{ background: 'var(--glass-bg)', padding: 'var(--space-6)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--glass-border)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-4)' }}>
                        <div style={{ background: 'rgba(245,158,11,0.1)', padding: '12px', borderRadius: '12px', color: '#f59e0b' }}>
                            <Users size={24} />
                        </div>
                        <span style={{ color: '#10b981', fontSize: '14px', fontWeight: 600 }}>+42 today</span>
                    </div>
                    <p style={{ color: 'var(--neutral-400)', fontSize: '14px', marginBottom: '4px' }}>Registered Users</p>
                    <h3 style={{ fontSize: '28px', color: 'white', fontWeight: 700 }}>4,105</h3>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 'var(--space-6)' }}>
                {/* CMS Quick Actions */}
                <div style={{ background: 'var(--glass-bg)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--glass-border)', overflow: 'hidden' }}>
                    <div style={{ padding: 'var(--space-6)', borderBottom: '1px solid var(--glass-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h2 style={{ fontSize: '18px', color: 'white', fontWeight: 600 }}>Content Management</h2>
                    </div>
                    <div style={{ padding: 'var(--space-6)' }}>
                        <div style={{ display: 'flex', gap: 'var(--space-4)', flexDirection: 'column' }}>
                            <Link href="/admin/blog" style={{
                                display: 'flex', alignItems: 'center', gap: '16px', padding: '16px',
                                background: 'rgba(255,255,255,0.03)', borderRadius: '12px', textDecoration: 'none',
                                transition: 'all 0.2s', border: '1px solid transparent'
                            }}
                                onMouseEnter={(e) => e.currentTarget.style.border = '1px solid var(--brand-primary)'}
                                onMouseLeave={(e) => e.currentTarget.style.border = '1px solid transparent'}>
                                <div style={{ background: 'var(--brand-primary)', width: 48, height: 48, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                                    <FileText size={24} />
                                </div>
                                <div>
                                    <h4 style={{ color: 'white', fontSize: '16px', fontWeight: 500, marginBottom: '4px' }}>Manage Blog Posts</h4>
                                    <p style={{ color: 'var(--neutral-400)', fontSize: '14px', margin: 0 }}>Create, edit, or delete insights & case studies.</p>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>

                <div style={{ background: 'var(--glass-bg)', padding: 'var(--space-6)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--glass-border)' }}>
                    <h2 style={{ fontSize: '18px', color: 'white', fontWeight: 600, marginBottom: 'var(--space-6)' }}>System Status</h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ color: 'var(--neutral-300)' }}>API Server</span>
                            <span className="badge" style={{ background: 'rgba(16,185,129,0.1)', color: '#10b981', border: '1px solid rgba(16,185,129,0.2)' }}>Online</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ color: 'var(--neutral-300)' }}>PostgreSQL Database</span>
                            <span className="badge" style={{ background: 'rgba(239,68,68,0.1)', color: '#ef4444', border: '1px solid rgba(239,68,68,0.2)' }}>Offline</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ color: 'var(--neutral-300)' }}>Firebase Auth</span>
                            <span className="badge" style={{ background: 'rgba(16,185,129,0.1)', color: '#10b981', border: '1px solid rgba(16,185,129,0.2)' }}>Online</span>
                        </div>
                    </div>

                    <div style={{ marginTop: 'var(--space-8)', padding: '16px', background: 'rgba(239,68,68,0.05)', borderRadius: '8px', border: '1px solid rgba(239,68,68,0.2)' }}>
                        <p style={{ color: '#ef4444', fontSize: '13px', margin: 0 }}>
                            <strong>Database Disconnected</strong><br />
                            Please configure the DATABASE_URL in your backend .env file to enable live content loading.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
