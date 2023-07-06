import { AuthenticatedRequest } from "@/middlewares";
import { getPayment, realizePayment } from "@/services/payments-service";
import { PaymentBody } from "@prisma/client";
import { Response } from "express";
import httpStatus from "http-status";

export async function getPaymentsByTicketId(req: AuthenticatedRequest, res: Response) {
    const ticketId = req.query.ticketId as unknown as number;
    const userId = req.userId;

    try {
        const response = await getPayment(Number(ticketId), userId);
        return res.status(httpStatus.OK).send(response);
    } catch (error) {
        if (error.name === "NotFoundError") {
            return res.status(httpStatus.NOT_FOUND).send({
                message: error.message,
            });
        }
        if (error.name === "UnauthorizedError") {
            return res.status(httpStatus.UNAUTHORIZED).send({
                message: error.message,
            });
        }
        if (error.name === "RequestError") {
            return res.status(httpStatus.BAD_REQUEST).send({
                message: error.message,
            });
        }
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
            error: "InternalServerError",
            message: "Internal Server Error",
        });
    }
}

export async function createPaymentSucess(req: AuthenticatedRequest, res: Response) {
    const data = req.body as PaymentBody;
    console.log(data, "data")
    const userId = req.userId;
    try {
        const response = await realizePayment(data, userId);
        return res.status(httpStatus.OK).send(response);
    } catch (error) {
        if (error.name === "NotFoundError") {
            return res.status(httpStatus.NOT_FOUND).send({
                message: error.message,
            });
        }
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
            error: "InternalServerError",
            message: "Internal Server Error",
        });
    }
}