import { PrismaClient, Turf } from "@prisma/client";
import ApiError from "../../../errors/apiError";
import { ITurfResponse } from "./interfaces";
const prisma = new PrismaClient()


const createTurfService = async (data: Turf): Promise<ITurfResponse | null> => {


	const result = await prisma.$transaction(async transactionClient => {
		const isExist = await transactionClient.turf.findFirst({
			where: {
				name: data.name
			}
		})
		if (isExist) {
			throw new ApiError(400, 'A turf with this name already created')
		}
		const result = await transactionClient.turf.create({
			data: data,

		});
		const newUser = await transactionClient.turf.findFirst({
			where: {
				id: result.id
			},
			select: {
				name: true,
				owner: true,
				location: true
			}
		})
		return newUser
	})
	return result;
};

const getAllTurfs = async (): Promise<ITurfResponse[]> => {
	const result = await prisma.turf.findMany({
		select: {
			id: true,
			name: true,
			location: true,
			owner: true,
			gameOffers:true,
			fields:true,
			bookings:true
		},

	});

	return result;
};

const getSingleTurf = async (id: string): Promise<ITurfResponse | null> => {
	const isExist = await prisma.turf.findFirst({
		where: {
			id: id,
		},
		select: {
			id: true,
			name: true,
			location: true,
			owner: true,
			gameOffers:true,
			fields:true,
			bookings:true
		}
	});
	return isExist;
};

const deleteTurf = async (id: string): Promise<Turf | null> => {
	const isDeleted = await prisma.turf.delete({
		where: {
			id: id,
		},
	});
	return isDeleted;
};

const updateTurf = async (
	id: string,
	payload: Partial<Turf>
): Promise<Turf> => {
	const isUpdated = await prisma.turf.update({
		where: {
			id: id,
		},
		data: payload,
	});
	return isUpdated;
};

export const TurfService = {
	createTurfService,
	getAllTurfs,
	getSingleTurf,
	deleteTurf,
	updateTurf

}