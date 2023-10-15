import { z } from 'zod';
const create = z.object({
  body: z.object({
    offer_time: z.string({
      required_error: 'Time is required or field not match'
    }),
    offer_price: z.string({
      required_error: 'Offer price is required or field not match'
    }),
    gameTypeId: z.string({
      required_error: 'Game type is required or field not match'
    }),
    fieldId: z.string({
      required_error: 'Field ID is required or field not match'
    }),
    turfId: z.string({
      required_error: 'Turf Id is required or field not match'
    })
  })
});

export const GameOfferValidation = {
    create
  };