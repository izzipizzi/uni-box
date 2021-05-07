import { MESSAGE_UNAUTHORIZED, MESSAGE_YOU_DONT_HAVE_REQUIRED_PERMISSIONS } from '../helpers/messages';
// import { isAllowed } from "./access-control/access-control.middleware";
import { IContext, IMiddlewareCheckInputType } from '../../../../../libs/models/middleware.check.interface';
import { isAdmin } from './access-control/access-control.middleware';

export enum MiddlewareType {
  ADMIN_CHECK,
  AUTH,
  TOKEN,
  LOGIN
}

export const middlewareCheck = (data: IMiddlewareCheckInputType[], context: IContext) => {
  data.forEach((item) => {

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

      case MiddlewareType.LOGIN:
      if (!context.error) {
        throw new Error(context.error);
      }
      break;

    default:
      break;
    }
  });
};
