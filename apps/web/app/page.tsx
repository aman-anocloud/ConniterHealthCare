import { Metadata } from 'next';
import Navbar from '@/components/Navbar/Navbar';
import Hero from '@/components/Hero/Hero';
import StatsBar from '@/components/StatsBar/StatsBar';
import AboutSection from '@/components/AboutSection/AboutSection';
import Departments from '@/components/Departments/Departments';
import FeaturedServices from '@/components/FeaturedServices/FeaturedServices';
import DoctorsDirectory from '@/components/DoctorsDirectory/DoctorsDirectory';
import WhyChooseUs from '@/components/WhyChooseUs/WhyChooseUs';
import HospitalRibbon from '@/components/HospitalRibbon/HospitalRibbon';
import EmergencyCTA from '@/components/EmergencyCTA/EmergencyCTA';
import MinimalBlogList from '@/components/MinimalBlogList/MinimalBlogList';
import NewsletterStrip from '@/components/NewsletterStrip/NewsletterStrip';
import AppBanner from '@/components/AppBanner/AppBanner';
import Footer from '@/components/Footer/Footer';

export const metadata: Metadata = {
    title: 'Conninter – Clinic & Hospital Management Platform',
    description: 'Conninter streamlines visitor management, delivery coordination, and healthcare scheduling for hospitals, distributors, and medical representatives across India.',
    keywords: 'hospital management, clinic software, visitor management system, delivery management, healthcare coordination, India',
    openGraph: {
        title: 'Conninter – Clinic & Hospital Management Platform',
        description: 'Schedule visits, coordinate deliveries, and manage healthcare logistics on one unified platform.',
        type: 'website',
    },
};

export default function HomePage() {
    return (
        <>
            <Navbar />
            <main>
                {/* 1. Hero */}
                <Hero />

                {/* 2. Stats strip with count-up animation on scroll */}
                <StatsBar />

                {/* 3. About – Two-column story + feature cards with SVG icons */}
                <AboutSection />

                {/* 4. Departments – VMS, DMS, Emergency, Directory, Pro Network, Analytics */}
                <Departments />

                {/* 5. Featured Services – 3 service cards + 6 mini chips */}
                <FeaturedServices />

                {/* 6. Contacts Directory – Find a hospital partner */}
                <DoctorsDirectory />

                {/* 7. Why Choose Us – Dark left panel + testimonial + 6-feature grid */}
                <WhyChooseUs />

                {/* 8. Hospital Ribbon – Trusted partner hospitals */}
                <HospitalRibbon />

                {/* 9. Emergency CTA – Full-width blue gradient, two-column */}
                <EmergencyCTA />

                {/* 10. Blog – Recent healthcare articles */}
                <MinimalBlogList />

                {/* 11. Newsletter Strip – Email subscription */}
                <NewsletterStrip />

                {/* 12. App / WhatsApp Banner */}
                <AppBanner />
            </main>
            <Footer />
        </>
    );
}
