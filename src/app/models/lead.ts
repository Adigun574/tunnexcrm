export interface Lead{
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  company: string;
  address: string;
  gender: string;
  image: string;
  message: Message[];
  isCustomer:boolean;
  id: number;
  userCreated: number;
  userModified: number;
  dateCreated: string;
  dateModified: string
}

export interface Message{
    Type: string;
    Summary: string;
    LeadID: number;
    ID: number;
    UserCreated: number;
    UserModified: number;
    DateCreated: string;
    DateModified: string
}