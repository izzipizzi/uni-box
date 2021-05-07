import { MiddlewareType } from "../../apps/api/src/app/middlewares/middleware.check";
import {IUser} from "./UserModel";

export interface IMiddlewareCheckInputType {
    type: MiddlewareType,
    roles?: string[]
}

export interface IContext {
    user: IUser,
    isAuthenticated: boolean
  error: string,
}
