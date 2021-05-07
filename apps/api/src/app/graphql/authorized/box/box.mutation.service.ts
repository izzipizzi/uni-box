import Box from '../../../models/box';

export default class BoxMutationService {
  deleteById(_id: number): string {
    Box.findByIdAndDelete(_id, (err) => {
      if (err) {
        return 'TRY_AGAIN';
      }
    });
    return 'DELETED_SUCCESS';
  }

  async validateBox(boxId: string): Promise<string> {
    const box = await Box.updateOne({ _id: boxId }, { validated: true });
    if (box) {
      return 'SUCCESS';
    }
  }

  async declineBox(boxId: string): Promise<string> {
    const box = await Box.updateOne({ _id: boxId }, { validated: false, declined: true });
    if (box) {
      return 'SUCCESS';
    }

  }

}
