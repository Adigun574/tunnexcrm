export class Sale{
  customerID: number;
  invoiceID: number = 0;
  cartID: number = 0;
  invoice: Invoice;
  cart: Cart;
  payment: Payment[];
  iD: number = 0;
  userCreated: number;
  userModified: number = 0;
  dateCreated: string;
  dateModified: string
}

export class Invoice{
    customerID: number;
    // InvoiceDate: string = "2020-05-17T13:27:44.923Z";
    invoiceNo: string = '';
    cartID: number = 0;
    amount: number;
    amountPaid: number;
    balance: number = 0;
    isPaid: boolean = true;
    cashier: Cashier;
    extData: string = '';
    tax: number = 0;
    taxPercent: number = 0;
    taxName: string = '';
    taxInclusive: boolean = true;
    discount: number = 0;
    id: number = 0;
    userCreated: number;
    userModified: number = 0;
    // DateCreated: string = "2020-05-17T13:27:44.923Z";
    // DateModified: string = "2020-05-17T13:27:44.923Z"
}

export class Cashier{
    name: string = '';
    post: string = '';
    phone: string = '';
    gender: string = '';
    image: string = '';
    username: string = '';
    password: string = '';
    email: string = '';
    id: number;
    userCreated: number;
    userModified: number = 0;
    // DateCreated: string = "2020-05-17T13:27:44.923Z";
    // DateModified: string = "2020-05-17T13:27:44.923Z"
}

export class Cart{
    code: string = '';
    items: Item[];
    amount: number;
    id: number = 0;
    userCreated: number;
    userModified: number = 0;
    // DateCreated: string = "2020-05-17T13:27:44.923Z";
    // DateModified: string = "2020-05-17T13:27:44.923Z"
}

class Item{
    id: number = 0;
    cartID: number = 0;
    name: string;
    code: string = '';
    quantity: number;
    amount: number;
    productID: number
}

interface Payment{
    id: number;
    customerID: number;
    amount: number;
    method: string;
    reference: string;
    // DatePaid: string;
    invoiceNo: string;
    userCreated: number;
}