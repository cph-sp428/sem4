export type Pet = {
    id: string,
    name: string,
    species: string,
    age: number,
    owner: Owner
}

export type Owner = {
    id: string,
    name: string,
    age: number,
    pets: Pet[]
}