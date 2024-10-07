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

type SoapNoteData<T> = {
    title: string;
    value: T;
};

type SubjectiveNote = {
    id: number;
    soapNoteId: number;
    data: {
        chiefComplaint: SoapNoteData<string>;
        historyOfPresentIllness: SoapNoteData<string>;
        behaviouralAndDietaryChanges: SoapNoteData<string>;
        priorMedicalHistory: SoapNoteData<string>;
    };
};

type ObjectiveNote = {
    id: number;
    soapNoteId: number;
    data: {
        vitalSigns: SoapNoteData<Record<string, string>>;
        physicalExaminationFindings: SoapNoteData<string[]>;
        diagnositicTestResults: SoapNoteData<string>;
        measurementsAndObservations: SoapNoteData<string>;
    };
};

type AssessmentNote = {
    id: number;
    soapNoteId: number;
    data: {
        primaryDiagnosis: SoapNoteData<string>;
        differentialDiagnoses: SoapNoteData<string[]>;
        prognosis: SoapNoteData<string>;
    };
};

type PlanNote = {
    id: number;
    soapNoteId: number;
    data: {
        vitalSigns: SoapNoteData<any>; // Adjust type if necessary
        physicalExaminationFindings: SoapNoteData<any>; // Adjust type if necessary
        diagnositicTestResults: SoapNoteData<any>; // Adjust type if necessary
        measurementsAndObservations: SoapNoteData<any>; // Adjust type if necessary
    };
};

export type SoapNote = {
    appointmentId: number;
    soapNoteId: number;
    summary: string;
    subjectiveNote: SubjectiveNote;
    objectiveNote: ObjectiveNote;
    assesmentNote: AssessmentNote;
    planNote: PlanNote;
};