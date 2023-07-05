import { getTickets, getTicketsTypes, postTickets } from "@/controllers";
import { authenticateToken } from "@/middlewares";
import { Router } from "express";

const ticketsRouter = Router();

ticketsRouter.use(authenticateToken);
ticketsRouter.get('/types', getTicketsTypes);
ticketsRouter.get('/', getTickets);
ticketsRouter.post('/', postTickets);

export { ticketsRouter };