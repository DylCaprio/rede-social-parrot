import { IPostEntity } from "../../entities/posts/post.entity"
import { IPostsRepository } from "../../repositories/posts.repository.interface"
import PostsRepository from "../../../adapters/repositories/posts.repository"
import { IUseCase } from "../usecase.interface"

export class CreatePostUseCase implements IUseCase {
  constructor(private _repository: IPostsRepository) {}

  async execute(data: IPostEntity): Promise<IPostEntity | undefined> {
    return await this._repository.create(data);
  }
}

export default new CreatePostUseCase(PostsRepository);
