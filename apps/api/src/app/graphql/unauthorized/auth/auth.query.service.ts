import User from '../../../models/user'
import {LoginResponseModel} from "../../../../../../../libs/models/LoginResponseModel";
import {IUser} from "../../../interfaces/UserModel";

const expressJWT = require('express-jwt')
require('dotenv').config()

export default class AuthQueryService {

  // async login(email: string, password: string): Promise<any> {
  //   const auth_response: LoginResponseModel = {token: "", user: undefined, error: null}
  //   const user = await User.findOne({email}, (err, res) => {
  //     if (err || !res) {
  //       auth_response.error = 'NOT_USER_WITH_EMAIL'
  //       return null
  //     } else if (!res.authenticate(password)) {
  //       auth_response.error = 'WRONG_PASSWORD'
  //     }
  //   })
  //
  //   if (auth_response.error) {
  //     auth_response.token = null
  //     auth_response.user = null
  //   } else {
  //     auth_response.token = jwt.sign({user: user}, process.env.JWT_SECRET, {expiresIn: '1d'})
  //     auth_response.user = user
  //   }
  //   return auth_response
  // }
  //
  // signup(name
  //          :
  //          string, email
  //          :
  //          string, password
  //          :
  //          string
  // ) {
  //   const user = new User({name, email, password});
  //   user.save((err, user) => {
  //     if (err) {
  //       throw new Error(err)
  //     }
  //   })
  //
  //   return 'USER_CREATED'
  // }
}
