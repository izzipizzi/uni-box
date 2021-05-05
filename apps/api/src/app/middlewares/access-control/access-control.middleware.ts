
import {IUser} from "../../../../../../libs/models/UserModel";
import {UserRoles} from "../../../../../../libs/enums/UserRoles";

export const isAdmin = (user: IUser): boolean => {
  if (!user){
    return false
  }
  return  user.role === UserRoles.ADMIN
}
