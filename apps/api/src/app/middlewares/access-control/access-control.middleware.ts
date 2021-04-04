
import {IUser} from "../../interfaces/UserModel";
import {UserRoles} from "../../interfaces/UserRoles";

export const isAdmin = (user: IUser): boolean => {
  if (!user){
    return false
  }
  return  user.role === UserRoles.ADMIN
}
