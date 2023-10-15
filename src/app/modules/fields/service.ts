import { Field, PrismaClient } from "@prisma/client";
import ApiError from "../../../errors/apiError";
import { IFieldResponse } from "./interfaces";
const prisma = new PrismaClient()


const createFieldService = async (data: Field): Promise<IFieldResponse | null> => {
	const result = await prisma.$transaction(async transactionClient => {
		const isExist = await transactionClient.field.findFirst({
			where: {
				code: data.code
			}
		})
		if (isExist) {
			throw new ApiError(400, 'A field with this code already created')
		}
		const result = await transactionClient.field.create({
			data: data,

		});
		const newField = await transactionClient.field.findFirst({
			where: {
				id: result.id
			},
			select: {
				code: true,
				size: true,
				turfId: true,
				gameOffers: true
			}
		})
		return newField
	})
	return result;
};

const getAllFields = async (): Promise<IFieldResponse[]> => {
	const result = await prisma.field.findMany({
		select: {
			id: true,
			code: true,
			size: true,
			turfId: true,
			gameOffers: true
		},
	});
	return result;
};

const getSingleField = async (id: string): Promise<IFieldResponse | null> => {
	const isExist = await prisma.field.findFirstOrThrow({
		where: {
			id: id,
		},
		select: {
			id: true,
			code: true,
			turfId: true,
			size: true,
			gameOffers: true
		}
	});
	return isExist;
};

const deleteField = async (id: string): Promise<Field | null> => {
	const isDeleted = await prisma.field.delete({
		where: {
			id: id,
		},
	});
	return isDeleted;
};

const updateField = async (
	id: string,
	payload: Partial<Field>
): Promise<Field> => {
	const isUpdated = await prisma.field.update({
		where: {
			id: id,
		},
		data: payload,
	});
	return isUpdated;
};

export const FieldService = {
	createFieldService,
	getAllFields,
	getSingleField,
	updateField,
	deleteField

}