export type Product = {
    _id: string,
    name: string,
    price: number,
    description: string,
    imageUrl: string,
    isDeleted?: boolean
}

export type SortBy = {
    category: string,
    ascending: boolean
}

export type User = {
    username: string | null,
    email: string | null,
    isAdmin: boolean
}

export interface AuthFormProp {
  changeForm: (text: string) => void
}