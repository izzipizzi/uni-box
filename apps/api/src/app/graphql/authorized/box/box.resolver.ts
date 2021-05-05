import BoxQueryService from './box.query.service';
import BoxMutationService from './box.mutation.service';
import { middlewareCheck, MiddlewareType } from '../../../middlewares/middleware.check';
import { UserRoles } from '../../../../../../../libs/enums/UserRoles';

const boxQueryService = new BoxQueryService();
const boxMutationService = new BoxMutationService();

const boxResolver = {
  Query: {
    getBoxById(parent, { _id }, ctx) {
      middlewareCheck([{ type: MiddlewareType.AUTH }, {
        type: MiddlewareType.AUTH,
        roles: [UserRoles.USER, UserRoles.ADMIN]
      }], ctx);
      return boxQueryService.getById(_id);
    },
    getBoxesByUser(parent, { userId }, ctx) {
      middlewareCheck([{ type: MiddlewareType.AUTH }, {
        type: MiddlewareType.AUTH,
        roles: [UserRoles.USER, UserRoles.ADMIN]
      }], ctx);
      return boxQueryService.getAllByUser(userId);
    } ,
    getPublicNoValidatedBoxes(parent, { _ }, ctx) {
      middlewareCheck([{ type: MiddlewareType.AUTH }, {
        type: MiddlewareType.AUTH,
        roles: [UserRoles.ADMIN]
      }], ctx);
      return boxQueryService.getPublicNoValidatedBoxes();
    },
    getPublicValidatedBoxes(parent, { _ }, ctx) {
      middlewareCheck([{ type: MiddlewareType.AUTH }, {
        type: MiddlewareType.AUTH,
        roles: [UserRoles.USER,UserRoles.ADMIN]
      }], ctx);
      return boxQueryService.getPublicValidatedBoxes();
    }
  },

  Mutation: {
    deleteBoxById(parent, { _id }, ctx) {
      middlewareCheck([{ type: MiddlewareType.AUTH }, { type: MiddlewareType.AUTH, roles: [UserRoles.ADMIN] }], ctx);
      return boxMutationService.deleteById(_id);
    },
    async validateBox(parent, { boxId }, ctx): Promise<string> {
      middlewareCheck([{ type: MiddlewareType.AUTH }, { type: MiddlewareType.AUTH, roles: [UserRoles.ADMIN] }], ctx);
      return await boxMutationService.validateBox(boxId);
    },
    async declineBox(parent, { boxId }, ctx): Promise<string> {
      middlewareCheck([{ type: MiddlewareType.AUTH }, { type: MiddlewareType.AUTH, roles: [UserRoles.ADMIN] }], ctx);
      return await boxMutationService.declineBox(boxId);
    },
  }
};


export default boxResolver;
