'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { RecaptchaVerifier, signInWithPhoneNumber, ConfirmationResult } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import styles from './page.module.css';

export default function AuthPage() {
    const router = useRouter();
    const [step, setStep] = useState<'phone' | 'otp'>('phone');
    const [phone, setPhone] = useState('');
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [confirmation, setConfirmation] = useState<ConfirmationResult | null>(null);
    const recaptchaRef = useRef<HTMLDivElement>(null);
    const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

    useEffect(() => {
        if (typeof window !== 'undefined' && recaptchaRef.current) {
            try {
                (window as any).recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', { size: 'invisible' });
            } catch { }
        }
    }, []);

    const sendOtp = async () => {
        if (!phone || phone.length < 10) { setError('Enter a valid phone number'); return; }
        setLoading(true); setError('');
        try {
            const verifier = (window as any).recaptchaVerifier;
            const result = await signInWithPhoneNumber(auth, `+91${phone.replace(/\D/g, '')}`, verifier);
            setConfirmation(result);
            setStep('otp');
        } catch (e: any) {
            setError(e.message || 'Failed to send OTP. Check your number.');
        } finally {
            setLoading(false);
        }
    };

    const verifyOtp = async () => {
        const code = otp.join('');
        if (code.length < 6) { setError('Enter the 6-digit OTP'); return; }
        if (!confirmation) return;
        setLoading(true); setError('');
        try {
            await confirmation.confirm(code);
            router.push('/dashboard');
        } catch {
            setError('Invalid OTP. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleOtpInput = (index: number, value: string) => {
        const v = value.replace(/\D/g, '').slice(0, 1);
        const next = [...otp]; next[index] = v;
        setOtp(next);
        if (v && index < 5) otpRefs.current[index + 1]?.focus();
    };

    const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) otpRefs.current[index - 1]?.focus();
    };

    return (
        <div className={styles.page}>
            {/* Bg orbs */}
            <div className={styles.orb1} />
            <div className={styles.orb2} />

            <div className={styles.card}>
                {/* Logo */}
                <a href="/" className={styles.logo}>
                    <span className={styles.logoIcon}>⊕</span>
                    <span>Conninter</span>
                </a>

                {step === 'phone' ? (
                    <>
                        <h1 className={styles.title}>Welcome back</h1>
                        <p className={styles.sub}>Enter your phone number to receive a one-time password.</p>

                        <div className={styles.phoneInput}>
                            <span className={styles.prefix}>🇮🇳 +91</span>
                            <input
                                type="tel"
                                placeholder="98765 43210"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                                onKeyDown={(e) => e.key === 'Enter' && sendOtp()}
                                autoFocus
                            />
                        </div>

                        {error && <p className={styles.error}>{error}</p>}

                        <button className="btn-primary" style={{ width: '100%', justifyContent: 'center' }} onClick={sendOtp} disabled={loading}>
                            {loading ? <span className={styles.spinner} /> : 'Send OTP'}
                        </button>

                        <p className={styles.note}>By continuing, you agree to our Terms of Service and Privacy Policy.</p>
                    </>
                ) : (
                    <>
                        <div className={styles.otpHeader}>
                            <div className={styles.checkIcon}>📱</div>
                            <h1 className={styles.title}>Check your phone</h1>
                            <p className={styles.sub}>We sent a 6-digit OTP to <strong>+91 {phone}</strong></p>
                        </div>

                        <div className={styles.otpBoxes}>
                            {otp.map((digit, i) => (
                                <input
                                    key={i}
                                    ref={(el) => { otpRefs.current[i] = el; }}
                                    type="text"
                                    inputMode="numeric"
                                    className={styles.otpBox}
                                    value={digit}
                                    onChange={(e) => handleOtpInput(i, e.target.value)}
                                    onKeyDown={(e) => handleOtpKeyDown(i, e)}
                                    maxLength={1}
                                />
                            ))}
                        </div>

                        {error && <p className={styles.error}>{error}</p>}

                        <button className="btn-primary" style={{ width: '100%', justifyContent: 'center' }} onClick={verifyOtp} disabled={loading}>
                            {loading ? <span className={styles.spinner} /> : 'Verify & Continue'}
                        </button>

                        <button className={styles.resend} onClick={() => { setStep('phone'); setOtp(['', '', '', '', '', '']); setError(''); }}>
                            ← Change number / Resend OTP
                        </button>
                    </>
                )}

                <div id="recaptcha-container" ref={recaptchaRef} />
            </div>
        </div>
    );
}
