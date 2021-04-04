import Box from '../../../models/box'
import User from '../../../models/user'
import {IBox} from "../../../interfaces/BoxModel";
import {IMaterial} from "../../../interfaces/MaterialModel";

export default class UserMutationService {
  deleteById(_id: number): string {
    Box.findByIdAndDelete(_id, (err) => {
      if (err) {
        return "TRY_AGAIN"
      }
    })
    return "Deleted successfully";
  }

  updateBox(_id: string, args: any): IBox {
    return Box.findByIdAndUpdate(
      {
        _id: _id,
      },
      {
        $set: args,
      },
      {
        new: true,
      },
      (err: any, box: IBox) => {
        if (err) {
          return new Error('heh');
        }
      }
    );
  }
}
