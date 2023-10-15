import { z } from 'zod';
const create = z.object({
  body: z.object({
    start_time: z.string({
      required_error: 'Game start time is required or field not match'
    }),
    end_time: z.string({
      required_error: 'Game closing time is required or field not match'
    }),
    gameOfferId: z.string({
      required_error: 'Game offer ID is required or field not match'
    }),
    userId: z.string({
      required_error: 'User Id is required or field not match'
    })
  })
});

export const BookingValidation = {
    create
  };