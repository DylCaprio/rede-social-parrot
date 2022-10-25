import express from "express"
import debug from "debug"
import tokenLoginUsersHelper from "../../helpers/token.login.users.helper"
import constantsConfig from "../../../infrastructure/config/constants.config"

const log: debug.IDebugger = debug("app: login-controller");

class loginController {
  async login(request: express.Request, response: express.Response) {
    const login = request.body;
    const token = await tokenLoginUsersHelper(login);
    response.status(200).send(token);
  }
}

export default new loginController();
