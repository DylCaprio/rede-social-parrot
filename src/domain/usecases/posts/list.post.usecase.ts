import { IPostEntity } from "../../entities/posts/post.entity";
import { IPostsRepository } from "../../repositories/posts.repository.interface";
import PostsRepository from "../../../adapters/repositories/posts.repository";
import { IUseCase } from "../usecase.interface";

class ListPostUseCase implements IUseCase {
  constructor(private _repository: IPostsRepository) {}

  async execute(): Promise<IPostEntity[] | undefined> {
    return await this._repository.list()
  }
}

export default new ListPostUseCase(PostsRepository)
