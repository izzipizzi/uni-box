import { MiddlewareType } from "../middlewares/middleware.check";
import {IUser} from "./UserModel";

export interface IMiddlewareCheckInputType {
    type: MiddlewareType,
    roles?: string[]
}

export interface IContext {
    user: IUser,
    isAuthenticated: boolean
}
