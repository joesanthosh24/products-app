export type Product = {
    _id: string,
    name: string,
    price: number,
    description: string,
    imageUrl: string
}

export type SortBy = {
    category: string,
    ascending: boolean
}