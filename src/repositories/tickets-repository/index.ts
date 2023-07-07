import { CreateTicket, Ticket, TicketWithTicketType } from '@prisma/client';
import { prisma } from '@/config';

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
      Enrollment: true,
    },
  });

  return userTicket;
}

export async function createTicketPrisma(data: CreateTicket, enrollmentId: number): Promise<Ticket> {
  const ticketTypeId: number = data.ticketTypeId;

  return prisma.ticket.create({
    data: {
      ticketTypeId: ticketTypeId,
      enrollmentId: enrollmentId,
      status: 'RESERVED',
    },
  });
}

export async function validateTicket(ticketId: number): Promise<Ticket | null> {
  const ticket = await prisma.ticket.findUnique({
    where: {
      id: ticketId,
    },
  });

  return ticket;
}
