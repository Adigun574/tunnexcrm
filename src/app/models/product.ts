export interface Product{
        name: string,
        Quantity: number,
        Image: string,
        PriceID: number,
        Price: Price
        ID: number,
        UserCreated: number,
        UserModified: number,
        DateCreated: string,
        DateModified: string,
        salePrice?:number,
        costPrice?:number,
        quantity?:number
        description?:string,
        location?:string
}

interface Price{
    ID: number,
    UserCreated: number,
    UserModified: number,
    DateCreated: string,
    DateModified: string,
    CostPrice: number,
    SalePrice: number
}