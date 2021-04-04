import Material from '../../../models/material';

export default class MaterialMutationService {
  deleteById(_id: number): string {
    Material.findByIdAndDelete(_id, (err) => {
      if (err) {
        return 'TRY_AGAIN';
      }
    });
    return 'Deleted successfully';
  }
}
