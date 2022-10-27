import express from "express"
import createPostUsecase from "../../../domain/usecases/posts/create.post.usecase"
import readPostUsecase from "../../../domain/usecases/posts/read.post.usecase"
import updatePostUsecase from "../../../domain/usecases/posts/update.post.usecase"
import deletePostUsecase from "../../../domain/usecases/posts/delete.post.usecase"
import listPostUsecase from "../../../domain/usecases/posts/list.post.usecase"
import debug from "debug"

const log: debug.IDebugger = debug("app:posts-controller")

class PostsController {
  async listPosts(req: express.Request, res: express.Response) {
    try {
      const posts = await listPostUsecase.execute()
      debug.log(posts)
      res.status(200).send(posts)
    } catch (error) {
      console.error(error)
      res.status(404).send("erro, contate o administrador")
    }
  }

  async getPostById(req: express.Request, res: express.Response) {
    const post = await readPostUsecase.execute({
      idpost: Number(req.params.idpost),
    })
    res.status(200).send(post)
  }

  async createPost(req: express.Request, res: express.Response) {
    const post = await createPostUsecase.execute(req.body)
    log(post)
    res.status(201).send(post)
  }

  async updatePost(req: express.Request, res: express.Response) {
    const post = await updatePostUsecase.execute(req.body)
    res.status(200).send(post)
  }

  async removePost(req: express.Request, res: express.Response) {
    const post = await deletePostUsecase.execute({
      idpost: Number(req.params.idpost),
    })
    res.status(204).send()
  }

  // async postByUser(req: express.Request, res: express.Response) {
  //   const post = await readPostByUser.execute(req.body)
  //   res.status(200).send(post)
  // }
}

export default new PostsController()
