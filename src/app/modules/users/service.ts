import { PrismaClient, User } from "@prisma/client"


const prisma = new PrismaClient()
const signUpService = async (payload: User): Promise<User> => {
    const result = await prisma.user.create({
        data: payload
    })
    return result
}

export const UserService = {
    signUpService
}