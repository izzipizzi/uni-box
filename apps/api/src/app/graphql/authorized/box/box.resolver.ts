import BoxQueryService from "./box.query.service";
import BoxMutationService from "./box.mutation.service";
import {middlewareCheck, MiddlewareType} from "../../../middlewares/middleware.check";
import {UserRoles} from "../../../interfaces/UserRoles";

const boxQueryService = new BoxQueryService();
const boxMutationService = new BoxMutationService();

const boxResolver = {
    Query: {
        getBoxById(parent, {id}, ctx) {
            middlewareCheck([{ type: MiddlewareType.AUTH }, {type: MiddlewareType.AUTH, roles: [UserRoles.USER,UserRoles.ADMIN]}], ctx);
            return boxQueryService.getById(id);
        },
        getBoxesByUser(parent, {userId}, ctx) {
            middlewareCheck([{ type: MiddlewareType.AUTH }, {type: MiddlewareType.AUTH, roles: [UserRoles.USER,UserRoles.ADMIN]}], ctx);
            return boxQueryService.getAllByUser(userId);
        }
    },

    Mutation: {
        deleteBoxById(parent, {_id}, ctx) {
            middlewareCheck([{ type: MiddlewareType.AUTH }, {type: MiddlewareType.AUTH, roles: [UserRoles.ADMIN]}], ctx);
            return boxMutationService.deleteById(_id);
        },
        updateBoxById(parent, {userId,args},ctx){
          middlewareCheck([{ type: MiddlewareType.AUTH }, {type: MiddlewareType.AUTH, roles: [UserRoles.USER]}], ctx);
          return boxMutationService.updateBox(userId,args)
        },
        // createBox(parent,{userId},ctx){
        //   console.log(userId)
        //   console.log('userId')
        //   middlewareCheck([{ type: MiddlewareType.AUTH }, {type: MiddlewareType.AUTH, roles: [UserRoles.USER]}], ctx);
        //   return boxMutationService.createBox(userId)
        // }
    }
};


export default boxResolver;
