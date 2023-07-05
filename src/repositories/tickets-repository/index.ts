import { prisma } from '@/config';

export async function getTicketsPrisma() {
    return prisma.ticketType.findMany();
}