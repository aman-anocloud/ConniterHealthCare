import { Metadata } from 'next';
import Hero from '@/components/Hero/Hero';
import Navbar from '@/components/Navbar/Navbar';
import SegmentCards from '@/components/SegmentCards/SegmentCards';
import HospitalRibbon from '@/components/HospitalRibbon/HospitalRibbon';
import HowItWorks from '@/components/HowItWorks/HowItWorks';
import Footer from '@/components/Footer/Footer';

export const metadata: Metadata = {
    title: 'Conninter – Healthcare Coordination Platform',
    description: 'Connect hospitals, healthcare professionals, distributors, and medical representatives. Eliminate unplanned visits and delivery delays.',
};

export default function HomePage() {
    return (
        <>
            <Navbar />
            <main>
                <Hero />
                <SegmentCards />
                <HowItWorks />
                <HospitalRibbon />
            </main>
            <Footer />
        </>
    );
}
