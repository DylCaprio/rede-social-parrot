import { expressjwt } from "express-jwt"
import { auth } from "../../../infrastructure/config/token.config"

export default expressjwt({
  secret: auth.key,
  algorithms: ["HS256"],
})
