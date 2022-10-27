import { IDatabase } from "./database.interface"

export interface IDatabaseModel extends IDatabase {
  createModel(name: string, properties: any): any
  read(type: any, dataId: number, includes?: object): any
  list(type: any, includes?: object): any
  readByWhere(type: any, dataWhere: any): any
  selectQuery(sql: string, replacements: any): any
  // login(type: any, data: any): any,
  // readByWhere(type: any, dataWhere: any): any //FIXME
}
