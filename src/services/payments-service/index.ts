import { notFoundError, requestError, unauthorizedError } from "@/errors";
import { getPaymentsByTicketIdPrisma } from "@/repositories/payments-repository";
import * as repositoryTicket from "@/repositories/tickets-repository";
import { PaymentBody } from "@prisma/client";
import httpStatus from "http-status";

export async function getPayment(ticketId: number, userId: number) {
    if (!ticketId) {
        throw requestError(httpStatus.BAD_REQUEST, "Missing ticketId");
    }

    const result = await getPaymentsByTicketIdPrisma(ticketId);

    if (!result) {
        throw notFoundError(); // Retorna status 404 se o ticketId não existe
    }

    const ticket = await repositoryTicket.getUserTicketPrisma(userId);

    if (!ticket || ticket.id !== ticketId) {
        throw unauthorizedError(); // Retorna status 401 se o ticketId não está associado ao usuário
    }

    return result;
}

export async function realizePayment(data: PaymentBody) {

}

