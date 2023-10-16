import { Booking, PrismaClient } from "@prisma/client";
import ApiError from "../../../errors/apiError";
import { IBookingResponse } from "./interfaces";
// import ApiError from "../../../errors/apiError";
const prisma = new PrismaClient()


const createBookingService = async (data: Booking): Promise<IBookingResponse | null> => {
	const result = await prisma.$transaction(async transactionClient => {
		const isUserExist =await transactionClient.user.findFirst({
			where:{
				id:data.userId
			}
		})
		if(!isUserExist){
			throw new ApiError(400, 'This user not exist!')
		}
		const offeredGame = await transactionClient.gameOffer.findFirst({
			where: {
				id: data.gameOfferId
			}
		})

		const isExist = await transactionClient.booking.findFirst({
			where: {
				AND: [
					{
						start_time: {
							lt: data.end_time
						},
						end_time: {
							gt: data.start_time
						}
					},
					{
						gameOfferId: offeredGame?.id
					},
					{
						userId: data.userId
					},
					{
						turfId: offeredGame?.turfId
					},
					{
						fieldId: offeredGame?.fieldId
					},
					{
						gameTypeId: offeredGame?.gameTypeId
					}
				]
			}
		})
		if (isExist) {
			throw new ApiError(400, 'A booking with this information already exist!')
		}
		const result = await transactionClient.booking.create({
			data: data,

		});
		const newGameOffer = await transactionClient.booking.findFirst({
			where: {
				id: result.id
			},
			select: {
				start_time: true,
				end_time: true,
				gameOfferId: true,
				userId: true,
				fieldId: true,
				gameTypeId: true,
				turfId: true,
				payment_status:true
			}
		})
		return newGameOffer
	})
	return result;
};

const getAllBookingService = async (): Promise<IBookingResponse[]> => {
	const result = await prisma.booking.findMany({
		select: {
			id: true,
			start_time: true,
			end_time: true,
			gameOfferId: true,
			userId: true,
			fieldId: true,
			gameTypeId: true,
			turfId: true
		}
	});
	return result;
};

const getSingleBookingService = async (id: string): Promise<IBookingResponse | null> => {
	const isExist = await prisma.booking.findFirstOrThrow({
		where: {
			id: id,
		},
		select: {
			id: true,
			start_time: true,
			end_time: true,
			gameOfferId: true,
			userId: true,
			fieldId: true,
			gameTypeId: true,
			turfId: true
		}
	});
	return isExist;
};

const deleteBookingService = async (id: string): Promise<Booking | null> => {
	const isDeleted = await prisma.booking.delete({
		where: {
			id: id,
		},
	});
	return isDeleted;
};

const updateBookingService = async (
	id: string,
	payload: Partial<Booking>
): Promise<Booking> => {
	const isUpdated = await prisma.booking.update({
		where: {
			id: id,
		},
		data: payload,
	});
	return isUpdated;
};

export const BookingService = {
	createBookingService,
	getAllBookingService,
	getSingleBookingService,
	deleteBookingService,
	updateBookingService
}