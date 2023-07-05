import { notFoundError, requestError } from "@/errors";
import * as repositoryTicket from "@/repositories/tickets-repository";
import { CreateTicket, TicketType, TicketWithTicketType } from "@prisma/client";
import httpStatus from "http-status";

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
  const createdTicket = await repositoryTicket.createTicketPrisma(data, userId);

  if (createdTicket) {
    const result = await repositoryTicket.getUserTicketPrisma(userId);

    if (!result) {
      throw notFoundError(); // Retorna status 404 se o usuário não tem matrícula
    }

    const { id, status, ticketTypeId, enrollmentId, createdAt, updatedAt, TicketType } = result;

    if (!TicketType) {
      throw notFoundError(); // Retorna status 404 se o tipo de ingresso não existe
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
      id: id,
      status,
      ticketTypeId,
      enrollmentId,
      TicketType: ticketType,
      createdAt,
      updatedAt,
    };

    return ticketWithTicketType;
  } else {
    throw requestError(httpStatus.BAD_REQUEST, ""); // Retorna status 400 se não foi possível criar o ingresso
  }
}
