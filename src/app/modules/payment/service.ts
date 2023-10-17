import { Payment, Prisma, PrismaClient, StatusEnumType } from "@prisma/client";
import ApiError from "../../../errors/apiError";
import { IPaymentResponse, payment_search_fields_constant } from "./interfaces";

import { IPaginationOptions } from "../../../shared/paginationType";
import { paginationHelper } from "../../../helpers/paginationHelper";
import { IFilters } from "../../../shared/filterType";
const prisma = new PrismaClient()


const createPaymentService = async (data: Payment): Promise<IPaymentResponse | null> => {
	const result = await prisma.$transaction(async transactionClient => {
		const isExist = await transactionClient.booking.findFirst({
			where:{
				id:data.bookingId
			}
		})
		if(!isExist){
			throw new ApiError(400, 'No booking found for this id!')
		}

		const result = await transactionClient.payment.create({
			data: data,
		});

		await transactionClient.booking.update({
			where:{
				id:data.bookingId
			},
			data:{
				payment_status:StatusEnumType.EXECUTED				
			}
		})
		const newPayment = await transactionClient.payment.findFirst({
			where: {
				id: result.id
			},
			select: {
				bookingId: true,
				
			}
		})
		return newPayment
	})
	return result;
};

const getAllPayment = async (paginatinOptions:IPaginationOptions,filterOptions:IFilters): Promise<IPaymentResponse[]> => {
	const { searchTerm, ...filterData } = filterOptions
	const { limit, page, skip } = paginationHelper.calculatePagination(paginatinOptions)

	let andConditions = []

	//searching code
	if (searchTerm) {
		andConditions.push({
			OR: payment_search_fields_constant.map(field => {
				return {
					[field]: {
						contains: searchTerm,
						mode: 'insensitive'
					},
				}
			}),
		})
	}


	//filtering code
	if (Object.keys(filterData).length > 0) {
		andConditions.push({
			AND: Object.keys(filterData).map((key) => ({
				[key]: {
					equals: (filterData as any)[key]
				}
			}))
		})
	}

	const whereCondition: Prisma.PaymentWhereInput = andConditions.length > 0 ? { AND: andConditions } : {}
	const result = await prisma.payment.findMany({
		where:whereCondition,
		skip,
		take:limit,
		orderBy:paginatinOptions.sortOrder && paginatinOptions.sortBy ? {
			[paginatinOptions.sortBy]:paginatinOptions.sortOrder
		} : {},
		select: {
			id: true,
			bookingId: true,
			
		},
	});
	return result;
};

const getSinglePayment = async (id: string): Promise<IPaymentResponse | null> => {
	const isExist = await prisma.payment.findFirstOrThrow({
		where: {
			id: id,
		},
		select: {
			id: true,
			bookingId: true
		}
	});
	return isExist;
};

const deletePayment = async (id: string): Promise<Payment | null> => {
	const isDeleted = await prisma.payment.delete({
		where: {
			id: id,
		},
	});
	return isDeleted;
};

const updatePayment = async (
	id: string,
	payload: Partial<Payment>
): Promise<Payment> => {
	const isUpdated = await prisma.payment.update({
		where: {
			id: id,
		},
		data: payload,
	});
	return isUpdated;
};

export const PaymentService = {
	createPaymentService,
	getAllPayment,
	getSinglePayment,
	deletePayment,
	updatePayment
}