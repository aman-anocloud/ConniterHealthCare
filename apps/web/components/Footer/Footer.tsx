import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={`container ${styles.inner}`}>
                <div className={styles.brand}>
                    <Link href="/" className={styles.logo}>
                        <span className={styles.logoIcon}>⊕</span>
                        <span>Conninter</span>
                    </Link>
                    <p className={styles.tagline}>
                        The unified healthcare coordination platform connecting hospitals, distributors, and medical representatives.
                    </p>
                    <div className={styles.social}>
                        {['LinkedIn', 'Twitter', 'Instagram'].map((s) => (
                            <a key={s} href="#" className={styles.socialLink}>{s[0]}</a>
                        ))}
                    </div>
                </div>

                <div className={styles.links}>
                    <div className={styles.col}>
                        <h4>Platform</h4>
                        <Link href="/hospitals">Find Hospitals</Link>
                        <Link href="/auth">Book a Slot</Link>
                        <Link href="/#how-it-works">How It Works</Link>
                        <Link href="/dashboard">My Dashboard</Link>
                    </div>
                    <div className={styles.col}>
                        <h4>For</h4>
                        <Link href="/#segments">Hospitals</Link>
                        <Link href="/#segments">Distributors</Link>
                        <Link href="/#segments">Medical Reps</Link>
                    </div>
                    <div className={styles.col}>
                        <h4>Company</h4>
                        <Link href="/blog">Blog & Insights</Link>
                        <a href="#">Careers</a>
                        <a href="#">Privacy Policy</a>
                        <a href="#">Terms of Service</a>
                    </div>
                </div>
            </div>

            <div className={styles.bottom}>
                <div className="container">
                    <p>© {new Date().getFullYear()} Conninter. All rights reserved.</p>
                    <p className={styles.tagRight}>Made with ❤️ for Indian Healthcare</p>
                </div>
            </div>
        </footer>
    );
}
