import express from "express"

import { CommonRoutesConfig } from "./common.routes.config"
import postsController from "../controllers/posts.controller"
import postsMiddleware from "../middlewares/posts.middleware"
import authMiddleware from "../middlewares/auth.middleware"

export class PostsRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, "PostsRoutes");
  }

  configureRoutes(): express.Application {
    this.app
      .route(`/posts`)
      .all(authMiddleware.checkAuth)
      .get(postsController.listPosts)
      .post(postsMiddleware.validateRequiredPostBodyFields, postsMiddleware.validateCreate, postsController.createPost)

    this.app
      .route(`/posts/:idpost`)
      .all(authMiddleware.checkAuth, postsMiddleware.validateReadById, postsMiddleware.validatePostExists)
      .get(postsController.getPostById)
      .put(postsMiddleware.validateRequiredPostBodyFields, postsController.updatePost)
      .delete(postsMiddleware.validatePostExists, postsController.removePost)

    this.app.use(authMiddleware.validateError)
    
    return this.app;
  }
}
