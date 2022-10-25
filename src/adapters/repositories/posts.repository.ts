import * as Sequelize from "sequelize";
import { IDatabaseModel } from "../../infrastructure/persistence/databasemodel.interface";
import { IPostEntity } from "../../domain/entities/posts/post.entity";
import { MysqlDatabase } from "../../infrastructure/persistence/mysql/mysql.database";
import { IPostsRepository } from "../../domain/repositories/posts.repository.interface";
import postsModel from "../../infrastructure/persistence/mysql/models/posts.models.mysql.database";

export class PostsRepository implements IPostsRepository {
  constructor(private _database: IDatabaseModel, private _modelPosts: Sequelize.ModelCtor<Sequelize.Model<any, any>>) {}
  async readById(resourceId: number): Promise<IPostEntity | undefined> {
    try {
      const post = await this._database.read(this._modelPosts, resourceId);
      return post;
    } catch (err) {
      throw new Error((err as Error).message);
    }
  }

  async create(resource: IPostEntity): Promise<IPostEntity> {
    const post = resource;
    const postModel = await this._database.create(this._modelPosts, post);
    resource.idpost = postModel.null;
    return resource;
  }

  async deleteById(resourceId: number): Promise<void> {
    await this._database.delete(this._modelPosts, { idpost: resourceId });
  }

  async list(): Promise<IPostEntity[]> {
    const Posts = await this._database.list(this._modelPosts);
    return Posts;
  }

  async updateById(resource: IPostEntity): Promise<IPostEntity | undefined> {
    let postModel = await this._database.read(this._modelPosts, resource.idpost!);
    const post = resource;
    await this._database.update(postModel, post);
    return resource;
  }
}

export default new PostsRepository(MysqlDatabase.getInstance(), postsModel);
