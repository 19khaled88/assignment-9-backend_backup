

export type Token = {
	token: string;
};

type bookings = {
	gameOfferId: string,
	userId: string
}


export type IUserResponse = {
	id: string,
	name: string,
	email: string,
	role: string,
	contactNo: string,
	address: string,
	location: string,
	bookings?: bookings[]
}


