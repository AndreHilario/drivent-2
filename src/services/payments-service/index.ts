import { Payment, PaymentBody } from '@prisma/client';
import httpStatus from 'http-status';
import { notFoundError, requestError, unauthorizedError } from '@/errors';
import { getPaymentsByTicketIdPrisma } from '@/repositories/payments-repository';
import * as repositoryTicket from '@/repositories/tickets-repository';
import * as repositoryPayment from '@/repositories/payments-repository';

export async function getPayment(ticketId: number, userId: number) {
  if (!ticketId) {
    throw requestError(httpStatus.BAD_REQUEST, 'Missing ticketId');
  }
  const ticket = await repositoryTicket.validateTicket(ticketId);
  if (!ticket) {
    throw notFoundError();
  }

  const userTicket = await repositoryPayment.validateTicketUser(ticketId);
  if (userTicket !== userId) {
    throw unauthorizedError();
  }

  const result = await getPaymentsByTicketIdPrisma(ticketId);
  return result;
}

export async function realizePayment(data: PaymentBody, userId: number) {
  const ticket = await repositoryTicket.validateTicket(data.ticketId);
  if (!ticket) {
    throw notFoundError();
  }

  const userTicket = await repositoryPayment.validateTicketUser(data.ticketId);
  if (userTicket !== userId) {
    throw unauthorizedError();
  }

  const price = await repositoryPayment.getPriceByTicketId(ticket.ticketTypeId);
  if (price) {
    await repositoryPayment.createPaymentPrisma(data, price);
    await repositoryPayment.updateStatus(userId);
  }

  const payment = await repositoryPayment.getPaymentsByTicketIdPrisma(data.ticketId);
  if (!payment) {
    throw notFoundError();
  }

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
