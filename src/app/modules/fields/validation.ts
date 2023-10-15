import { z } from 'zod';
const create = z.object({
  body: z.object({
    code: z.string({
      required_error: 'Field code is required or field not match'
    }),
    turfId: z.string({
      required_error: 'Turf ID is required or field not match'
    }),
    size: z.number({
      required_error: 'Field size is required or field not match'
    })
  })
});

export const FieldValidation = {
    create
  };