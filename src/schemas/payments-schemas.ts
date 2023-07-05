import Joi from "joi";

export const paymentSchema = Joi.object({
    ticketId: Joi.number().required(),
})