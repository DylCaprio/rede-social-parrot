import bcrypt from "bcrypt"
import { IUserEntity } from "../../../../../domain/entities/users/user.entity"

export default (user: any): IUserEntity | undefined => {
  if (!user) {
    return
  }

  let passHash = bcrypt.hashSync(user.password, 10)
  let person: IUserEntity = {
    iduser: user.iduser,
    name: user.name,
    email: user.email,
    apartment: user.apartment,
    password: passHash,
  }

  return person as IUserEntity
}
