import jwt from "jsonwebtoken"
import bcrypt from 'bcrypt'

import { IUsersRepository } from "../../repositories/users.repository.interface"
import { IUseCase } from "../usecase.interface"
import UsersRepository from "../../../adapters/repositories/users.repository";

export class LoginAuthUseCase implements IUseCase {
  constructor(private _repository: IUsersRepository) {}

  async execute(data: { email: string; password: string }) {
    const user = await this._repository.readByWhere(data.email, data.password)

    if (user) {
      const token = jwt.sign(user, String(process.env.SECRET_KEY), {
        expiresIn: "2 days",
      })

      let isMatch = bcrypt.compareSync(data.password, user.password)
      console.log(data.password, user.password)
      if (!isMatch) {
        console.error("Senha ou email inválido, tente novamente")
      }

      return {
        user: user,
        token: token,
      }
    } else {
      console.error("Senha ou email inválido, tente novamente")

    }

    return
  }

} //FIXME

export default new LoginAuthUseCase(UsersRepository)
