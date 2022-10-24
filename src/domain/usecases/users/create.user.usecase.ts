import { IUserEntity } from "../../entities/users/user.entity"
import { IUsersRepository } from "../../repositories/users.repository.interface"
import UsersRepository from "../../../adapters/repositories/users.repository"
import { IUseCase } from "../usecase.interface"

export class CreateUserUseCase implements IUseCase {
  constructor(private _repository: IUsersRepository) {}

  async execute(data: IUserEntity): Promise<IUserEntity | undefined> {
    return await this._repository.create(data)
  }
}

export default new CreateUserUseCase(UsersRepository)
