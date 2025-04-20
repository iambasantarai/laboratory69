import { describe, expect } from '@jest/globals';
import { DataSource, Repository } from 'typeorm';
import { Post } from '../../entities/post.entity';
import { PostService } from '../../services/post.service';
import { fakePost } from '../../utils/fake.util';

const createMock = jest.fn();
const saveMock = jest.fn();

const mockRepository = {
  create: createMock,
  save: saveMock
} as unknown as jest.Mock<Repository<Post>>;

const mockDataSource = {
  getRepository: jest.fn().mockReturnValue(mockRepository)
} as unknown as DataSource;

describe('PostService', () => {
  let postService: PostService;

  beforeEach(() => {
    // reset mocks
    jest.clearAllMocks();
    postService = new PostService(mockDataSource);
  });

  it('should create and save a post', async () => {
    // setups
    const postData: Partial<Post> = fakePost();
    const createdPost = postData as Post;

    createMock.mockReturnValue(createdPost);
    saveMock.mockResolvedValue(createdPost);

    // operations
    const result = await postService.create(postData);

    // assertions
    expect(createMock).toHaveBeenCalledWith(postData);
    expect(saveMock).toHaveBeenCalledWith(createdPost);

    expect(result).toEqual(createdPost);
  });
});
