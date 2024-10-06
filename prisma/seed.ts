import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { env } from 'process';
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();

async function main() {
    const hashedPassword = await bcrypt.hash(process.env.SAMPLE_SEED_PASSWORD as string, 10);

    // Create users
    const user1 = await prisma.user.upsert({
        where: { email: 'niel@scribe.com' },
        update: {},
        create: {
            email: 'niel@scribe.com',
            password: hashedPassword,
            name: 'Dr. Niel Williams',
        }
    });
    const user2 = await prisma.user.upsert({
        where: { email: 'jane@scribe.com' },
        update: {},
        create: {
            email: 'jane@scribe.com',
            password: hashedPassword,
            name: 'Dr. Jane Henderson',
        }
    });
    const user3 = await prisma.user.upsert({
        where: { email: 'trisha@scribe.com' },
        update: {},
        create: {
            email: 'trisha@scribe.com',
            password: hashedPassword,
            name: 'Dr. Trisha Patel',
        }
    });

    // Create sessions for the users
    await prisma.session.createMany({
        data: [
            {
                userId: user1.id,
                sessionToken: uuidv4(),
            },
            {
                userId: user2.id,
                sessionToken: uuidv4(),
            },
            {
                userId: user3.id,
                sessionToken: uuidv4(),
            }
        ],
    });

    console.log('Users and sessions created');
}

main()
    .catch((e) => console.error(e))
    .finally(async () => {
        await prisma.$disconnect();
    });