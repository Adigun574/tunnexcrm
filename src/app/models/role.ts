export interface Role{
    Name: string;
    Code: string;
    Privileges: Privilege[];
    ID: number;
    UserCreated: number;
    UserModified: number;
    DateCreated: string;
    DateModified: string;
}

interface Privilege{
    Name: string;
    Code: string;
    Read: boolean;
    Write: boolean;
    RoleID: number;
    ID: number;
    UserCreated: number;
    UserModified: number;
    DateCreated: string;
    DateModified: string;
}