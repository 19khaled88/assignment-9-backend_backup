import { GameOffer, PrismaClient } from "@prisma/client";
import ApiError from "../../../errors/apiError";
import { IGameOfferesponse } from "./interfaces";
const prisma = new PrismaClient()


const createGameOfferService = async (data: GameOffer): Promise<IGameOfferesponse | null> => {
	const result = await prisma.$transaction(async transactionClient => {
		// const isExist = await transactionClient.gameOffer.findFirst({
		// 	where: {
		// 		code: data.code
		// 	}
		// })
		// if (isExist) {
		// 	throw new ApiError(400, 'A field with this code already created')
		// }
		const result = await transactionClient.gameOffer.create({
			data: data,

		});
		const newGameOffer = await transactionClient.gameOffer.findFirst({
			where: {
				id: result.id
			},
			select: {
				offer_time: true,
				offer_price: true,
				turfId: true,
				gameTypeId: true,
				fieldId: true
			}
		})
		return newGameOffer
	})
	return result;
};

const getAllGameOffers = async (): Promise<IGameOfferesponse[]> => {
	const result = await prisma.gameOffer.findMany({
		select: {
			id: true,
			offer_time: true,
			offer_price: true,
			turfId: true,
			gameTypeId: true,
			fieldId: true,
		},
	});
	return result;
};

const getSingleGameOffer = async (id: string): Promise<IGameOfferesponse | null> => {
	const isExist = await prisma.gameOffer.findFirstOrThrow({
		where: {
			id: id,
		},
		select: {
			id: true,
			offer_time: true,
			offer_price: true,
			turfId: true,
			gameTypeId: true,
			fieldId: true,
		}
	});
	return isExist;
};

const deleteGameOffer = async (id: string): Promise<GameOffer | null> => {
	const isDeleted = await prisma.gameOffer.delete({
		where: {
			id: id,
		},
	});
	return isDeleted;
};

const updateGameOffer = async (
	id: string,
	payload: Partial<GameOffer>
): Promise<GameOffer> => {
	const isUpdated = await prisma.gameOffer.update({
		where: {
			id: id,
		},
		data: payload,
	});
	return isUpdated;
};

export const GameOfferService = {
	createGameOfferService,
	getAllGameOffers,
	getSingleGameOffer,
	deleteGameOffer,
	updateGameOffer
}