export class Purchase{
    supplierID: number;
    invoiceNo: string;
    cart:any;
    exchangeCurrency: string;
    nairaEquivalent: number;
    totalAmountForeign: number;
    totalAmountNaira: number;
    id: number;
    userCreated: number;
    userModified: number;
    dateCreated: string;
    dateModified: string;
}

// {
//     code: string;
//     items: [
//         {
//         id: number;
//         cartID: number;
//         name: string;
//         code: string;
//         quantity: number;
//         amount: number;
//         productID: number
//         }
//     ];
//     amount: number;
//     transactionType: true;
//     id: number;
//     userCreated: number;
//     userModified: number;
//     dateCreated: string;
//     dateModified: string
// };