export type IBookingResponse = {
	start_time:string,
	end_time: string,
	gameOfferId:string,
	userId:string,
	turfId:string,
	fieldId:string,
	gameTypeId:string
}

export type IAllBookingResponse = {
	start_time:string,
	end_time: string,
	gameOfferId:string,
	user:{
		name:string
	},
	turf:{
		name:string
	},
	field:{
		code:string
	},
	gameType:{
		name:string
	},
	payment_status:string
	
}



