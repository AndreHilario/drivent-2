import { notFoundError, requestError } from "@/errors";
import * as repositoryTicket from "@/repositories/tickets-repository";
import enrollmentRepository from "@/repositories/enrollment-repository";
import { CreateTicket, TicketType, TicketWithTicketType } from "@prisma/client";
import httpStatus from "http-status";
import { number } from "joi";

export async function getAllTicketsByType() {

  const result = await repositoryTicket.getTicketsPrisma();
  return result;
}

export async function getUserTicket(userId: number): Promise<TicketWithTicketType | null> {
  const ticket = await repositoryTicket.getUserTicketPrisma(userId);

  if (!ticket) {
    throw notFoundError();
  }

  const { id, status, ticketTypeId, enrollmentId, createdAt, updatedAt, TicketType } = ticket;

  if (!TicketType) {
    throw notFoundError();
  }

  const ticketType: TicketType = {
    id: TicketType.id,
    name: TicketType.name,
    price: TicketType.price,
    isRemote: TicketType.isRemote,
    includesHotel: TicketType.includesHotel,
    createdAt: TicketType.createdAt,
    updatedAt: TicketType.updatedAt,
  };

  const ticketWithTicketType: TicketWithTicketType = {
    id,
    status,
    ticketTypeId,
    enrollmentId,
    TicketType: ticketType,
    createdAt,
    updatedAt,
  };

  return ticketWithTicketType;
}

export async function createTicket(data: CreateTicket, userId: number) {
  const ticket = await repositoryTicket.getUserTicketPrisma(userId);
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);

  if (!enrollment) {
    throw notFoundError(); // Lançar o erro correto quando não houver matrícula
  }

  await repositoryTicket.createTicketPrisma(data, enrollment.id);

  if (!ticket) {
    throw notFoundError();
  }

  const { id, status, ticketTypeId, enrollmentId, createdAt, updatedAt, TicketType } = ticket;

  if (!TicketType) {
    throw requestError(httpStatus.BAD_REQUEST, "");
  }

  const ticketType: TicketType = {
    id: TicketType.id,
    name: TicketType.name,
    price: TicketType.price,
    isRemote: TicketType.isRemote,
    includesHotel: TicketType.includesHotel,
    createdAt: TicketType.createdAt,
    updatedAt: TicketType.updatedAt,
  };

  const ticketWithTicketType: TicketWithTicketType = {
    id,
    status,
    ticketTypeId,
    enrollmentId,
    TicketType: ticketType,
    createdAt,
    updatedAt,
  };

  return ticketWithTicketType;
}
