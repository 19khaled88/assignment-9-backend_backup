import { z } from 'zod';
const ROLE = ["USER", "ADMIN", "SUPER_ADMIN"] as const;
const create = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Name is required or field not match'
    }),
    email: z.string({
      required_error: 'Email is required or field not match'
    }),
    password: z.string({
      required_error: 'Password is required or field not match'
    }),
    role: z.enum(ROLE).optional(),
    contactNo: z.string({
      required_error: 'ContactNo is required or field not match'
    }),
    address: z.string({
      required_error: 'Address is required or field not match'
    }),
    location: z.string({
      required_error: 'Location is required or field not match'
    })
  })
});

export const UserValidation = {
    create
  };