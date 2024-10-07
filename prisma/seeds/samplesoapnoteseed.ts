import { AppointmentDataProcessingStatus, AppointmentStatus, BookingPlatform, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {

    const summary = "During today's visit, we addressed your dog's recent symptoms of vomiting and diarrhea, which began after she ate a little bit of roast beef. It's possible this could have irritated her pancreas, a condition known as pancreatitis, though she's feeling better now and has started eating again. We conducted a thorough examination, checking for any other underlying issues. Her ears, heart, and lungs are in good condition, though there are signs of dental disease and mild age-related cataracts. Additionally, she exhibits allergies, leading to paw licking and redness in her eyes. We recommend using an eye ointment with a steroid to help manage these symptoms. Also, the fatty lumps on her body are likely harmless lipomas, which you should monitor for any changes.\n\nTo support her comfort, we're administering two injections today: Librella for arthritis pain and Cytopoint for her allergies. Consider performing a senior health panel to get a comprehensive overview, including a pancreatic test, to investigate any potential underlying issues further. Meanwhile, keep an eye out for new lumps or changes in her behavior. If vomiting resumes, x-rays might be considered. Please feel free to contact us if any additional concerns or questions arise.";

    console.log("Creating SOAP note.")
    const soapnote = await prisma.soapnote.upsert({
        where: { appointmentId: 15 },
        update: {},
        create: {
            summary: JSON.stringify(summary),
            appointmentId: 15
        }
    });
    console.log("Created SOAP note.")

    console.log("Creating Subjective Note")
    const subNote = {
        "Chief Complaint": "The dog was vomiting and had diarrhea on Friday night and early Saturday morning.",
        "History of Present Illness": "The dog experienced vomiting and a small amount of diarrhea on Friday night and early Saturday morning. She refused food on Sunday morning but ate some chicken by Sunday night. Currently, she appears to be feeling better.",
        "Behavioral & Dietary Changes": "The dog got into roast beef, which is suspected to have caused an upset stomach. She is also licking and chewing her paws frequently, possibly due to allergies.",
        "Prior Medical History": "The dog has a previous history of undergoing surgery for a cherry eye. She is also on librella for arthritis pain management and has a history of bumps identified as likely lipomas."
    }

    const subjectiveNote = await prisma.subjectivenote.upsert({
        where: { soapNoteId: soapnote.id },
        update: {},
        create: {
            soapNoteId: soapnote.id,
            chiefComplaint: JSON.stringify(subNote['Chief Complaint']),
            historyOfPresentIllness: JSON.stringify(subNote['History of Present Illness']),
            behaviouralAndDietaryChanges: JSON.stringify(subNote['Behavioral & Dietary Changes']),
            priorMedicalHistory: JSON.stringify(subNote['Prior Medical History'])
        }
    });
    console.log("Created Subjective Note")

    console.log("Creating Objective Note")

    const objNote = {
        "Vital Signs": {
            "Temperature": "102°F",
            "Heart Rate": "Missing",
            "Respiratory Rate": "Missing",
            "Weight": "Missing",
            "Mucous Membrane Color": "Missing",
            "Capillary Refill Time": "Missing",
            "Body Condition Score": "Missing"
        },
        "Physical Examination Findings": [
            "Significant dental disease with gum recession and potential hair entrapment.",
            "Mild age-related cataracts and inflamed conjunctiva in both eyes.",
            "Ears appeared healthy.",
            "Heart and lungs sounded normal.",
            "Abdominal tightness in the front area where the pancreas is located.",
            "Soft bumps possibly lipomas around the head and front legs."
        ],
        "Diagnostic Test Results": "Missing",
        "Measurements and Observations": "Missing"
    }

    const objectiveNote = await prisma.objectivenote.upsert({
        where: { soapNoteId: soapnote.id },
        update: {},
        create: {
            soapNoteId: soapnote.id,
            vitalSigns: JSON.stringify(objNote['Vital Signs']),
            physicalExaminationFindings: JSON.stringify(objNote['Physical Examination Findings']),
            diagonosticTestResults: JSON.stringify(objNote['Diagnostic Test Results']),
            measurementsAndObservations: JSON.stringify(objNote['Measurements and Observations'])
        }
    });

    console.log("Created Objective Note")

    console.log("Creating Assesment Note")

    const asmntNote = {
        "Primary Diagnosis": "Possible flare-up of pancreatitis or gastroenteritis.",
        "Differential Diagnoses": [
            "Gastroenteritis",
            "Pancreatitis",
            "Possible allergies leading to paw licking and chewing"
        ],
        "Prognosis": "Good if dietary management is followed and further diagnostics confirm."
    }

    const assesmentNote = await prisma.assesmentnote.upsert({
        where: { soapNoteId: soapnote.id },
        update: {},
        create: {
            soapNoteId: soapnote.id,
            primaryDiagnosis: JSON.stringify(asmntNote['Primary Diagnosis']),
            differentialDiagnoses: JSON.stringify(asmntNote['Differential Diagnoses']),
            prognosis: JSON.stringify(asmntNote['Prognosis'])
        }
    });
    console.log("Created Assesment Note")

    console.log("Creating Plan Note")

    const plnNote = {
        "Treatment Plan": [
          "Administer eye ointment containing steroids to reduce eye inflammation.",
          "Administer librella injection for arthritis and cytopoint injection to help with allergies."
        ],
        "Dietary Recommendations": "Avoid giving the dog roast beef or other high-fat foods.",
        "Owner Instructions": [
          "Monitor the dog for any new growths or changes in existing bumps.",
          "Observe paws for increased redness or sores."
        ],
        "Follow-up Care": "Recommend a senior panel with a pancreatic test to evaluate overall health. Consider further diagnostics such as x-rays if vomiting recurs."
      }

      const planNote = await prisma.plannote.upsert({
        where: { soapNoteId: soapnote.id },
        update: {},
        create: {
            soapNoteId: soapnote.id,
            treatmentPlan: JSON.stringify(plnNote['Treatment Plan']),
            dietaryRecommendations: JSON.stringify(plnNote['Dietary Recommendations']),
            ownerInstructions: JSON.stringify(plnNote['Owner Instructions']),
            followupCare: JSON.stringify(plnNote['Follow-up Care'])
        }
    });

    console.log("Created Plan Note")
}

main()
    .catch((e) => console.error(e))
    .finally(async () => {
        await prisma.$disconnect();

    });