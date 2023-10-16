
type gameOffer = {
	turfId: string,
	gameTypeId: string,
	fieldId:string
}

type bookings ={
	start_time:string,
	end_time:string,
	gameOfferId:string,
	userId:string,
	turfId:string,
	fieldId:string,
	gameTypeId:string
}

export type IFieldResponse = {
	code: string,
	size: string,
	turfId:string,
	gameOffers?:gameOffer[],
	bookings?:bookings[]
}



