import express from "express"
import debug from "debug"
import jwt from "jsonwebtoken"
import { ValidationError, validate, Joi } from "express-validation"

import logger from "../../../infrastructure/logs/winston.logs"

const log: debug.IDebugger = debug("app:auth-middleware")

class AuthMiddleware {
  validateLogin = validate({
    body: Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(8).required(),
    }),
  })

  async checkAuth(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
      const token = req.header(`Authorization`)?.replace(`Bearer `, ``)

      if (!token) {
        res.status(401).send({
          error: `Usuario nao autenticado.`,
        })
      } else {
        const decoded = jwt.verify(token, String(process.env.SECRET_KEY))
        if (typeof decoded == `string`) {
          res.status(401).send({
            error: `Usuario nao autenticado.`,
          })
        } else {
          console.log(decoded.iduser)
          next()
        }
      }
    } catch (err) {
      res.status(401).send({
        error: `Usuario nao autenticado.`,
      })
    }
  }

  async validateError(err: any, req: express.Request, res: express.Response, next: express.NextFunction) {
    if (err instanceof ValidationError) {
      return res.status(err.statusCode).json(err)
    }

    return res.status(500).json(err)
  }
}

export default new AuthMiddleware()
