type filterInput=string[]

const filter=(data:filterInput)=>{
    let array:filterInput =[]
    data.map(item=>array.push(item))
    return array
}
