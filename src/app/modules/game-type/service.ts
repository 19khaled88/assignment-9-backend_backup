import { GameType, PrismaClient } from "@prisma/client";
import ApiError from "../../../errors/apiError";
import { IGameTypeResponse } from "./interfaces";
const prisma = new PrismaClient()


const createGameTypeService = async (data: GameType): Promise<IGameTypeResponse | null> => {
	const result = await prisma.$transaction(async transactionClient => {
		const isExist = await transactionClient.gameType.findFirst({
			where: {
				name: data.name
			}
		})
		if (isExist) {
			throw new ApiError(400, 'A Game type with this name already created')
		}
		const result = await transactionClient.gameType.create({
			data: data,

		});
		const newGame = await transactionClient.gameType.findFirst({
			where: {
				id: result.id
			},
			select: {
				name: true,
				price: true,
				numberOfPalyers: true
			}
		})
		return newGame
	})
	return result;
};

const getAllGameType = async (): Promise<IGameTypeResponse[]> => {
	const result = await prisma.gameType.findMany({
		select: {
			id: true,
			name: true,
			numberOfPalyers: true,
			price: true,
			GameOffers:true
		},

	});

	return result;
};

const getSingleGameType = async (id: string): Promise<IGameTypeResponse | null> => {
	const isExist = await prisma.gameType.findFirst({
		where: {
			id: id,
		},
		select: {
			id: true,
			name: true,
			numberOfPalyers: true,
			price: true,
			GameOffers:true
		}
	});
	return isExist;
};

const deleteGameType = async (id: string): Promise<GameType | null> => {
	const isDeleted = await prisma.gameType.delete({
		where: {
			id: id,
		},
	});
	return isDeleted;
};

const updateGameType = async (
	id: string,
	payload: Partial<GameType>
): Promise<GameType> => {
	const isUpdated = await prisma.gameType.update({
		where: {
			id: id,
		},
		data: payload,
	});
	return isUpdated;
};

export const GameTypeService = {
	createGameTypeService,
	getAllGameType,
	getSingleGameType,
	deleteGameType,
	updateGameType

}