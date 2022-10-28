import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

import { IUsersRepository } from "../../repositories/users.repository.interface"
import { IUseCase } from "../usecase.interface"
import UsersRepository from "../../../adapters/repositories/users.repository"

export class LoginAuthUseCase implements IUseCase {
  constructor(private _repository: IUsersRepository) {}

  async execute(data: { email: string; password: string }) {
    const user = await this._repository.readByWhere(data.email, data.password)
    if (user) {
      const token = jwt.sign(user, String(process.env.SECRET_KEY), {
        expiresIn: "2 days",
      })

      return {
        user: user,
        token: token,
      }
    } else {
      return undefined
    }

    return
  }
}

export default new LoginAuthUseCase(UsersRepository)
