export interface WalletModel {
    id?: number
    balance?: number
    points?: number
    lastUpdate?: Date
    users?: Users
}

type Users = {
    id: number
    name: string
    email: string
    password: string
}
