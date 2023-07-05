import { prisma } from "@/config";
import { Payment, PaymentBody } from "@prisma/client";

export async function getPaymentsByTicketIdPrisma(ticketId: number): Promise<Payment | null> {

    return prisma.payment.findFirst({
        where: {
            ticketId: ticketId
        },
    });
}

export async function createPaymentPrisma(data: PaymentBody) {

    return prisma.payment.create({
        data: {
            ticketId: data.ticketId,
            value: 100,
            cardIssuer: data.cardData.issuer,
            cardLastDigits: data.cardData.number.toString().slice(-4),
        }
    })

}