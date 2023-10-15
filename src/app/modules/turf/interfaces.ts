type gameOffer = {
	turfId: string,
	gameTypeId: string,
	fieldId:string
}

export type ITurfResponse = {
	name: string,
	owner: string,
	location: string,
	gameOffers?:gameOffer[]
}



