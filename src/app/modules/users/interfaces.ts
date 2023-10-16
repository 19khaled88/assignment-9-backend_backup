

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

export type IFilters ={
    searchTerm?:string
  }

export const search_fields_constant = ['address','location','contactNo']

export const searchFields = ['searchTerm','address','location','contactNo']

