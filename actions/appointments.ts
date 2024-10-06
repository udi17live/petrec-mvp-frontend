"use server"
import { getAppointmentsForDashboardTable, getAppointmentById } from "../lib/helpers/AppointmentHelper"
import { getPet } from "./pet";
import { getAllSpecies } from "./species";

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

        const a= {
            ...appointment,
            pet: pet,
            species: species
        }
        console.log("A: ", a)
        return a;
    }catch(error){
        console.log("AE: ", error)
        throw new Error("Something went wrong.");
    }
}
