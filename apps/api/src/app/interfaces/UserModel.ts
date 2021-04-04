import {UserRoles} from "./UserRoles";

export interface IUser {
  name: string,
  email: string,
  hashed_password:string,
  password:string,
  salt:string,
  boxes:[string],
  role:UserRoles
}
