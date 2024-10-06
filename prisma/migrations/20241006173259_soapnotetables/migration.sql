-- CreateTable
CREATE TABLE "Soapnote" (
    "id" SERIAL NOT NULL,
    "appointmentId" INTEGER NOT NULL,
    "summary" TEXT NOT NULL,

    CONSTRAINT "Soapnote_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Subjectivenote" (
    "id" SERIAL NOT NULL,
    "soapNoteId" INTEGER NOT NULL,
    "chiefComplaint" TEXT NOT NULL,
    "historyOfPresentIllness" TEXT NOT NULL,
    "behaviouralAndDietaryChanges" TEXT NOT NULL,
    "priorMedicalHistory" TEXT NOT NULL,

    CONSTRAINT "Subjectivenote_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Objectivenote" (
    "id" SERIAL NOT NULL,
    "soapNoteId" INTEGER NOT NULL,
    "vitalSigns" TEXT NOT NULL,
    "physicalExaminationFindings" TEXT NOT NULL,
    "diagonosticTestResults" TEXT NOT NULL,
    "measurementsAndObservations" TEXT NOT NULL,

    CONSTRAINT "Objectivenote_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Assesmentnote" (
    "id" SERIAL NOT NULL,
    "soapNoteId" INTEGER NOT NULL,
    "primaryDiagnosis" TEXT NOT NULL,
    "differentialDiagnoses" TEXT NOT NULL,
    "prognosis" TEXT NOT NULL,

    CONSTRAINT "Assesmentnote_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Plannote" (
    "id" SERIAL NOT NULL,
    "soapNoteId" INTEGER NOT NULL,
    "treatmentPlan" TEXT NOT NULL,
    "dietaryRecommendations" TEXT NOT NULL,
    "ownerInstructions" TEXT NOT NULL,
    "followupCare" TEXT NOT NULL,

    CONSTRAINT "Plannote_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Soapnote_appointmentId_key" ON "Soapnote"("appointmentId");

-- CreateIndex
CREATE UNIQUE INDEX "Subjectivenote_soapNoteId_key" ON "Subjectivenote"("soapNoteId");

-- CreateIndex
CREATE UNIQUE INDEX "Objectivenote_soapNoteId_key" ON "Objectivenote"("soapNoteId");

-- CreateIndex
CREATE UNIQUE INDEX "Assesmentnote_soapNoteId_key" ON "Assesmentnote"("soapNoteId");

-- CreateIndex
CREATE UNIQUE INDEX "Plannote_soapNoteId_key" ON "Plannote"("soapNoteId");

-- AddForeignKey
ALTER TABLE "Soapnote" ADD CONSTRAINT "Soapnote_appointmentId_fkey" FOREIGN KEY ("appointmentId") REFERENCES "Appointment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subjectivenote" ADD CONSTRAINT "Subjectivenote_soapNoteId_fkey" FOREIGN KEY ("soapNoteId") REFERENCES "Soapnote"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Objectivenote" ADD CONSTRAINT "Objectivenote_soapNoteId_fkey" FOREIGN KEY ("soapNoteId") REFERENCES "Soapnote"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Assesmentnote" ADD CONSTRAINT "Assesmentnote_soapNoteId_fkey" FOREIGN KEY ("soapNoteId") REFERENCES "Soapnote"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Plannote" ADD CONSTRAINT "Plannote_soapNoteId_fkey" FOREIGN KEY ("soapNoteId") REFERENCES "Soapnote"("id") ON DELETE CASCADE ON UPDATE CASCADE;
