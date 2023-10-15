import { z } from 'zod';
const create = z.object({
  body: z.object({
   
    name: z.string({
      required_error: 'Game name is required or field not match'
    }),
    numberOfPalyers: z.number({
      required_error: 'Number of players is required or field not match'
    })
  })
});

export const GameTypeValidation = {
    create
  };