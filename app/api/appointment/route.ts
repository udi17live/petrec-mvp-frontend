import { NextResponse } from 'next/server';
import { db } from '@/lib/db'; 
import { AppointmentData } from '@/types/AppointmentExtended';
import { uploadFile } from '@/actions/fileUpload';

// export async function POST(request: Request) {
//     try {
//         const appointmentData: AppointmentData = await request.json();

//         if (!appointmentData) {
//             return NextResponse.json({ error: "Appointment Data is missing" }, { status: 400 });
//         }

//         if (!appointmentData.audioFile) {
//             return NextResponse.json({ error: "Audio file is missing" }, { status: 400 });
//         }

//         console.log("before existingAppointment");
//         const existingAppointment = await db.appointment.findFirst({
//             where: { id: appointmentData.id }
//         });

//         console.log("existingAppointment: ", existingAppointment);

//         if (!existingAppointment) {
//             return NextResponse.json({ error: "Failed to fetch existing appointment" }, { status: 404 });
//         }

//         // Handle the file upload
//         await uploadFile(existingAppointment.scribeHash, appointmentData.audioFile);

//         // Update appointment
//         const appointment = await db.appointment.update({
//             where: { id: appointmentData.id },
//             data: {
//                 clientName: appointmentData.clientName,
//             }
//         });

//         // Update pet information
//         const petData = appointmentData.pet;
//         const pet = await db.pet.update({
//             where: { id: petData.id },
//             data: {
//                 name: petData.name,
//                 weight: petData.weight,
//             }
//         });

//         return NextResponse.json({ appointment, pet }, { status: 200 });
//     } catch (error) {
//         console.log("Error: ", error);
//         return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
//     }
// }


export async function POST(request: Request) {
    try {
        // Get the form data from the request
        const formData = await request.formData();

        // Extract appointment data from formData
        const appointmentId = formData.get('id') as string; // Assuming ID is sent as a string
        const clientName = formData.get('clientName') as string; // Assuming client name is sent as a string
        const petId = formData.get('petId') as string; // Assuming pet ID is sent as a string
        const petName = formData.get('petName') as string; // Assuming pet name is sent as a string
        const petWeight = formData.get('petWeight') as string; // Assuming pet weight is sent as a string
        const isCompleted = formData.get('isCompleted') === 'true'; // Assuming isCompleted is a string

        const audioFile = formData.get('audioFile') as Blob; // Get the audio file blob

        // Validate required fields
        if (!appointmentId || !audioFile) {
            return NextResponse.json({ error: "Appointment ID or audio file is missing" }, { status: 400 });
        }

        console.log("before existingAppointment");
        const existingAppointment = await db.appointment.findFirst({
            where: { id: Number(appointmentId) }
        });

        console.log("existingAppointment: ", existingAppointment);

        if (!existingAppointment) {
            return NextResponse.json({ error: "Failed to fetch existing appointment" }, { status: 404 });
        }

        // Handle the file upload
        await uploadFile(existingAppointment.scribeHash, audioFile);

        // Update appointment
        const appointment = await db.appointment.update({
            where: { id: Number(appointmentId) },
            data: {
                clientName: clientName,
            }
        });

        // Update pet information
        const pet = await db.pet.update({
            where: { id: Number(petId) },
            data: {
                name: petName,
                weight: Number(petWeight), // Assuming pet weight is a number
            }
        });

        return NextResponse.json({ appointment, pet }, { status: 200 });
    } catch (error) {
        console.log("Error: ", error);
        return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
    }
}