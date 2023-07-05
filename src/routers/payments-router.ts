import { createPaymentSucess, getPaymentsByTicketId } from "@/controllers/payments-controller";
import { authenticateToken } from "@/middlewares";
import { Router } from "express";

const paymentsRouter = Router();

paymentsRouter.use(authenticateToken);
paymentsRouter.get("", getPaymentsByTicketId);
paymentsRouter.post("/process", createPaymentSucess);

export { paymentsRouter };