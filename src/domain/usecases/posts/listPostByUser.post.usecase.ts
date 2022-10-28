import postsRepository from "../../../adapters/repositories/posts.repository"
import { IPostEntity } from "../../entities/posts/post.entity"
import { IPostsRepository } from "../../repositories/posts.repository.interface"
import { IUseCase } from "../usecase.interface"

class listPostsByUserUsecase implements IUseCase {
  constructor(private _repository: IPostsRepository) {

  }
  async execute(data: { iduser: number }): Promise<IPostEntity[] | undefined> {
    return await this._repository.listByIdUser(data.iduser)
  }
}

export default new listPostsByUserUsecase(postsRepository)
