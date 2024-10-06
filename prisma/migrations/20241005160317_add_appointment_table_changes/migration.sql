/*
  Warnings:

  - You are about to drop the column `petName` on the `Appointment` table. All the data in the column will be lost.

*/
-- AlterEnum
ALTER TYPE "AppointmentDataProcessingStatus" ADD VALUE 'QUEUED';

-- AlterTable
ALTER TABLE "Appointment" DROP COLUMN "petName";
