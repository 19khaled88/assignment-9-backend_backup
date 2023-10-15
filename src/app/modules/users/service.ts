import { PrismaClient, User } from "@prisma/client";
import bcrypt from 'bcrypt';

import { signJwt } from "../../../utils/token";
import {  IUserResponse, Token } from "./interfaces";
const prisma = new PrismaClient()


const signUpServices = async (data: User): Promise<IUserResponse | null> => {
	const hashedPassword = await bcrypt.hash(data.password, 12);
	data.password = hashedPassword;
	const result = await prisma.$transaction(async transactionClient => {
		const result = await prisma.user.create({
			data: data,

		});
		const newUser = await transactionClient.user.findFirst({
			where: {
				id: result.id
			},
			select: {
				id:true,
				name: true,
				role: true,
				email: true,
				contactNo: true,
				address: true,
				location: true
			}
		})
		return newUser
	})
	return result;
};

const signInServices = async (data: Partial<User>): Promise<Token | null> => {
	const isExist = await prisma.user.findFirst({
		where: {
			email: data.email,
		},
	});
	if (isExist === null) {
		throw new Error('This user does not exist')
	}
	if (
		isExist !== null &&
		data.password !== undefined &&
		(await bcrypt.compare(data.password, isExist.password))
	) {
		const access_token = signJwt(
			{ role: isExist.role, userId: isExist.id },
			{ expiresIn: "2h" }
		);

		return { token: access_token };
	}

	throw new Error('This user not found')
};

const getAllUsers = async (): Promise<IUserResponse[]> => {
	const result = await prisma.user.findMany({
		select: {
			id:true,
			name: true,
			role: true,
			email: true,
			contactNo: true,
			address: true,
			location: true,
			bookings:true
		},
		
	});
	
	return result;
};

const getSingleUser = async (id: string): Promise<IUserResponse | null> => {
	const isExist = await prisma.user.findFirst({
		where: {
			id: id,
		},
		select:{
			id:true,
			name: true,
			role: true,
			email: true,
			contactNo: true,
			address: true,
			location: true,
			bookings:true
		}
	});
	return isExist;
};

const deleteUser = async (id: string): Promise<User | null> => {
	const isDeleted = await prisma.user.delete({
		where: {
			id: id,
		},
	});
	return isDeleted;
};

const updateUser = async (
	id: string,
	payload: Partial<User>
): Promise<User> => {
	const isUpdated = await prisma.user.update({
		where: {
			id: id,
		},
		data: payload,
	});
	return isUpdated;
};

export const UserService = {
	signUpServices,
	signInServices,
	getAllUsers,
	updateUser,
	deleteUser,
	getSingleUser
}