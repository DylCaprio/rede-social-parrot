import express from "express";
import readUserUsecase from "../../../domain/usecases/users/read.user.usecase";
import debug from "debug";
import logger from "../../../infrastructure/logs/winston.logs"
import constantsConfig from "../../../infrastructure/config/constants.config";

const log: debug.IDebugger = debug("app:users-middleware");

class UsersMiddleware {
  async validateRequiredUserBodyFields(req: express.Request, res: express.Response, next: express.NextFunction) {
    if (req.body) {//TODO rever
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
      logger.error(`Usuário ${req.params.userId} não existe`);
      res.status(404).send({
        error: constantsConfig.USERS.MESSAGES.ERROR.USER_NOT_EXISTS.replace("{USER_ID}", req.params.userId),
      });
    }
  }

  async validateUserRepeated(req: express.Request, res: express.Response, next: express.NextFunction) {
    let resourceID: number = req.body.iduser;
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
}

export default new UsersMiddleware();
