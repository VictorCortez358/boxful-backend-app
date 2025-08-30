import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrdersService {
    constructor(private prisma: PrismaService) { }

    async createOrder(userId: string, createOrderDto: CreateOrderDto) {
        const { products, ...orderData } = createOrderDto;

        const newOrder = await this.prisma.order.create({
            data: {
                ...orderData,
                user: {
                    connect: { id: userId },
                },
                products: {
                    create: products.map((product) => ({
                        length: product.length,
                        height: product.height,
                        width: product.width,
                        weight: product.weight,
                        content: product.content,
                    })),
                },
            },
        });

        return newOrder;
    }

    async findAllByUserId(userId: string) {
        return this.prisma.order.findMany({
            where: { userId },
            include: {
                products: true,
            },
        });
    }

    async findOne(orderId: string, userId: string) {
        const order = await this.prisma.order.findUnique({
            where: { id: orderId, userId },
            include: {
                products: true,
            },
        });

        if (!order) {
            throw new NotFoundException('Orden no encontrada.');
        }

        return order;
    }


}