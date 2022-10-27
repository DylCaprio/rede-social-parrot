import { IPostEntity } from "../../../../../domain/entities/posts/post.entity"

export default function (post: any): IPostEntity | undefined {
  if (!post) {
    return
  }

  let entity: IPostEntity = {
    idpost: post.idpost,
    iduser: post.iduser,
    content: post.content,
    createdAt: post.createdAt,
    updatedAt: post.updatedAt,
  }

  return entity as IPostEntity
}
