import bcrypt from "bcrypt"
import { IUserEntity } from "../../../../../domain/entities/users/user.entity"

export default (user: IUserEntity) => {
  let passHash = bcrypt.hashSync(user.password, 10)
  const person = {
    iduser: user.iduser,
    name: user.name,
    email: user.email,
    apartment: user.apartment,
    password: passHash,
  }

  return {
    person: person,
  }
}
