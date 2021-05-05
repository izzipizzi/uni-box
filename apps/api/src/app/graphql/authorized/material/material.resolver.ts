import MaterialQueryService from './material.query.service';
import MaterialMutationService from './material.mutation.service';
import { middlewareCheck, MiddlewareType } from '../../../middlewares/middleware.check';
import { UserRoles } from '../../../../../../../libs/enums/UserRoles';

const materialQueryService = new MaterialQueryService();
const materialMutationService = new MaterialMutationService();

const materialResolver = {
  Query: {
    getMaterialById(parent, { id }, ctx) {
      middlewareCheck([{ type: MiddlewareType.AUTH }, {
        type: MiddlewareType.AUTH,
        roles: [UserRoles.USER, UserRoles.ADMIN]
      }], ctx);
      return materialQueryService.getById(id);
    },
    getMaterials(parent, _, ctx) {
      middlewareCheck([{ type: MiddlewareType.AUTH }, {
        type: MiddlewareType.AUTH,
        roles: [UserRoles.USER, UserRoles.ADMIN]
      }], ctx);
      return materialQueryService.getAll();
    },
    getAllMaterialsByUser(parent, {id}, ctx) {
      middlewareCheck([{ type: MiddlewareType.AUTH }, {
        type: MiddlewareType.AUTH,
        roles: [UserRoles.USER, UserRoles.ADMIN]
      }], ctx);
      return materialQueryService.getAllByUser(id);
    },

  },

  Mutation: {
    deleteMaterialById(parent, { _id }, ctx) {
      middlewareCheck([{ type: MiddlewareType.AUTH }, {
        type: MiddlewareType.ADMIN_CHECK,
        roles: [UserRoles.ADMIN]
      }], ctx);
      return materialMutationService.deleteById(_id);
    },

  }
};

export default materialResolver;
