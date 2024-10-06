-- CreateEnum
CREATE TYPE "AppointmentStatus" AS ENUM ('COMPLETED', 'INPROGRESS', 'UPCOMING');

-- CreateEnum
CREATE TYPE "AppointmentDataProcessingStatus" AS ENUM ('COMPLETED', 'PENDING', 'ERROR');

-- CreateEnum
CREATE TYPE "BookingPlatform" AS ENUM ('ONLINE', 'DIRECT');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "deleted" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "Appointment" (
    "id" SERIAL NOT NULL,
    "scribeHash" VARCHAR(255) NOT NULL,
    "clientName" VARCHAR(400) NOT NULL,
    "petName" VARCHAR(200) NOT NULL,
    "clientEmail" VARCHAR(200) NOT NULL,
    "doctorId" INTEGER NOT NULL,
    "petId" INTEGER NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "platform" "BookingPlatform" NOT NULL DEFAULT 'ONLINE',
    "appointmentType" VARCHAR(200) NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,
    "statusId" "AppointmentStatus" NOT NULL DEFAULT 'UPCOMING',
    "dataProcessingStatus" "AppointmentDataProcessingStatus" NOT NULL DEFAULT 'COMPLETED',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Appointment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Species" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Species_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pet" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(200) NOT NULL,
    "dateOfBirth" TIMESTAMP(3),
    "weight" DOUBLE PRECISION NOT NULL,
    "speciesId" INTEGER NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Pet_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Appointment_scribeHash_key" ON "Appointment"("scribeHash");

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_petId_fkey" FOREIGN KEY ("petId") REFERENCES "Pet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pet" ADD CONSTRAINT "Pet_speciesId_fkey" FOREIGN KEY ("speciesId") REFERENCES "Species"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
