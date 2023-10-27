export interface IMenu {
    id: string
    title: string
    path: string
    subMenu?: IMenu[]
}