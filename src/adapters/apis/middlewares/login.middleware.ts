import express from "express"
import debug from "debug"
import bcrypt from "bcryptjs"
import listUserUsecase from "../../../domain/usecases/users/list.user.usecase"
import constantsConfig from "../../../infrastructure/config/constants.config"

const log: debug.IDebugger = debug("app: login-middleware");

class LoginMiddleware {
  async validateEmail(request: express.Request, response: express.Response, next: express.NextFunction) {
    const list = await listUserUsecase.execute();
    const user = list!.find(user => user.email === request.body.email);

    if (!user) {
      response.status(404).send(constantsConfig.LOGIN.MESSAGES.ERROR.USER_NOT_EXISTS);
    } else {
      next();
    }
  }

  async validatePassword(request: express.Request, response: express.Response, next: express.NextFunction) {
    const list = await listUserUsecase.execute();
    const user = list!.find(user => user.email === request.body.email);

    if (!bcrypt.compareSync(request.body.password, user!.password)) {
      response.status(404).send(constantsConfig.LOGIN.MESSAGES.ERROR.USER_NOT_EXISTS);
    } else {
      next();
    }
  }
}

export default new LoginMiddleware();
