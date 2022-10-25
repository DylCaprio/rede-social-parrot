import { CommonRoutesConfig } from "./common.routes.config";
import UsersController from "../controllers/users.controller";
import UsersMiddleware from "../middlewares/users.middleware";
// import AuthController from "../controllers/auth.controller"
// import AuthMiddleware from "../middlewares/auth.middleware"
import express from "express";
import usersMiddleware from "../middlewares/users.middleware";
import usersController from "../controllers/users.controller";
import postsController from "../controllers/posts.controller";

export class UsersRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, "UsersRoutes");
  }

  configureRoutes(): express.Application {
    this.app
      .route(`/users`)
      .get(UsersController.listUsers)
      .post(
        UsersMiddleware.validateRequiredUserBodyFields,
        UsersMiddleware.validateUserRepeated,
        UsersController.createUser
      );

    this.app
      .route(`/users/:iduser`)
      .all(UsersMiddleware.validateUserExists)
      .get(UsersController.getUserById)
      .put(UsersMiddleware.validateRequiredUserBodyFields, UsersController.updateUser) //TODO conferir delete
      .delete(UsersController.removeUser);

    this.app.route(`/users/:iduser/posts`).get(usersMiddleware.validateUserExists, postsController.listPostsByUser );

    // this.app.route(`/login`).post(
    //   UsersMiddleware.validateUserExists, AuthMiddleware.validateRequiredLoginBodyFields, AuthController.loginUser
    // )
    //TODO middleware e controller login
    return this.app;
  }
}
