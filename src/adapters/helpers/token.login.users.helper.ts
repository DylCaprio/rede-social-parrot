import jwt from "jsonwebtoken"
import { auth } from "../../infrastructure/config/token.config"
import listUserUsecase from "../../domain/usecases/users/list.user.usecase"

export default async function (user: { iduser: number; name: string; email: string; apartment: number }) {
  const users = await listUserUsecase.execute();
  const repeat = users?.find(data => data.email === user.email);
  const token = jwt.sign(
    {
      iduser: repeat!.iduser,
      name: repeat!.name,
      email: repeat!.email,
      apartment: repeat!.apartment,
    },
    auth.key
  );
  return token
}
