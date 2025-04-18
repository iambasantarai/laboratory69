import { Repository, DataSource } from 'typeorm';
import { Post } from '../entities/post.entity';
import 'reflect-metadata'; // Make sure this is imported first

export class PostService {
  private postRepository: Repository<Post>;

  constructor(dataSource: DataSource) {
    this.postRepository = dataSource.getRepository(Post);
  }

  /**
   * Create a new post
   * @param postData The post data to create
   * @returns The created post
   */
  async create(postData: Partial<Post>): Promise<Post> {
    const post = this.postRepository.create(postData);
    return await this.postRepository.save(post);
  }

  // TODO: Implement the rest of the methods
}
