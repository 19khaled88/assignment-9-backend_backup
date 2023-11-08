import { GameOffer, PrismaClient } from "@prisma/client";
import ApiError from "../../../errors/apiError";
import { IGameOfferesponse, ISingleGameOfferesponse } from "./interfaces";
const prisma = new PrismaClient()


const createGameOfferService = async (data: GameOffer): Promise<ISingleGameOfferesponse | null> => {
	const result = await prisma.$transaction(async transactionClient => {
		const isValid = await transactionClient.turf.findFirst({
			where: {
				AND: [
					{ id: data.turfId },
					{
						fields: {
							some: {
								id: data.fieldId
							}
						}
					}
				],
			}
		})
		if (!isValid) {
			throw new ApiError(400, 'No field to the given turf registered yet!')
		}
		const isExist = await transactionClient.gameOffer.findFirst({
			where: {
				AND: [
					{
						turfId: data.turfId
					}, {
						gameTypeId: data.gameTypeId
					},
					{
						fieldId: data.fieldId
					}
				]
			}
		})
		if (isExist) {
			throw new ApiError(400, 'A field with this code already created')
		}
		const result = await transactionClient.gameOffer.create({
			data: data,

		});
		const newGameOffer = await transactionClient.gameOffer.findFirst({
			where: {
				id: result.id
			},
			select: {
				price_per_hour: true,
				turfId: true,
				gameTypeId: true,
				fieldId: true,
				bookings: true
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
			price_per_hour: true,
			turf: {
				select: {
					name: true,
					location: true,
					owner: true
				}
			},
			turfId: true,
			gameTypeId: true,
			gameType: {
				select: {
					name: true,
					numberOfPalyers: true
				}
			},
			fieldId: true,
			field: {
				select: {
					code: true,
					size: true
				}
			},
			bookings: {
				select: {
					start_time: true,
					end_time: true,
					turfId: true,
					gameOfferId: true,
					fieldId: true,
					userId: true
				}
			},
		},		
	});
	return result;
};

const getSingleGameOffer = async (id: string): Promise<ISingleGameOfferesponse | null> => {
	const isExist = await prisma.gameOffer.findFirstOrThrow({
		where: {
			id: id,
		},
		select: {
			id: true,
			price_per_hour: true,
			turfId: true,
			gameTypeId: true,
			fieldId: true,
			bookings: true
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