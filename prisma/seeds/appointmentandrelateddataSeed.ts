import { AppointmentDataProcessingStatus, AppointmentStatus, BookingPlatform, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {

    console.log("Started Species Seeding");
    const dog = await prisma.species.create({
        data: {
            name: 'Dog'
        }
    });
    const cat = await prisma.species.create({
        data: {
            name: 'Cat'
        }
    });
    const parrot = await prisma.species.create({
        data: {
            name: 'Parrot'
        }
    });
    const hamster = await prisma.species.create({
        data: {
            name: 'Hamster'
        }
    });
    console.log("Completed Species Seeding");

    console.log("Started Pet Seeding");
    const max = await prisma.pet.create({
        data: {
            name: 'Max',
            dateOfBirth: new Date('2022-03-15T09:00:00Z'),
            weight: 13.6,
            speciesId: dog.id
        }
    });
    const bella = await prisma.pet.create({
        data: {
            name: 'Bella',
            dateOfBirth: new Date('2021-05-22'),
            weight: 25.0,
            speciesId: dog.id,
        },
    });

    // Create Cat
    const whiskers = await prisma.pet.create({
        data: {
            name: 'Whiskers',
            dateOfBirth: new Date('2020-11-10'),
            weight: 10.0,
            speciesId: cat.id,
        },
    });

    const luna = await prisma.pet.create({
        data: {
            name: 'Luna',
            dateOfBirth: new Date('2022-01-05'),
            weight: 8.0,
            speciesId: cat.id,
        },
    });

    // Create Parrot
    const kiwi = await prisma.pet.create({
        data: {
            name: 'Kiwi',
            dateOfBirth: new Date('2021-07-18'),
            weight: 0.14,
            speciesId: parrot.id,
        },
    });

    const rio = await prisma.pet.create({
        data: {
            name: 'Rio',
            dateOfBirth: new Date('2022-09-10'),
            weight: 0.17,
            speciesId: parrot.id,
        },
    });

    // Create Hamster
    const nibbles = await prisma.pet.create({
        data: {
            name: 'Nibbles',
            dateOfBirth: new Date('2023-03-01'),
            weight: 0.23,
            speciesId: hamster.id,
        },
    });

    const peanut = await prisma.pet.create({
        data: {
            name: 'Peanut',
            dateOfBirth: new Date('2023-04-20'),
            weight: 0.18,
            speciesId: hamster.id,
        },
    });

    console.log("Completed Pet Seeding");


    async function createAppointments() {
        const appointmentsData = [
            {
                id: 1,
                clientName: "John Doe",
                clientEmail: "john@example.com",
                doctorId: 1,
                petId: max.id,
                platform: BookingPlatform.ONLINE,
                appointmentType: "Sick",
                startTime: new Date("2024-10-01T09:00:00Z"),
                endTime: new Date("2024-10-01T09:30:00Z"),
                statusId: AppointmentStatus.COMPLETED,
                dataProcessingStatus: AppointmentDataProcessingStatus.COMPLETED,
            },
            {
                id: 2,
                clientName: "Jane Smith",
                clientEmail: "jane@example.com",
                doctorId: 2,
                petId: bella.id,
                platform: BookingPlatform.DIRECT,
                appointmentType: "Surgery",
                startTime: new Date("2024-10-02T10:00:00Z"),
                endTime: new Date("2024-10-02T10:30:00Z"),
                statusId: AppointmentStatus.COMPLETED,
                dataProcessingStatus: AppointmentDataProcessingStatus.COMPLETED,
            },
            {
                id: 3,
                clientName: "Emily Johnson",
                clientEmail: "emily@example.com",
                doctorId: 3,
                petId: whiskers.id,
                platform: BookingPlatform.ONLINE,
                appointmentType: "Grooming",
                startTime: new Date("2024-10-03T11:00:00Z"),
                endTime: new Date("2024-10-03T11:30:00Z"),
                statusId: AppointmentStatus.COMPLETED,
                dataProcessingStatus: AppointmentDataProcessingStatus.COMPLETED,
            },
            {
                id: 4,
                clientName: "Michael Brown",
                clientEmail: "michael@example.com",
                doctorId: 1,
                petId: luna.id,
                platform: BookingPlatform.DIRECT,
                appointmentType: "Sick",
                startTime: new Date("2024-10-24T09:00:00Z"),
                endTime: new Date("2024-10-24T09:30:00Z"),
                statusId: AppointmentStatus.UPCOMING,
                dataProcessingStatus: AppointmentDataProcessingStatus.PENDING,
            },
            {
                id: 5,
                clientName: "Sophia Davis",
                clientEmail: "sophia@example.com",
                doctorId: 2,
                petId: kiwi.id,
                platform: BookingPlatform.ONLINE,
                appointmentType: "Surgery",
                startTime: new Date("2024-10-25T10:00:00Z"),
                endTime: new Date("2024-10-25T10:30:00Z"),
                statusId: AppointmentStatus.UPCOMING,
                dataProcessingStatus: AppointmentDataProcessingStatus.PENDING,
            },
            {
                id: 6,
                clientName: "Oliver Wilson",
                clientEmail: "oliver@example.com",
                doctorId: 3,
                petId: rio.id,
                platform: BookingPlatform.DIRECT,
                appointmentType: "Grooming",
                startTime: new Date("2024-10-26T11:00:00Z"),
                endTime: new Date("2024-10-26T11:30:00Z"),
                statusId: AppointmentStatus.UPCOMING,
                dataProcessingStatus: AppointmentDataProcessingStatus.PENDING,
            },
            {
                id: 7,
                clientName: "Mia Taylor",
                clientEmail: "mia@example.com",
                doctorId: 1,
                petId: max.id,
                platform: BookingPlatform.ONLINE,
                appointmentType: "Sick",
                startTime: new Date("2024-10-27T12:00:00Z"),
                endTime: new Date("2024-10-27T12:30:00Z"),
                statusId: AppointmentStatus.UPCOMING,
                dataProcessingStatus: AppointmentDataProcessingStatus.PENDING,
            },
            {
                id: 8,
                clientName: "Liam Garcia",
                clientEmail: "liam@example.com",
                doctorId: 2,
                petId: bella.id,
                platform: BookingPlatform.DIRECT,
                appointmentType: "Surgery",
                startTime: new Date("2024-10-28T13:00:00Z"),
                endTime: new Date("2024-10-28T13:30:00Z"),
                statusId: AppointmentStatus.UPCOMING,
                dataProcessingStatus: AppointmentDataProcessingStatus.PENDING,
            },
            {
                id: 9,
                clientName: "Ethan Martinez",
                clientEmail: "ethan@example.com",
                doctorId: 3,
                petId: whiskers.id,
                platform: BookingPlatform.ONLINE,
                appointmentType: "Grooming",
                startTime: new Date("2024-10-29T14:00:00Z"),
                endTime: new Date("2024-10-29T14:30:00Z"),
                statusId: AppointmentStatus.UPCOMING,
                dataProcessingStatus: AppointmentDataProcessingStatus.PENDING,
            },
            {
                id: 10,
                clientName: "Lucas Anderson",
                clientEmail: "lucas@example.com",
                doctorId: 1,
                petId: luna.id,
                platform: BookingPlatform.DIRECT,
                appointmentType: "Sick",
                startTime: new Date("2024-10-30T09:00:00Z"),
                endTime: new Date("2024-10-30T09:30:00Z"),
                statusId: AppointmentStatus.UPCOMING,
                dataProcessingStatus: AppointmentDataProcessingStatus.PENDING,
            },
            {
                id: 11,
                clientName: "Ava Thomas",
                clientEmail: "ava@example.com",
                doctorId: 2,
                petId: kiwi.id,
                platform: BookingPlatform.ONLINE,
                appointmentType: "Surgery",
                startTime: new Date("2024-10-31T10:00:00Z"),
                endTime: new Date("2024-10-31T10:30:00Z"),
                statusId: AppointmentStatus.UPCOMING,
                dataProcessingStatus: AppointmentDataProcessingStatus.PENDING,
            },
            {
                id: 12,
                clientName: "Isabella Lee",
                clientEmail: "isabella@example.com",
                doctorId: 3,
                petId: rio.id,
                platform: BookingPlatform.DIRECT,
                appointmentType: "Grooming",
                startTime: new Date("2024-11-01T11:00:00Z"),
                endTime: new Date("2024-11-01T11:30:00Z"),
                statusId: AppointmentStatus.UPCOMING,
                dataProcessingStatus: AppointmentDataProcessingStatus.PENDING,
            },
            {
                id: 13,
                clientName: "Charlotte White",
                clientEmail: "charlotte@example.com",
                doctorId: 1,
                petId: max.id,
                platform: BookingPlatform.ONLINE,
                appointmentType: "Sick",
                startTime: new Date("2024-11-02T12:00:00Z"),
                endTime: new Date("2024-11-02T12:30:00Z"),
                statusId: AppointmentStatus.UPCOMING,
                dataProcessingStatus: AppointmentDataProcessingStatus.PENDING,
            },
            {
                id: 14,
                clientName: "Amelia Harris",
                clientEmail: "amelia@example.com",
                doctorId: 2,
                petId: bella.id,
                platform: BookingPlatform.DIRECT,
                appointmentType: "Surgery",
                startTime: new Date("2024-11-03T13:00:00Z"),
                endTime: new Date("2024-11-03T13:30:00Z"),
                statusId: AppointmentStatus.UPCOMING,
                dataProcessingStatus: AppointmentDataProcessingStatus.PENDING,
            },
            {
                id: 15,
                clientName: "Mason Clark",
                clientEmail: "mason@example.com",
                doctorId: 3,
                petId: whiskers.id,
                platform: BookingPlatform.ONLINE,
                appointmentType: "Grooming",
                startTime: new Date("2024-11-04T14:00:00Z"),
                endTime: new Date("2024-11-04T14:30:00Z"),
                statusId: AppointmentStatus.UPCOMING,
                dataProcessingStatus: AppointmentDataProcessingStatus.PENDING,
            },
            {
                id: 16,
                clientName: "Harper Lewis",
                clientEmail: "harper@example.com",
                doctorId: 1,
                petId: luna.id,
                platform: BookingPlatform.DIRECT,
                appointmentType: "Sick",
                startTime: new Date("2024-11-05T09:00:00Z"),
                endTime: new Date("2024-11-05T09:30:00Z"),
                statusId: AppointmentStatus.UPCOMING,
                dataProcessingStatus: AppointmentDataProcessingStatus.PENDING,
            },
            {
                id: 17,
                clientName: "Evelyn Walker",
                clientEmail: "evelyn@example.com",
                doctorId: 2,
                petId: kiwi.id,
                platform: BookingPlatform.ONLINE,
                appointmentType: "Surgery",
                startTime: new Date("2024-11-06T10:00:00Z"),
                endTime: new Date("2024-11-06T10:30:00Z"),
                statusId: AppointmentStatus.UPCOMING,
                dataProcessingStatus: AppointmentDataProcessingStatus.PENDING,
            },
            {
                id: 18,
                clientName: "James Hall",
                clientEmail: "james@example.com",
                doctorId: 3,
                petId: rio.id,
                platform: BookingPlatform.DIRECT,
                appointmentType: "Grooming",
                startTime: new Date("2024-11-07T11:00:00Z"),
                endTime: new Date("2024-11-07T11:30:00Z"),
                statusId: AppointmentStatus.UPCOMING,
                dataProcessingStatus: AppointmentDataProcessingStatus.PENDING,
            },
            {
                id: 19,
                clientName: "Benjamin Allen",
                clientEmail: "benjamin@example.com",
                doctorId: 1,
                petId: max.id,
                platform: BookingPlatform.ONLINE,
                appointmentType: "Sick",
                startTime: new Date("2024-11-08T12:00:00Z"),
                endTime: new Date("2024-11-08T12:30:00Z"),
                statusId: AppointmentStatus.UPCOMING,
                dataProcessingStatus: AppointmentDataProcessingStatus.PENDING,
            },
            {
                id: 20,
                clientName: "Elijah Young",
                clientEmail: "elijah@example.com",
                doctorId: 2,
                petId: bella.id,
                platform: BookingPlatform.DIRECT,
                appointmentType: "Surgery",
                startTime: new Date("2024-11-09T13:00:00Z"),
                endTime: new Date("2024-11-09T13:30:00Z"),
                statusId: AppointmentStatus.UPCOMING,
                dataProcessingStatus: AppointmentDataProcessingStatus.PENDING,
            },
            {
                id: 21,
                clientName: "Logan Hernandez",
                clientEmail: "logan@example.com",
                doctorId: 3,
                petId: whiskers.id,
                platform: BookingPlatform.ONLINE,
                appointmentType: "Grooming",
                startTime: new Date("2024-11-10T14:00:00Z"),
                endTime: new Date("2024-11-10T14:30:00Z"),
                statusId: AppointmentStatus.UPCOMING,
                dataProcessingStatus: AppointmentDataProcessingStatus.PENDING,
            },
        ];

        for (const appointment of appointmentsData) {
            await prisma.appointment.upsert({
                where: { id: appointment.id },
                update: {},
                create: appointment,
            });
        }
    }
    console.log("Started Appointment Seeding");
    createAppointments()
    console.log("Completed Appointment Seeding");

}

main()
    .catch((e) => console.error(e))
    .finally(async () => {
        await prisma.$disconnect();

    });
