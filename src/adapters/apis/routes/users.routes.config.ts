import express from "express"

import { CommonRoutesConfig } from "./common.routes.config"
import usersController from "../controllers/users.controller"
import usersMiddleware from "../middlewares/users.middleware"
import authMiddleware from "../middlewares/auth.middleware"

export class UsersRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, "UsersRoutes")
  }

  configureRoutes(): express.Application {
    this.app
      .route(`/users`)
      .get(authMiddleware.checkAuth, usersController.listUsers)
      .post(
        usersMiddleware.validateCreate,
        usersMiddleware.validateEmailRepeated,
        usersController.createUser
      )

    this.app
      .route(`/users/:iduser`)
      .all(authMiddleware.checkAuth, usersMiddleware.validateUserExists, usersMiddleware.validateReadById)
      .get(usersController.getUserById)
      .put(usersMiddleware.validateUpdate, usersMiddleware.validateUserExists, usersController.updateUser)
      .delete(usersController.removeUser)

    //this.app.route(`/users/:iduser/posts`).get(auth, usersMiddleware.validateUserExists, postsController.listPostsByUser);

    this.app.use(usersMiddleware.validateError)

    return this.app
  }
}
