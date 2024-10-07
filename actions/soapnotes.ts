"use server"
import { db } from "@/lib/db";
import { PrismaClient } from "@prisma/client";
import { JsonObject, JsonValue } from "@prisma/client/runtime/library";

export async function getSoapNotesForAppointment(appointmentId:number) {
    try{
        const note = await db.soapnote.findFirst({
            where: { appointmentId: appointmentId}
        });

        if (!note){
            return {}
        }
        
        return note;
    }catch(error){
        console.log("E in AC: ", error);
        throw new Error("Something went wrong.")

    }
}

export async function getSubjectiveNoteForSoapNote(soapnoteId:number) {
    try{
        const note = await db.subjectivenote.findFirst({
            where: { id: soapnoteId}
        });

        if (!note){
            return {}
        }
        
        return note;
    }catch(error){
        console.log("E in AC: ", error);
        throw new Error("Something went wrong.")

    }
}

export async function getObjectiveNoteForSoapNote(soapnoteId:number) {
    try{
        const note = await db.objectivenote.findFirst({
            where: { id: soapnoteId}
        });

        if (!note){
            return {}
        }
        
        return note;
    }catch(error){
        console.log("E in AC: ", error);
        throw new Error("Something went wrong.")

    }
}

export async function getAssesmentNoteForSoapNote(soapnoteId:number) {
    try{
        const note = await db.assesmentnote.findFirst({
            where: { id: soapnoteId}
        });
console.log("assesment: ", note);

        if (!note){
            return {}
        }
        
        return note;
    }catch(error){
        console.log("E in AC: ", error);
        throw new Error("Something went wrong.")

    }
}

export async function getPlanNoteForSoapNote(soapnoteId:number) {
    try{
        const note = await db.plannote.findFirst({
            where: { id: soapnoteId}
        });

        if (!note){
            return {}
        }
        
        return note;
    }catch(error){
        console.log("E in AC: ", error);
        throw new Error("Something went wrong.")

    }
}

export async function getSoapNotesforDisplay(appointmentId: number){
    const soapnote = await getSoapNotesForAppointment(appointmentId);

    const soapNoteId = soapnote?.id

    if (!soapNoteId) {
        console.log("No Soap note: ");
        
        return null;
    }
    
    // Get All Notes
    const subjectiveNote = await getSubjectiveNoteForSoapNote(soapNoteId);
    const objectiveNote = await getObjectiveNoteForSoapNote(soapNoteId);
    const assesmentNote = await getAssesmentNoteForSoapNote(soapNoteId);
    const planNote = await getPlanNoteForSoapNote(soapNoteId);

    const result =  {
        appointmentId: appointmentId,
        soapNoteId: soapNoteId,
        summary: soapnote?.summary ?? "",
        subjectiveNote: formatNotesForDisplay("subjective", subjectiveNote),
        objectiveNote: formatNotesForDisplay("objective", objectiveNote),
        assesmentNote: formatNotesForDisplay("assesment", assesmentNote),
        planNote: formatNotesForDisplay("plan", planNote),
    }

    console.log("FINAL RESULT: ", JSON.stringify(result));
    return result;
}


function formatNotesForDisplay<T extends JsonObject>(type: DbColumnMapKeys, note: T | null) {
    const columnMap = dbColumnMaps[type];

    const result = {
        id: note?.id,
        soapNoteId: note?.soapNoteId,
        data: {} as Record<string, { title: string; value: any }>
    };

    for (const key in columnMap) {
        if (columnMap.hasOwnProperty(key)) {
            const title = columnMap[key as keyof typeof columnMap];

            
            const noteValue = note?.[key as keyof T];

            const value = typeof noteValue === 'string' 
                ? JSON.parse(noteValue) 
                : null;

            result.data[key] = {
                title: title,
                value: value
            };
        }
    }
    // console.log(`Result of ${type.toString()}: `, result);
    return result; 
}

const dbColumnMaps = {
    subjective: {
        chiefComplaint: "Chief Complaint",
        historyOfPresentIllness: "History of Present Illness",
        behaviouralAndDietaryChanges: "Behavioral & Dietary Changes",
        priorMedicalHistory: "Prior Medical History"
    },
    objective: {
        vitalSigns: "Vital Signs",
        physicalExaminationFindings: "Physical Examination Findings",
        diagonosticTestResults: "Diagnostic Test Results",
        measurementsAndObservations: "Measurements and Observations"
    },
    assesment: {
        primaryDiagnosis: "Primary Diagnosis",
        differentialDiagnoses: "Differential Diagnoses",
        prognosis: "Prognosis"
    },
    plan: {
        treatmentPlan: "Treatment Plan",
        dietaryRecommendations: "Dietary Recommendations",
        ownerInstructions: "Owner Instructions",
        followupCare: "Follow-up Care"
    }
} as const;

type DbColumnMapKeys = keyof typeof dbColumnMaps;