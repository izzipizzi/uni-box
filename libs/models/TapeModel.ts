import {TapePositionEnum} from "../enums/TapePositionEnum";

export interface ITape {
  _id: string,
  name: string,
  color: string,
  position: TapePositionEnum,
  width: number

}
