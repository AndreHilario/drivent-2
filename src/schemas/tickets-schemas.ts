import { CreateTicket } from '@prisma/client';
import Joi from 'joi';

export const ticketSchema = Joi.object<CreateTicket>({
  ticketTypeId: Joi.number().required(),
});
