export interface User {
    id: string;
    phone: string;
    name?: string;
    email?: string;
    role: 'INDIVIDUAL' | 'ORGANISATION';
    orgName?: string;
    createdAt: Date;
}

export interface Hospital {
    id: string;
    name: string;
    city: string;
    address: string;
    logoUrl?: string;
    departments: string[];
    rating: number;
    beds: number;
    founded?: number;
    tier: 'Premium' | 'Partner';
}

export type SlotType = 'VMS' | 'DMS';
export type SlotStatus = 'AVAILABLE' | 'BOOKED' | 'CANCELLED';

export interface Slot {
    id: string;
    hospitalId: string;
    date: string;
    startTime: string;
    endTime: string;
    type: SlotType;
    status: SlotStatus;
    department?: string;
}

export type AppointmentStatus = 'PENDING' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED';

export interface Appointment {
    id: string;
    userId: string;
    hospitalId: string;
    slotId: string;
    type: SlotType;
    status: AppointmentStatus;
    notes?: string;
    createdAt: Date;
}

export interface BlogPost {
    id: string;
    title: string;
    slug: string;
    content: string;
    excerpt: string;
    category: 'Industry Trends' | 'Case Studies' | 'Product Updates' | 'Guides';
    coverImage?: string;
    publishedAt: Date;
}

export interface Lead {
    id: string;
    segment: 'hospital' | 'distributor' | 'medRep';
    name: string;
    phone: string;
    email?: string;
    org: string;
    city: string;
    message?: string;
    createdAt: Date;
}

export interface CreateLeadDto {
    segment: Lead['segment'];
    name: string;
    phone: string;
    email?: string;
    org: string;
    city: string;
    message?: string;
}
