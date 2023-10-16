type IBooking = {
	start_time:string,
	end_time:string,
	gameOfferId:string,
	userId:string
}


export type IGameOfferesponse = {
	price_per_hour:number,
	turfId: string,
	gameTypeId:string,
	fieldId:string,
	bookings?:IBooking[]
}




