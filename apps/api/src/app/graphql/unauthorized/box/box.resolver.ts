import BoxQueryService from './box.query.service';
import BoxMutationService from './box.mutation.service';
import { middlewareCheck, MiddlewareType } from '../../../middlewares/middleware.check';
import { UserRoles } from '../../../../../../../libs/enums/UserRoles';

const boxQueryService = new BoxQueryService();
const boxMutationService = new BoxMutationService();

const publicBoxResolver = {
  Query: {
    // getBoxById(parent, { _id }, ctx) {
    //
    //   return boxQueryService.getById(_id);
    // },
    // getBoxesByUser(parent, { userId }, ctx) {
    //
    //   return boxQueryService.getAllByUser(userId);
    // } ,

    getPublicValidatedBoxes(parent, { _ }, ctx) {
      return boxQueryService.getPublicValidatedBoxes();
    }
  },

  Mutation: {

  }
};


export default publicBoxResolver;
