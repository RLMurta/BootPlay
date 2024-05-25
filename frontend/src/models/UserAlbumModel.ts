export class UserAlbumModel {
    artistName?: string
    id?: number
    idSpotify?: string
    imageUrl?: string
    name?: string
    users?: Users
    value?: number
}

type Users = {
    id: number
    email: string
}
