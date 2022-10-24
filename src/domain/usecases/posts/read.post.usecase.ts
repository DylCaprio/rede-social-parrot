import { IPostEntity } from "../../entities/posts/post.entity";
import { IPostsRepository } from "../../repositories/posts.repository.interface";
import PostsRepository from "../../../adapters/repositories/posts.repository";
import { IUseCase } from "../usecase.interface";

class ReadPostUseCase implements IUseCase {
  constructor(private _repository: IPostsRepository) {}

  async execute(data: { idpost: number }): Promise<IPostEntity | undefined> {
    return await this._repository.readById(data.idpost)
  }
}

export default new ReadPostUseCase(PostsRepository)
