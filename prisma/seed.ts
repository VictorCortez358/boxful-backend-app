import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
    const hashedPassword = await bcrypt.hash('password123', 10);

    // Crear un usuario de prueba
    const user = await prisma.user.upsert({
        where: { email: 'testuser@example.com' },
        update: {},
        create: {
            email: 'testuser@example.com',
            password: hashedPassword,
            firstName: 'John',
            lastName: 'Doe',
        },
    });

    console.log(`Usuario de prueba creado: ${user.email}`);

    // Crear órdenes de prueba para el usuario
    await prisma.order.createMany({
        data: [
            {
                pickupAddress: 'Colonia Las Magnolias, San Salvador',
                scheduledDate: new Date(),
                destinationAddress: 'Final 49 Av. Sur, San Salvador',
                userId: user.id,
            },
            {
                pickupAddress: 'Urbanización El Paraíso, La Libertad',
                scheduledDate: new Date(),
                destinationAddress: 'Avenida La Revolución, San Salvador',
                userId: user.id,
            },
        ],
    });

    console.log('Órdenes de prueba creadas.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
