import express from "express"
import jwt, { JwtPayload } from 'jsonwebtoken'
import debug from "debug"
import bcrypt from 'bcrypt'
import logger from "../../../infrastructure/logs/winston.logs"
import readUserUsecase from "../../../domain/usecases/users/read.user.usecase"
import loginUserUsecase from "../../../domain/usecases/users/login.user.usecase"
import constantsConfig from "../../../infrastructure/config/constants.config"

const log: debug.IDebugger = debug("app:users-middleware")

export interface CustomRequest extends Request {
  token: string | JwtPayload
}

class UsersMiddleware {
  async validateRequiredUserBodyFields(req: express.Request, res: express.Response, next: express.NextFunction) {
    if (req.body.name && req.body.email && req.body.password && req.body.apartment !== null) {
      //TODO rever
      next();
    } else {
      res.status(400).send({ error: constantsConfig.USERS.MESSAGES.ERROR.VOID_BODY });
    }
  }

  async validateUserExists(req: express.Request, res: express.Response, next: express.NextFunction) {
    const user = await readUserUsecase.execute({
      iduser: Number(req.params.iduser),
    });
    if (user) {
      logger.info(["Usuário encontrado: ", user]);
      next();
    } else {
      logger.error(`Usuário ${req.params.iduser} não existe`);
      res.status(404).send({
        error: constantsConfig.USERS.MESSAGES.ERROR.USER_NOT_EXISTS.replace("{USER_ID}", req.params.iduser),
      });
    }
  }

  async validateUserRepeated(req: express.Request, res: express.Response, next: express.NextFunction) {
    let resourceID: number = req.body.iduser; //TODO teria que ser pelo email
    const user = await readUserUsecase.execute({
      iduser: resourceID,
    });
    if (!user) {
      next();
    } else {
      res.status(409).send({
        error: constantsConfig.USERS.MESSAGES.ERROR.USER_ALREADY_EXISTS.replace("{USER_ID}", String(resourceID)),
      });
    }
  }

  async validatePassword(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
      const user = await loginUserUsecase.execute(req.body.email);

      if (!user) {
        return res.status(401).send("E-mail ou senha inválido, verifique e tente novamente");
      }

      if (!bcrypt.compareSync(req.body.password, user.password)) {
        return res.status(401).send("E-mail ou senha inválido, verifique e tente novamente");
      }
      next();
    } catch (err) {
      return res.status(500)
    }
  }
}

export default new UsersMiddleware();
