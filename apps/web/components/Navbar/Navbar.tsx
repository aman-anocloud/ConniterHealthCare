'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './Navbar.module.css';

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 40);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
            <div className={`container ${styles.inner}`}>
                {/* Logo */}
                <Link href="/" className={styles.logo}>
                    <span className={styles.logoIcon}>⊕</span>
                    <span>Conninter</span>
                </Link>

                {/* Desktop Links */}
                <ul className={styles.links}>
                    <li><Link href="/hospitals">Hospitals</Link></li>
                    <li><Link href="/#how-it-works">How It Works</Link></li>
                    <li><Link href="/blog">Blog</Link></li>
                    <li><Link href="/#partners">Partners</Link></li>
                </ul>

                {/* CTA */}
                <div className={styles.actions}>
                    <Link href="/auth" className="btn-secondary" style={{ fontSize: 14, padding: '10px 20px' }}>
                        Sign In
                    </Link>
                    <Link href="/auth" className="btn-primary" style={{ fontSize: 14, padding: '10px 20px' }}>
                        Get Started
                    </Link>
                </div>

                {/* Hamburger */}
                <button
                    className={styles.hamburger}
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Toggle menu"
                >
                    <span className={menuOpen ? styles.barOpen : ''} />
                    <span className={menuOpen ? styles.barOpen : ''} />
                    <span className={menuOpen ? styles.barOpen : ''} />
                </button>
            </div>

            {/* Mobile Menu */}
            {menuOpen && (
                <div className={styles.mobileMenu}>
                    <Link href="/hospitals" onClick={() => setMenuOpen(false)}>Hospitals</Link>
                    <Link href="/#how-it-works" onClick={() => setMenuOpen(false)}>How It Works</Link>
                    <Link href="/blog" onClick={() => setMenuOpen(false)}>Blog</Link>
                    <Link href="/auth" className="btn-primary" onClick={() => setMenuOpen(false)}>Get Started</Link>
                </div>
            )}
        </nav>
    );
}
