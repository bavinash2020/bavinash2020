export type UserRole = 'driver' | 'owner' | 'admin';

export interface User {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    avatarUrl?: string;
}

export interface DriverProfile extends User {
    role: 'driver';
    yearsExperience: number;
    licenseNumber: string; // Masked in public view
    rating: number;
    hourlyRate: number;
    dailyRate: number;
    bio: string;
    location: string;
    isAvailable: boolean;
}

export interface CarOwnerProfile extends User {
    role: 'owner';
    carDetails: {
        make: string;
        model: string;
        year: number;
        transmission: 'manual' | 'automatic';
    };
}

export interface Booking {
    id: string;
    driverId: string;
    ownerId: string;
    startDate: string; // ISO Date
    endDate: string; // ISO Date
    status: 'pending' | 'accepted' | 'rejected' | 'completed' | 'cancelled';
    totalAmount: number;
    tripDetails: string;
}
