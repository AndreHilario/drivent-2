import { createPaymentSucess, getPaymentsByTicketId } from "@/controllers/payments-controller";
import { authenticateToken, validateBody } from "@/middlewares";
import { paymentSchema } from "@/schemas/payments-schemas";
import { Router } from "express";

const paymentsRouter = Router();

paymentsRouter.use(authenticateToken);
paymentsRouter.get("/", getPaymentsByTicketId);
paymentsRouter.post("/process", validateBody(paymentSchema), createPaymentSucess);

export { paymentsRouter };