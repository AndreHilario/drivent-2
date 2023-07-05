import { CreateTicket } from "@prisma/client";
import Joi from "joi";

export const ticketSchema = Joi.object<CreateTicket>({
    ticketTypeId: Joi.string().required(),
    enrollmentId: Joi.string().required(),
    status: Joi.string().valid('RESERVED', 'PAID').required(),
})