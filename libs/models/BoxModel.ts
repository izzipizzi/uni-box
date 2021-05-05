import {BoxModelsEnum} from "../enums/BoxModelsEnum";
import {ITape} from "./TapeModel";
import {IMaterial} from "./MaterialModel";
import {IUser} from "./UserModel";

export interface IBox {
  _id: string,
  name: string,
  model: BoxModelsEnum,
  tape?: ITape,
  material:IMaterial,
  color:string,
  width:number,
  height:number,
  length:number,
  user:IUser,
  textureScaleX:number,
  textureScaleY:number,
  textureOffsetX:number,
  textureOffsetY:number,
  previewImg: string,
  declined: boolean,
  public:boolean,
  validated: boolean,

}
