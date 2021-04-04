import {TapePositionModel} from "./TapePositionModel";

export interface ITape {
  _id: string,
  name: string,
  color: string,
  position: TapePositionModel,
  width: number

}
