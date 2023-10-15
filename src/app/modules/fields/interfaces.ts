
type gameOffer = {
	turfId: string,
	gameTypeId: string,
	fieldId:string
}

export type IFieldResponse = {
	code: string,
	size: string,
	turfId:string,
	gameOffers?:gameOffer[]
}



