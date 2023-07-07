import Joi from 'joi';
import { CreateTicket } from '@/protocols';

export const ticketSchema = Joi.object<CreateTicket>({
  ticketTypeId: Joi.number().required(),
});
