import { MESSAGE_UNAUTHORIZED, MESSAGE_YOU_DONT_HAVE_REQUIRED_PERMISSIONS } from '../helpers/messages';
// import { isAllowed } from "./access-control/access-control.middleware";
import { IContext, IMiddlewareCheckInputType } from '../interfaces/middleware.check.interface';
import { isAdmin } from './access-control/access-control.middleware';

export enum MiddlewareType {
  ADMIN_CHECK,
  AUTH,
  TOKEN
}

export const middlewareCheck = (data: IMiddlewareCheckInputType[], context: IContext) => {
  data.forEach((item) => {

    /*
    In case you will in future implement more middlewares which should run on resolver level,
    add them in switch case and handle situation based on values obtained from context
    */
    switch (item.type) {
    case MiddlewareType.ADMIN_CHECK:
      if (!isAdmin(context.user)) {
        throw new Error(MESSAGE_YOU_DONT_HAVE_REQUIRED_PERMISSIONS);
      }
      break;

    case MiddlewareType.AUTH:
      if (!context.isAuthenticated) {
        throw new Error(MESSAGE_UNAUTHORIZED);
      }
      break;

    default:
      break;
    }
  });
};
