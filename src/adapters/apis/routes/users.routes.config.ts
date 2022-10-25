import express from "express"
import { CommonRoutesConfig } from "./common.routes.config"
import usersController from "../controllers/users.controller"
import usersMiddleware from "../middlewares/users.middleware"
import postsController from "../controllers/posts.controller"
import loginController from "../controllers/login.controller"
import loginMiddleware from "../middlewares/login.middleware"

export class UsersRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, "UsersRoutes");
  }

  configureRoutes(): express.Application {
    this.app
      .route(`/users`)
      .get(usersController.listUsers)
      .post(
        usersMiddleware.validateRequiredUserBodyFields,
        usersMiddleware.validateUserRepeated,
        usersController.createUser
      );

    this.app
      .route(`/users/:iduser`)
      .all(usersMiddleware.validateUserExists)
      .get(usersController.getUserById)
      .put(usersMiddleware.validateRequiredUserBodyFields, usersController.updateUser)
      .delete(usersController.removeUser);

    this.app.route(`/users/:iduser/posts`).get(usersMiddleware.validateUserExists, postsController.listPostsByUser );

    this.app.route(`/login`).post(
      loginMiddleware.validateEmail, loginMiddleware.validatePassword, loginController.login
    )
    return this.app;
  }
}
