import { IBox } from '../../../../../../../libs/models/BoxModel';
import Box from '../../../models/box';

export default class BoxQueryService {
  getById(_id: number): IBox {
    return Box.findById(_id).populate('material');
  }

  async getAllByUser(userId): Promise<IBox[]> {
    return await Box.find({ user: userId }).populate('material')
  }
  async getPublicNoValidatedBoxes(): Promise<IBox[]> {
    const box= await Box.find({ public: true, validated: false, declined: false }).populate('user').populate('material').exec()
    console.log(box)
    return box

  }
  async getPublicValidatedBoxes(): Promise<IBox[]> {
    const box = await Box.find({ public: true, validated: true, declined: false }).populate('material').populate('user')
    console.log(box)
    return box
  }
  async getDeclinedBoxes(): Promise<IBox[]> {
    return await Box.find({ declined: true }).populate('material')
  }
}
