import express from "express"
import debug from "debug"
import { Joi, validate, ValidationError } from "express-validation"

import logger from "../../../infrastructure/logs/winston.logs"
import readUserUsecase from "../../../domain/usecases/users/read.user.usecase"
import constantsConfig from "../../../infrastructure/config/constants.config"
import listUserUsecase from "../../../domain/usecases/users/list.user.usecase"

const log: debug.IDebugger = debug("app:users-middleware")

class UsersMiddleware {
  validateCreate = validate({
    body: Joi.object({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      apartment: Joi.number().required(),
      password: Joi.string().min(8).required(),
    }),
  })

  validateReadById = validate({
    params: Joi.object({
      iduser: Joi.number().required(),
    }),
  })

  validateUpdate = validate({
    body: Joi.object({
      iduser: Joi.number().required(),
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      apartment: Joi.number().required(),
      password: Joi.string().min(8).required(),
    }),
  })

  async validateUserExists(req: express.Request, res: express.Response, next: express.NextFunction) {
    const user = await readUserUsecase.execute({
      iduser: Number(req.params.iduser),
    })
    if (user) {
      logger.info(["Usuário encontrado: ", user])
      next()
    } else {
      logger.error(`Usuário ${req.params.iduser} não existe`)
      res.status(404).send({
        error: constantsConfig.USERS.MESSAGES.ERROR.USER_NOT_EXISTS.replace("{USER_ID}", req.params.iduser),
      })
    }
  }

  async validateUserRepeated(req: express.Request, res: express.Response, next: express.NextFunction) {
    let resourceID: number = req.body.iduser
    const user = await readUserUsecase.execute({
      iduser: resourceID,
    })
    if (!user) {
      next()
    } else {
      res.status(409).send({
        error: constantsConfig.USERS.MESSAGES.ERROR.USER_ALREADY_EXISTS.replace("{USER_ID}", String(resourceID)),
      })
    }
  }

  async validateEmailRepeated(req: express.Request, res: express.Response, next: express.NextFunction) {
    let resourceID: number = req.body.iduser
    const users = await listUserUsecase.execute()
    const repeat = users?.find(user => user.email === req.body.email)
    if (!repeat) {
      next()
    } else {
      res
        .status(404)
        .send(constantsConfig.USERS.MESSAGES.ERROR.USER_ALREADY_EXISTS.replace("{USER_ID}", String(resourceID)))
    }
  }

  async validateError(err: any, req: express.Request, res: express.Response, next: express.NextFunction) {
    if (err instanceof ValidationError) {
      return res.status(err.statusCode).json(err)
    }

    return res.status(500).json(err)
  }
}

export default new UsersMiddleware()
