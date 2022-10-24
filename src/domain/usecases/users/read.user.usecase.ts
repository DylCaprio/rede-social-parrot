import { IUserEntity } from "../../entities/users/user.entity"
import { IUsersRepository } from "../../repositories/users.repository.interface"
import UsersRepository from "../../../adapters/repositories/users.repository"
import { IUseCase } from "../usecase.interface"

class ReadUserUseCase implements IUseCase {
  constructor(private _repository: IUsersRepository) {}

  async execute(data: { iduser: number }): Promise<IUserEntity | undefined> {
    return await this._repository.readById(data.iduser);
  }
}

export default new ReadUserUseCase(UsersRepository);
