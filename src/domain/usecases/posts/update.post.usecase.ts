import { IPostEntity } from "../../entities/posts/post.entity";
import { IPostsRepository } from "../../repositories/posts.repository.interface";
import PostsRepository from "../../../adapters/repositories/posts.repository";
import { IUseCase } from "../usecase.interface";

class UpdatePostUseCase implements IUseCase {
  constructor(private _repository: IPostsRepository) {}

  async execute(data: IPostEntity): Promise<IPostEntity | undefined> {
    return await this._repository.updateById(data)
  }
}

export default new UpdatePostUseCase(PostsRepository)
