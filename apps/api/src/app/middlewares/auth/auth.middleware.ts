import * as  express from 'express';
import { IUser } from '../../interfaces/UserModel';
import User from '../../models/user';

const jwt = require('jsonwebtoken');


require('dotenv').config();


export const AuthMiddleware = async (request, response, next: express.NextFunction) => {

  request.isAuthenticated = false;
  const authorizationHeader = request.headers.authorization.split(' ')[1];
  if (!authorizationHeader) {
    return next();

  } else {
    let user_id;
    let decoded;
    try {
     decoded = await jwt.verify(authorizationHeader, process.env.JWT_SECRET);
     user_id = decoded['user']._id;

    }catch (e){
      console.log(e)
      return response.status(500).json({err:'Token expired', e})
    }
    // console.log(decoded);


    const user: IUser = User.findById(user_id);

    if (!user) {
      return next();
    }

    Object.assign(request, { user, isAuthenticated: true });
  }
  next();

};
export default AuthMiddleware;
