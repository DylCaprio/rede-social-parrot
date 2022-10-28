import express from "express"
import readPostUsecase from "../../../domain/usecases/posts/read.post.usecase"
import debug from "debug"
import logger from "../../../infrastructure/logs/winston.logs"
import constantsConfig from "../../../infrastructure/config/constants.config"
import { Joi, validate, ValidationError } from 'express-validation'

const log: debug.IDebugger = debug("app:posts-middleware");

class PostsMiddleware {

  validateReadById = validate({
    params: Joi.object({
      idpost: Joi.number().required(),
    }),
  })

  validateCreate = validate({
    body: Joi.object({
      iduser: Joi.number().required(),
      content: Joi.string().required(),
    }),
  })

  validateUpdate = validate({
    body: Joi.object({
      iduser: Joi.number().required(),
      idpost: Joi.number().required(),
      content: Joi.string().required()
    })
  })

  async validateRequiredPostBodyFields(req: express.Request, res: express.Response, next: express.NextFunction) {
    if (req.body && req.body.iduser !== undefined) {
      next()
    } else {
      res.status(400).send({ error: constantsConfig.POSTS.MESSAGES.ERROR.VOID_BODY })
    }
  }

  async validatePostExists(req: express.Request, res: express.Response, next: express.NextFunction) {
    const post = await readPostUsecase.execute({
      idpost: Number(req.params.idpost),
    })
    if (post) {
      logger.info(["Publicação encontrada: ", post])
      next()
    } else {
      logger.error(`Publicação ${req.params.idpost} não existe`)
      res.status(404).send({
        error: constantsConfig.POSTS.MESSAGES.ERROR.POST_NOT_EXISTS.replace("{POST_ID}", req.params.idpost),
      })
    }
  }
  async validateError(err: any, req: express.Request, res: express.Response, next: express.NextFunction) {
    if (err instanceof ValidationError) {
      return res.status(err.statusCode).json(err)
    } 
    if (err.name === "UnauthorizedError") {
      res.status(401).send("Token inválido")
    } else {
      next(err)
    }
  }
}

export default new PostsMiddleware();
