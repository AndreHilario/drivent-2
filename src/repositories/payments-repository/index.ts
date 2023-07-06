import { prisma } from "@/config";
import { Payment, PaymentBody } from "@prisma/client";

export async function getPaymentsByTicketIdPrisma(ticketId: number): Promise<Payment | null> {

    return prisma.payment.findFirst({
        where: {
            ticketId: ticketId
        },
    });
}

export async function createPaymentPrisma(data: PaymentBody): Promise<Payment | null> {

    return prisma.payment.create({
        data: {
            ticketId: data.ticketId,
            value: 250,
            cardIssuer: data.cardData.issuer,
            cardLastDigits: data.cardData.number.toString().slice(-4),
        },
    })

}

export async function updateStatus(userId: number) {

    return prisma.ticket.updateMany({
        where: {
            Enrollment: {
                userId: userId
            },
        },
        data: {
            status: 'PAID',
        },
    });

}