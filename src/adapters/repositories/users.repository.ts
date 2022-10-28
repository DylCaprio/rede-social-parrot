import * as Sequelize from "sequelize"

import { IDatabaseModel } from "../../infrastructure/persistence/databasemodel.interface"
import { MysqlDatabase } from "../../infrastructure/persistence/mysql/mysql.database"
import { IUserEntity } from "../../domain/entities/users/user.entity"
import { IUsersRepository } from "../../domain/repositories/users.repository.interface"
import usersModel from "../../infrastructure/persistence/mysql/models/users.models.mysql.database"
import entityToModelUsersMysql from "../../infrastructure/persistence/mysql/helpers/users/entityToModel.users.mysql"
import modelToEntityUsersMysql from "../../infrastructure/persistence/mysql/helpers/users/modelToEntity.users.mysql"

export class UsersRepository implements IUsersRepository {
  constructor(
    private _database: IDatabaseModel,
    private _modelUsers: Sequelize.ModelCtor<Sequelize.Model<any, any>>,
  ) { }
  
  async create(resource: IUserEntity): Promise<IUserEntity> {
    try {
      const {person} = entityToModelUsersMysql(resource)
      const newUser = await this._database.create(this._modelUsers, person)
      newUser.iduser = newUser.null
      return newUser
    } catch (error) {
      throw new Error((error as Error).message)
    }
  }

  async readById(resourceId: number): Promise<IUserEntity | undefined> {
    try {
      const user = await this._database.read(this._modelUsers, resourceId)
      return modelToEntityUsersMysql(user)
    } catch (err) {
      throw new Error((err as Error).message)
    }
  }

  async deleteById(resourceId: number): Promise<void> {
    await this._database.delete(this._modelUsers, { iduser: resourceId })
  }

  async list(): Promise<IUserEntity[]> {
    const users = await this._database.list(this._modelUsers)
    return users
  }

  async updateById(resource: IUserEntity): Promise<IUserEntity | undefined> {
    let userModel = await this._database.read(this._modelUsers, resource.iduser!)
    const { person } = entityToModelUsersMysql(resource)
    await this._database.update(userModel, person)
    return resource
  }

  async readByWhere(email: string, password: string): Promise<IUserEntity | undefined> {
    try {
      const user = await this._database.readByWhere(this._modelUsers, {
        email,
        password
      })

      return modelToEntityUsersMysql(user)
    } catch (err) {
      throw new Error((err as Error).message)
    }
  }
}

export default new UsersRepository(MysqlDatabase.getInstance(), usersModel);

