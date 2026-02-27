'use client';

import { useState } from 'react';
import styles from './LeadModal.module.css';
import api from '@/lib/api';

interface Props {
    segment: 'hospital' | 'distributor' | 'medRep';
    onClose: () => void;
}

const config = {
    hospital: { title: 'Register Your Hospital', labelOrg: 'Hospital Name', icon: '🏥' },
    distributor: { title: 'Join as Distributor', labelOrg: 'Company Name', icon: '🚚' },
    medRep: { title: 'Start Booking as Medical Rep', labelOrg: 'Organisation / Company', icon: '💼' },
};

export default function LeadModal({ segment, onClose }: Props) {
    const cfg = config[segment];
    const [form, setForm] = useState({ name: '', phone: '', email: '', org: '', city: '', message: '' });
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await api.post('/leads', { ...form, segment });
            setSubmitted(true);
        } catch {
            // still show success for demo
            setSubmitted(true);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.overlay} onClick={(e) => e.target === e.currentTarget && onClose()}>
            <div className={styles.modal}>
                <button className={styles.close} onClick={onClose}>✕</button>

                {submitted ? (
                    <div className={styles.success}>
                        <div className={styles.successIcon}>✓</div>
                        <h3>Thanks for connecting!</h3>
                        <p>Our team will reach out within 24 hours.</p>
                        <button className="btn-primary" onClick={onClose}>Done</button>
                    </div>
                ) : (
                    <>
                        <div className={styles.head}>
                            <span>{cfg.icon}</span>
                            <h2 className={styles.title}>{cfg.title}</h2>
                            <p className={styles.sub}>Fill your details below and we'll get back to you shortly.</p>
                        </div>

                        <form className={styles.form} onSubmit={handleSubmit}>
                            <div className={styles.row}>
                                <div className={styles.field}>
                                    <label>Your Name *</label>
                                    <input type="text" required placeholder="Dr. Ananya Sharma" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
                                </div>
                                <div className={styles.field}>
                                    <label>Phone Number *</label>
                                    <input type="tel" required placeholder="+91 98765 43210" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
                                </div>
                            </div>
                            <div className={styles.row}>
                                <div className={styles.field}>
                                    <label>Email</label>
                                    <input type="email" placeholder="you@hospital.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
                                </div>
                                <div className={styles.field}>
                                    <label>{cfg.labelOrg} *</label>
                                    <input type="text" required placeholder="e.g. Sakra World Hospital" value={form.org} onChange={e => setForm({ ...form, org: e.target.value })} />
                                </div>
                            </div>
                            <div className={styles.field}>
                                <label>City *</label>
                                <input type="text" required placeholder="Bengaluru, Mumbai…" value={form.city} onChange={e => setForm({ ...form, city: e.target.value })} />
                            </div>
                            <div className={styles.field}>
                                <label>Message</label>
                                <textarea placeholder="Tell us about your requirements…" rows={3} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} />
                            </div>
                            <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }} disabled={loading}>
                                {loading ? 'Submitting…' : 'Submit Request'}
                            </button>
                        </form>
                    </>
                )}
            </div>
        </div>
    );
}
