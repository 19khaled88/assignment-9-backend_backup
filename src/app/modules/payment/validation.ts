import { z } from 'zod';
const create = z.object({
  body: z.object({
    bookingId: z.string({
      required_error: 'Booking ID is required or field not match'
    })
  })
});

export const PaymentValidation = {
    create
  };