import { Payment, PaymentBody } from '@prisma/client';
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

export async function getPriceByTicketId(ticketId: number) {
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
