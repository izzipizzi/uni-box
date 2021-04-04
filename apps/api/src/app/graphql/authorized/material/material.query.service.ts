import {IMaterial} from '../../../interfaces/MaterialModel';
import Material from '../../../models/material';
// import * as path from "path";
// import {match} from "cypress/types/minimatch";


export default class MaterialQueryService {
  getById(id: number): IMaterial {
    return Material.findById(id);
  }

  async getAll(): Promise<IMaterial[]> {
    const materials = await Material.find({}).populate({path: 'user', match: {role: {$eq: "ADMIN"}}});
    console.log(materials)
    return materials.filter(material => material.user)
  }
  async getAllByUser(id:string): Promise<IMaterial[]> {
    const materials = await Material.find({}).populate({path: 'user', match: {_id: {$eq: id}}});
    console.log(materials)
    return materials.filter(material => material.user)
  }
}
