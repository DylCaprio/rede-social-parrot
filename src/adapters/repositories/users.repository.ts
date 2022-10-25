import * as Sequelize from "sequelize"
import { IDatabaseModel } from "../../infrastructure/persistence/databasemodel.interface"
import { IUserEntity } from "../../domain/entities/users/user.entity"
import { MysqlDatabase } from "../../infrastructure/persistence/mysql/mysql.database"
import { IUsersRepository } from "../../domain/repositories/users.repository.interface"
import usersModel from "../../infrastructure/persistence/mysql/models/users.models.mysql.database"
import passwordCryptoUsersHelper from "../helpers/password.crypto.users.helper"

export class UsersRepository implements IUsersRepository {
  constructor(private _database: IDatabaseModel, private _modelUsers: Sequelize.ModelCtor<Sequelize.Model<any, any>>) {}
  async readById(resourceId: number): Promise<IUserEntity | undefined> {
    try {
      const user = await this._database.read(this._modelUsers, resourceId);
      return user;
    } catch (err) {
      throw new Error((err as Error).message);
    }
  }

  async create(resource: IUserEntity): Promise<IUserEntity> {
    try {
      resource.password = passwordCryptoUsersHelper(resource.password);
      const newUser = await this._database.create(this._modelUsers, resource);
      return resource;
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  async deleteById(resourceId: number): Promise<void> {
    await this._database.delete(this._modelUsers, { iduser: resourceId });
  }

  async list(): Promise<IUserEntity[]> {
    const users = await this._database.list(this._modelUsers);
    return users;
  }

  async updateById(resource: IUserEntity): Promise<IUserEntity | undefined> {
    let userModel = await this._database.read(this._modelUsers, resource.iduser!);

    const user = resource;

    await this._database.update(userModel, user);

    return resource;
  }

  async login(resource: IUserEntity): Promise<any> {
    const user = resource
    const userLogin = await this._database.login(this._modelUsers, user)
    return userLogin
  }
}

export default new UsersRepository(MysqlDatabase.getInstance(), usersModel);
