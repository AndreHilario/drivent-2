import { getTickets, getTicketsTypes, postTickets } from "@/controllers";
import { authenticateToken, validateBody } from "@/middlewares";
import { ticketSchema } from "@/schemas";
import { Router } from "express";

const ticketsRouter = Router();

ticketsRouter.use(authenticateToken);
ticketsRouter.get('/types', getTicketsTypes);
ticketsRouter.get('/', getTickets);
ticketsRouter.post('/', validateBody(ticketSchema), postTickets);

export { ticketsRouter };