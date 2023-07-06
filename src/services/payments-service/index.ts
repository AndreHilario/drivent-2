import { notFoundError, requestError, unauthorizedError } from "@/errors";
import { getPaymentsByTicketIdPrisma } from "@/repositories/payments-repository";
import * as repositoryTicket from "@/repositories/tickets-repository";
import * as repositoryPayment from "@/repositories/payments-repository";
import { Payment, PaymentBody } from "@prisma/client";
import httpStatus from "http-status";

export async function getPayment(ticketId: number, userId: number) {
    if (!ticketId) {
        throw requestError(httpStatus.BAD_REQUEST, "Missing ticketId");
    }

    const ticket = await repositoryTicket.getUserTicketPrisma(userId);
    if (ticket) {
        if (ticket.Enrollment.userId !== userId) {
            throw unauthorizedError();
        }

        if (ticket.id !== ticketId) {
            throw notFoundError();
        }
    } else if (!ticket) {
        throw notFoundError();
    }

    const result = await getPaymentsByTicketIdPrisma(ticketId);
    return result;
}

export async function realizePayment(data: PaymentBody, userId: number) {
    const ticket = await repositoryTicket.getUserTicketPrisma(userId);
    if (!ticket) {
        return notFoundError();
    }
    await repositoryPayment.createPaymentPrisma(data);
    await repositoryPayment.updateStatus(userId);

    const payment = await repositoryPayment.getPaymentsByTicketIdPrisma(data.ticketId);

    const paymentInfo: Payment = {
        id: payment.id,
        ticketId: payment.ticketId,
        value: payment.value,
        cardIssuer: payment.cardIssuer,
        cardLastDigits: payment.cardLastDigits,
        createdAt: payment.createdAt,
        updatedAt: payment.updatedAt,
    };

    return paymentInfo;
}

