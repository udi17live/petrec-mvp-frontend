import { db } from "@/lib/db";

export async function getAppointmentsForDashboardTable(doctorId: number) {
    try {
        const appointments = await db.appointment.findMany({
            where: { doctorId: doctorId, deleted: false },
            orderBy: { startTime: 'desc' },
            include: {
                pet: {
                    select: {
                        name: true,
                        species: {
                            select: {
                                name: true,
                            },
                        },
                    },
                },
            },
        });

        const appointmentsWithPetAndSpeciesNames = appointments.map(appointment => ({
            id: appointment.id,
            clientName: appointment.clientName,
            startTime: appointment.startTime,
            endTime: appointment.endTime,
            statusId: appointment.statusId,
            doctorId: appointment.doctorId,
            petId: appointment.petId,
            petName: appointment.pet?.name,
            speciesName: appointment.pet?.species?.name,
        }));

        return appointmentsWithPetAndSpeciesNames;
    } catch (error) {
        console.error("Error fetching appointments:", error);
        throw new Error("Failed to fetch appointments");
    }
}

export async function getAppointmentById(appointmentId: number) {
    try {
        const appointment = await db.appointment.findFirst({
            where: { id: appointmentId, deleted: false }
        });

        if (!appointment) {
            throw new Error("Failed to fetch appointments");
        }

        return appointment;
    } catch (error) {
        console.error("Error fetching appointments:", error);
        throw new Error("Failed to fetch appointments");
    }
}