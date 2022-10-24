import { IUsersRepository } from "../../repositories/users.repository.interface"
import UsersRepository from "../../../adapters/repositories/users.repository"
import { IUseCase } from "../usecase.interface"

class DeleteUserUseCase implements IUseCase {
  constructor(private _repository: IUsersRepository) {}

  async execute(data: { iduser: number }): Promise<void> {
    return await this._repository.deleteById(data.iduser)
  }
}

export default new DeleteUserUseCase(UsersRepository)
