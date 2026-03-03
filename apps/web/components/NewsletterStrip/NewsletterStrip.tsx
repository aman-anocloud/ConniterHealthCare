'use client';

import { useState } from 'react';
import styles from './NewsletterStrip.module.css';

export default function NewsletterStrip() {
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (email) {
            setSubmitted(true);
            setEmail('');
        }
    };

    return (
        <section className={styles.strip}>
            <div className={styles.container}>
                <div className={styles.textCol}>
                    <div className={styles.icon}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                            <polyline points="22,6 12,13 2,6"></polyline>
                        </svg>
                    </div>
                    <div>
                        <h3 className={styles.heading}>Get healthcare coordination insights in your inbox</h3>
                        <p className={styles.sub}>Hospital operations, scheduling best practices, and Conninter updates — once a month, no spam.</p>
                    </div>
                </div>
                {!submitted ? (
                    <form className={styles.formCol} onSubmit={handleSubmit}>
                        <input
                            type="email"
                            className={styles.input}
                            placeholder="Enter your email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <button type="submit" className={styles.submitBtn}>
                            Subscribe
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                        </button>
                    </form>
                ) : (
                    <div className={styles.successMsg}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                        You&apos;re subscribed! Talk soon.
                    </div>
                )}
            </div>
        </section>
    );
}
