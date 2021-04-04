import Box from '../../../models/box'
import User from '../../../models/user'
import {IBox} from "../../../interfaces/BoxModel";
import {IMaterial} from "../../../interfaces/MaterialModel";

export default class BoxMutationService {
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
  //
  // createBox(userId: string,name:string,model:string,color:string,material:IMaterial,width:number,length:number,height:number) {
  //   const box = new Box({user: userId,name,model,material,color,width,length,height})
  //   box.save((err,box)=>{
  //     if (err){
  //       console.log(err)
  //     }
  //     console.log(box)
  //   })
  //   User.findById(userId, {$push: {boxes: box}})
  //   return box
  // }
}
