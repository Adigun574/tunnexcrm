export class ProformaInvoice{
    customerID: number;
    invoiceDate: string;
    invoiceNo: string;
    cart: any;
    cartID: number;
    amount: number;
    amountPaid: number;
    balance: number;
    isPaid: true;
    cashier: any;
    extData: string;
    tax: number;
    taxPercent: number;
    taxName: string;
    taxInclusive: true;
    discountPercent: number;
    type: string;
    id: number;
    userCreated: number;
    userModified: number;
    dateCreated: string;
    dateModified: string
  }

  interface Cart{
        code: string;
        items: Item[];
        amount: number;
        transactionType: true;
        id: number;
        userCreated: number;
        userModified: number;
        dateCreated: string;
        dateModified: string
      }

      interface Item{
        id: number;
        cartID: number;
        name: string;
        code: string;
        quantity: number;
        amount: number;
        productID: number
      }
      interface Cashier{
            name: string;
            post: string;
            phone: string;
            gender: string;
            image: string;
            username: string;
            password: string;
            email: string;
            roleID: number;
            role: Role;
            id: 0;
            userCreated: number;
            userModified: number;
            dateCreated: string;
            dateModified: string
      }

      interface Role{
        name: string;
        code: string;
        privileges: Privilege[];
        id: number;
        userCreated: number;
        userModified: number;
        dateCreated: string;
        dateModified: string
      };

      interface Privilege{
        name: string;
        code: string;
        read: true;
        write: true;
        roleID: number;
        id: number;
        userCreated: number;
        userModified: number;
        dateCreated: string;
        dateModified: string
      }