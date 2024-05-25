export class AlbumModel {
    name: string = ''
    albumType: string = ''
    artists: Artist[] = []
    externalUrls: ExternalUrls = { externalUrls: { spotify: '' } }
    id: string = ''
    images: Image[] = []
    releaseDate: string = ''
    type: string = ''
    value: number = 0
}

type Artist = {
    externalUrls: ExternalUrls
    href: string
    id: string
    name: string
    type: string
    uri: string
  }
  
type ExternalUrls = {
    externalUrls: _ExternalUrls
}
  
type _ExternalUrls = {
    spotify: string
}
  
type Image = {
    height: number
    url: string
    width: number
}
