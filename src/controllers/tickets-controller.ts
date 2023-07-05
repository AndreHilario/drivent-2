import { AuthenticatedRequest } from "@/middlewares";
import { Response, Request } from "express";
import * as ticketService from "../services/tickets-service/index"
import httpStatus from "http-status";

export async function getTicketsTypes(req: Request, res: Response) {
    try {
        const response = await ticketService.getAllTicketsByType();
        res.status(200).send(response);
    } catch (error) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error.message);
    }
}

export async function getTickets(req: AuthenticatedRequest, res: Response) {

}

export async function postTickets(req: AuthenticatedRequest, res: Response) {

}