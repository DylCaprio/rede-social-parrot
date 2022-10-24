import { IUserEntity } from "../../entities/users/user.entity"
import { IUsersRepository } from "../../repositories/users.repository.interface"
import UsersRepository from "../../../adapters/repositories/users.repository"
import { IUseCase } from "../usecase.interface"

class ListUserUseCase implements IUseCase {
  constructor(private _repository: IUsersRepository) {}

  async execute(): Promise<IUserEntity[] | undefined> {
    return await this._repository.list();
  }
}

export default new ListUserUseCase(UsersRepository);
