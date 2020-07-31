export interface User{
    name: string;
    post: string;
    phone: string;
    gender: string;
    image: string;
    username: string;
    password: string;
    email: string;
    id: number;
    userCreated: number;
    userModified: number;
    dateCreated: string;
    dateModified: string;
    role: Role;
  }

  interface Role{
    name: string,
    code: string,
    privileges: Privilege[],
    id: number,
    userCreated: number,
    userModified: number,
    dateCreated: string,
    dateModified: string
  }

  interface Privilege{
    name: string,
    code: string,
    read: true,
    write: true,
    roleID: number,
    id: number,
    userCreated: number,
    userModified: number,
    dateCreated: string,
    dateModified: string
  }