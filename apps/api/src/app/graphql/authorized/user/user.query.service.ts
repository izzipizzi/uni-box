import { MESSAGE_INVALID_PARAMETER } from "../../../helpers/messages";
import {IBox} from "../../../../../../../libs/models/BoxModel";
import Box from '../../../models/box'
import {IUser} from "../../../../../../../libs/models/UserModel";
import User from '../../../models/user'
const jwt = require('jsonwebtoken')


export default class UserQueryService {
  async getUserByToken(token:string){

    console.log(token)

    const decoded = await jwt.verify(token, process.env.JWT_SECRET)
    const user_id = decoded['user']._id;


    const user: IUser = User.findById(user_id)

    return user
  }
}
