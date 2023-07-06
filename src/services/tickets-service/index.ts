import { notFoundError, requestError } from "@/errors";
import * as repositoryTicket from "@/repositories/tickets-repository";
import enrollmentRepository from "@/repositories/enrollment-repository";
import { CreateTicket, TicketType, TicketWithTicketType } from "@prisma/client";

export async function getAllTicketsByType() {

  const result = await repositoryTicket.getTicketsPrisma();
  return result;
}

export async function getUserTicket(userId: number): Promise<TicketWithTicketType | null> {
  return searchAndReturnTicket(userId);
}

export async function createTicket(data: CreateTicket, userId: number): Promise<TicketWithTicketType | null> {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) {
    throw notFoundError(); // Lançar o erro correto quando não houver matrícula
  }

  await repositoryTicket.createTicketPrisma(data, enrollment.id);
  return searchAndReturnTicket(userId);
}

async function searchAndReturnTicket(userId: number): Promise<TicketWithTicketType | null> {
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
