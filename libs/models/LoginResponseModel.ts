import {UserModel} from "./UserModel";

export interface LoginResponseModel {
  token?: string,
  user?: UserModel,
  error?: string,
}
