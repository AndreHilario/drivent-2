import { Payment } from '@prisma/client';
import { PaymentBody } from '@/protocols';
import { prisma } from '@/config';

export async function getPaymentsByTicketIdPrisma(ticketId: number): Promise<Payment | null> {
  return prisma.payment.findFirst({
    where: {
      ticketId: ticketId,
    },
  });
}

export async function createPaymentPrisma(data: PaymentBody, price: number): Promise<Payment | null> {
  return prisma.payment.create({
    data: {
      ticketId: data.ticketId,
      value: price,
      cardIssuer: data.cardData.issuer,
      cardLastDigits: data.cardData.number.toString().slice(-4),
    },
  });
}

export async function getPriceByTicketId(ticketId: number): Promise<number | null> {
  const result = await prisma.ticketType.findUnique({
    where: {
      id: ticketId,
    },
  });

  return result?.price || null;
}

export async function updateStatus(userId: number) {
  return prisma.ticket.updateMany({
    where: {
      Enrollment: {
        userId: userId,
      },
    },
    data: {
      status: 'PAID',
    },
  });
}

export async function validateTicketUser(ticketId: number): Promise<number> {
  const userTicket = await prisma.ticket.findFirst({
    where: {
      id: ticketId,
    },
    include: {
      Enrollment: true,
    },
  });

  return userTicket?.Enrollment.userId;
}
