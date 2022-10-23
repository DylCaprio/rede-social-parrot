import { CommonRoutesConfig } from "./common.routes.config";
import PostsController from "../controllers/posts.controller";
import PostsMiddleware from "../middlewares/posts.middleware";
import express from "express";

export class PostsRoutes extends CommonRoutesConfig {
    constructor(app: express.Application) {
        super(app, 'PostsRoutes');
    }

    configureRoutes(): express.Application {
        this.app.route(`/posts`)
            .get(PostsController.listPosts)
            .post(
                PostsMiddleware.validateRequiredPostBodyFields,
                PostsMiddleware.validateUserExists,
                PostsMiddleware.validatePostRepeated,
                PostsController.createPost,
            );

            this.app.route(`/posts/:postId`)
                        .all(PostsMiddleware.validatePostExists)
                        .get(PostsController.getPostById)
                        .put(
                            PostsMiddleware.validateRequiredPostBodyFields,
                            PostsController.updatePost
                        )//TODO conferir delete
                        .delete(
                            PostsMiddleware.validatePostExists,
                            PostsController.removePost
                            );

        return this.app;
    }
}
