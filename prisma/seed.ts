import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
    const hashedPassword = await bcrypt.hash('password123', 10);

    const user = await prisma.user.upsert({
        where: { email: 'testuser@example.com' },
        update: {},
        create: {
            email: 'testuser@example.com',
            password: hashedPassword,
            firstName: 'John',
            lastName: 'Doe',
            gender: 'Masculino',
            birthDate: new Date('1990-01-01'),
            phone: '50377777777',
        },
    });

    console.log(`Usuario de prueba creado: ${user.email}`);

    await prisma.order.createMany({
        data: [
            {
                pickupAddress: 'Colonia Las Magnolias, San Salvador',
                scheduledDate: new Date(),
                destinationAddress: 'Final 49 Av. Sur, San Salvador',
                destinationFirstName: 'Maria',
                destinationLastName: 'Gonzalez',
                destinationEmail: 'maria.gonzalez@example.com',
                destinationPhoneNumber: '50371234567',
                department: 'San Salvador',
                municipality: 'San Salvador',
                referencePoint: 'Frente a parque',
                instructions: 'Llamar al llegar',
                userId: user.id,
            },
            {
                pickupAddress: 'Urbanización El Paraíso, La Libertad',
                scheduledDate: new Date(),
                destinationAddress: 'Avenida La Revolución, San Salvador',
                destinationFirstName: 'Carlos',
                destinationLastName: 'Ramirez',
                destinationEmail: 'carlos.ramirez@example.com',
                destinationPhoneNumber: '50379876543',
                department: 'La Libertad',
                municipality: 'Santa Tecla',
                referencePoint: 'Cerca de la gasolinera',
                instructions: 'Entregar en recepción',
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