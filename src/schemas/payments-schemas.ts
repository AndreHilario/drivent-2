import Joi from 'joi';
import { PaymentBody } from '@/protocols';

export const paymentSchema = Joi.object<PaymentBody>({
  ticketId: Joi.number().required(),
  cardData: Joi.object().required(),
});
