import { Prisma, PrismaClient, User } from "@prisma/client";
import bcrypt from 'bcrypt';

import { paginationHelper } from "../../../helpers/paginationHelper";
import { IGenericResponse } from "../../../shared/paginationResponse";
import { IPaginationOptions } from "../../../shared/paginationType";
import { signJwt } from "../../../utils/token";
import { IFilters, IUserResponse, Token, search_fields_constant } from "./interfaces";
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
				id: true,
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

const getAllUsers = async (paginatinOptions: IPaginationOptions, filterOptions: IFilters): Promise<IGenericResponse<IUserResponse[]>> => {
	const { searchTerm, ...filterData } = filterOptions
	const { limit, page, skip } = paginationHelper.calculatePagination(paginatinOptions)

	let andConditions = []

	//searching code
	if (searchTerm) {
		andConditions.push({
			OR: search_fields_constant.map(field => {
				return {
					[field]: {
						$regex: searchTerm,
						$options: 'i',
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

	const whereCondition: Prisma.UserWhereInput = andConditions.length > 0 ? { AND: andConditions } : {}

	const result = await prisma.user.findMany({
		where:whereCondition,
		skip,
		take: limit,
		orderBy: paginatinOptions.sortBy && paginatinOptions.sortOrder ? {
			[paginatinOptions.sortBy]: paginatinOptions.sortOrder
		} : { createAt: 'asc' },
		select: {
			id: true,
			name: true,
			role: true,
			email: true,
			contactNo: true,
			address: true,
			location: true,
			bookings: true
		},

	});

	const total = await prisma.user.count();

	return {
		meta: {
			total,
			page,
			limit
		},
		data: result

	}
};

const getSingleUser = async (id: string): Promise<IUserResponse | null> => {
	const isExist = await prisma.user.findFirst({
		where: {
			id: id,
		},
		select: {
			id: true,
			name: true,
			role: true,
			email: true,
			contactNo: true,
			address: true,
			location: true,
			bookings: true
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