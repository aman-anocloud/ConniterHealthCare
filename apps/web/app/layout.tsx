import type { Metadata } from 'next';
import './globals.css';
import { AuthProvider } from '@/context/AuthContext';

export const metadata: Metadata = {
    title: {
        default: 'Conninter – Healthcare Coordination Platform',
        template: '%s | Conninter',
    },
    description:
        'Connect hospitals, healthcare professionals, distributors, and medical representatives. Eliminate unplanned visits and delivery delays with Conninter VMS & DMS.',
    keywords: [
        'healthcare coordination',
        'visitor management system',
        'delivery management',
        'hospital appointments',
        'medical representative scheduling',
    ],
    openGraph: {
        type: 'website',
        locale: 'en_IN',
        url: 'https://conninter.com',
        siteName: 'Conninter',
        title: 'Conninter – Healthcare Coordination Platform',
        description: 'Unified digital ecosystem for hospitals, distributors, and medical reps.',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Conninter – Healthcare Coordination Platform',
        description: 'Unified digital ecosystem for hospitals, distributors, and medical reps.',
    },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
            </head>
            <body>
                <AuthProvider>{children}</AuthProvider>
            </body>
        </html>
    );
}
