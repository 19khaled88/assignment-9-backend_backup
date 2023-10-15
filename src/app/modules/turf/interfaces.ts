type gameOffer = {
	turfId: string,
	gameTypeId: string,
	fieldId:string
}
type fields={
	name:string,
	size:string,
	turfId:string
}

export type ITurfResponse = {
	name: string,
	owner: string,
	location: string,
	gameOffers?:gameOffer[],
	fields?:fields[]
}



