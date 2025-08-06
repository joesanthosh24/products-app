export type Product = {
    id: number,
    name: string,
    price: number,
    description: string,
    imageUrl: string
}

export type SortBy = {
    category: string,
    ascending: boolean
}