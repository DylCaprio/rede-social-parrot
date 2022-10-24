import { IUserEntity } from "../../entities/users/user.entity"
import { IUsersRepository } from "../../repositories/users.repository.interface"
import UsersRepository from "../../../adapters/repositories/users.repository"
import { IUseCase } from "../usecase.interface"

class UpdateUserUseCase implements IUseCase {
  constructor(private _repository: IUsersRepository) {}

  async execute(data: IUserEntity): Promise<IUserEntity | undefined> {
    return await this._repository.updateById(data)
  }
}

export default new UpdateUserUseCase(UsersRepository)
