export interface UserModel {
  name: string,
  email: string,
  hashed_password:string,
  password:string,
  salt:string,
  boxes:[string]
}
