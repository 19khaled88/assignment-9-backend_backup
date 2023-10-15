
type gameOffer = {
	turfId: string,
	gameTypeId: string,
	fieldId:string
}

export type IGameTypeResponse = {
	name: string,
	numberOfPalyers: number,
	GameOffers?:gameOffer[]
}



