import User from '../../../models/user';
import { LoginResponseModel } from '../../../../../../../libs/models/LoginResponseModel';

const jwt = require('jsonwebtoken');
const expressJWT = require('express-jwt');
require('dotenv').config();

export default class AuthMutationService {
  async login(email: string, password: string): Promise<any> {
    const auth_response: LoginResponseModel = { token: '', user: undefined };
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('NOT_USER_WITH_EMAIL');
    }
    const decryptedPassword = user.authenticate(password);
    if (!decryptedPassword) {
      throw new Error('WRONG_PASSWORD');
    }
    auth_response.token = jwt.sign({ user: user }, process.env.JWT_SECRET, { expiresIn: '100d' });
    auth_response.user = user;
    return auth_response;
  }

  async signup(name: string, email: string, password: string) {
    if (!name || !email || !password) {
      throw new Error('ALL_FIELDS_REQUIRED');
    }
    const tempUser = await User.findOne({ email });

    if (tempUser){
      throw new Error('USER_ALREADY_HAVE_ACCOUNT')
    }
    const user = new User({ name, email, password });

    user.save((err, user) => {
      if (err) {
        throw new Error(err);
      }
    });

    return 'USER_CREATED';
  }
}
