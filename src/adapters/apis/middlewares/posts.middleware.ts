import express from "express";
import readPostUsecase from "../../../domain/usecases/posts/read.post.usecase";
import debug from "debug";
import logger from "../../../infrastructure/logs/winston.logs";
import constantsConfig from "../../../infrastructure/config/constants.config";

const log: debug.IDebugger = debug("app:posts-middleware");

class PostsMiddleware {
  async validateRequiredPostBodyFields(req: express.Request, res: express.Response, next: express.NextFunction) {
    if (req.body.content !== null && req.body.content !== "") {
      //TODO rever
      next();
    } else {
      res.status(400).send({ error: constantsConfig.POSTS.MESSAGES.ERROR.VOID_BODY });
    }
  }

  async validatePostExists(req: express.Request, res: express.Response, next: express.NextFunction) {
    const post = await readPostUsecase.execute({
      idpost: Number(req.params.idpost),
    });
    if (post) {
      logger.info(["Publicação encontrada: ", post]);
      next();
    } else {
      logger.error(`Publicação ${req.params.idpost} não existe`);
      res.status(404).send({
        error: constantsConfig.POSTS.MESSAGES.ERROR.POST_NOT_EXISTS.replace("{POST_ID}", req.params.idpost),
      });
    }
  }
}

export default new PostsMiddleware();
