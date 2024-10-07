"use server"
import { AppointmentData } from "@/types/AppointmentExtended";
import { getAppointmentsForDashboardTable, getAppointmentById } from "../lib/helpers/AppointmentHelper"
import { getSoapNotesforDisplay, getSubjectiveNoteForSoapNote } from "./soapnotes"
import { getPet } from "./pet";
import { getAllSpecies } from "./species";
import { db } from "@/lib/db";
import { uploadFile } from "./fileUpload";

export async function getAppointments(doctorId: number) {
    try{
        return await getAppointmentsForDashboardTable(doctorId);
    }catch(error){
        console.log("AE: ", error)
        throw new Error("Something went wrong.");
    }
}

export async function getAppointment(appointmentId: number) {
    try{
        return await getAppointmentById(appointmentId);
    }catch(error){
        console.log("AE: ", error)
        throw new Error("Something went wrong.");
    }
}

export async function getAppointmentExtended(appointmentId: number) {
    try {
        const appointment = await getAppointment(appointmentId);

        const species = await getAllSpecies();

        const pet = await getPet(appointment?.petId);

        const soapNote = await getSoapNotesforDisplay(appointmentId);

        return {
            ...appointment,
            pet: pet,
            species: species,
            soapNote: soapNote
        }
    }catch(error){
        console.log("AE: ", error)
        throw new Error("Something went wrong.");
    }
}

export async function saveAppointmentData(appointmentData: AppointmentData | null){
    try{
        if(!appointmentData) {
            throw new Error("Appointment Data is missing")
        }

        if(!appointmentData.audioFile) {
            throw new Error("Audio file is missing")
        }
        const existingAppointment = await db.appointment.findFirst({where: {id: appointmentData.id}});

        if(!existingAppointment){
            throw new Error("Failed to fetch existing appointment");
        }

        const audioFileUpload = await uploadFile(existingAppointment.scribeHash, appointmentData.audioFile)

        const appointment = await db.appointment.update({
            where: {id: appointmentData.id},
            data: {
                clientName: appointmentData.clientName,
            }
        })

        const petData = appointmentData.pet;
        const pet = await db.pet.update({
            where: {id: appointmentData.id},
            data: {
                name: petData.name,
                weight: petData.weight
            }
        })
    }catch(error){
        console.log("AE: ", error)
        throw new Error("Something went wrong.");
    }
}