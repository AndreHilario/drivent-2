import { prisma } from '@/config';
import { CreateTicket, TicketWithTicketType } from '@prisma/client';

export async function getTicketsPrisma() {
    return prisma.ticketType.findMany();
}

export async function getUserTicketPrisma(userId: number): Promise<TicketWithTicketType | null> {
    const userTicket = await prisma.ticket.findFirst({
        where: {
            Enrollment: {
                userId: userId,
            },
        },
        include: {
            TicketType: true,
        },
    });

    return userTicket;
}

export async function createTicketPrisma(data: CreateTicket, enrollmentId: number) {
    const ticketTypeId: number = data.ticketTypeId;

    return prisma.ticket.create({
        data: {
            ticketTypeId: ticketTypeId,
            enrollmentId: enrollmentId,
            status: 'RESERVED',
        }
    });
}

