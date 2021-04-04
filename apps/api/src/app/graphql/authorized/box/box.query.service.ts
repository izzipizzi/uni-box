import { MESSAGE_INVALID_PARAMETER } from "../../../helpers/messages";
import {IBox} from "../../../interfaces/BoxModel";
import Box from '../../../models/box'


export default class BoxQueryService {
    getById(id: number): IBox {
      return Box.findById(id)
    }

    getAllByUser(userId): IBox[] {
        return Box.find({user:userId});
    }
}
