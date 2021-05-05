import AuthMutationService from "./auth.mutation.service";
import AuthQueryService from "./auth.query.service";

const authMutationService = new AuthMutationService();
const authQueryService = new AuthQueryService();

const authResolver = {
  Query: {

  },
  Mutation:{
   async login(parent, {email, password}, ctx) {
      return await authMutationService.login(email, password);
    },
    async signup(parent, {name,email,password}, ctx) {
      return authMutationService.signup(name, email, password);
    }
  }
};

export default authResolver;
