import { AppointmentDataProcessingStatus, AppointmentStatus, BookingPlatform } from "@prisma/client";

export interface AppointmentData {
    id: number;
    scribeHash: string;
    clientName: string;
    pet: {
        id: number;
        name: string;
        weight: number;
    };
    audioFile: File | null;
    isCompleted: boolean
}