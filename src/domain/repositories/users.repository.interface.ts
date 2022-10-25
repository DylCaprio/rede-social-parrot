import { IUserEntity } from "../entities/users/user.entity";

export interface IUsersRepository {
  readById(resourceId: number): Promise<IUserEntity | undefined>;
  create(resource: IUserEntity): Promise<IUserEntity>;
  deleteById(resourceId: number): Promise<void>;
  list(): Promise<IUserEntity[]>;
  updateById(resource: IUserEntity): Promise<IUserEntity | undefined>;
  login(resource: IUserEntity): Promise<IUserEntity>
}
