import UserQueryService from "./user.query.service";
import UserMutationService from "./user.mutation.service";
import {middlewareCheck, MiddlewareType} from "../../../middlewares/middleware.check";
import {UserRoles} from "../../../../../../../libs/enums/UserRoles";

const userQueryService = new UserQueryService();
const userMutationService = new UserMutationService();

const userResolver = {
    Query: {
      async getUserByToken(paren,{token},ctx){
        return await userQueryService.getUserByToken(token);
      }
    },

    Mutation: {
    }
};


export default userResolver;
