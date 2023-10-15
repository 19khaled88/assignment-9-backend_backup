import { z } from 'zod';
const create = z.object({
  body: z.object({
   
    name: z.string({
      required_error: 'Name is required or field not match'
    }),
    location: z.string({
      required_error: 'Location is required or field not match'
    }),
    owner: z.string({
      required_error: 'Owner is required or field not match'
    })
  })
});

export const TurfValidation = {
    create
  };