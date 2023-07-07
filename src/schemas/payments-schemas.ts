import { PaymentBody } from '@/protocols';
import Joi from 'joi';

export const paymentSchema = Joi.object<PaymentBody>({
  ticketId: Joi.number().required(),
  cardData: Joi.object().required(),
});
