import { IPostEntity } from "../../../../../domain/entities/posts/post.entity"

export default function (post: IPostEntity) {
  const Post = {
    idpost: post.idpost,
    iduser: post.iduser,
    content: post.content,
  }

  return {
    Post: Post,
  }
}
