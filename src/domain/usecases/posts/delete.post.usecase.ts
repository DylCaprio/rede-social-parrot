import { IPostsRepository } from "../../repositories/posts.repository.interface"
import PostsRepository from "../../../adapters/repositories/posts.repository"
import { IUseCase } from "../usecase.interface"

class DeletePostUseCase implements IUseCase {
  constructor(private _repository: IPostsRepository) {}

  async execute(data: { idpost: number }): Promise<void> {
    return await this._repository.deleteById(data.idpost)
  }
}

export default new DeletePostUseCase(PostsRepository)
