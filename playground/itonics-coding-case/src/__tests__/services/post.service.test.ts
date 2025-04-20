import { describe, expect } from '@jest/globals';
import { DataSource, Repository } from 'typeorm';
import { Post } from '../../entities/post.entity';
import { PostService } from '../../services/post.service';
import { fakePost } from '../../utils/fake.util';

describe('PostService', () => {
  let service: PostService;
  let mockRepository: jest.Mocked<Repository<Post>>;

  beforeEach(() => {
    jest.clearAllMocks();

    // Create a partial mock for repository methods
    mockRepository = {
      create: jest.fn(),
      save: jest.fn()
    } as unknown as jest.Mocked<Repository<Post>>;

    // Create a mock data source using mock repository
    const mockDataSource = {
      getRepository: jest.fn().mockReturnValue(mockRepository)
    } as unknown as DataSource;

    service = new PostService(mockDataSource);
  });

  describe('create', () => {
    it('should create and save a post', async () => {
      // setups
      const postData: Partial<Post> = fakePost();
      const mockPost = postData as Post;

      // operations
      mockRepository.create.mockReturnValue(mockPost as Post);
      mockRepository.save.mockResolvedValue(mockPost as Post);

      const result = await service.create(postData);

      // assertions
      expect(mockRepository.create).toHaveBeenCalledWith(postData);
      expect(mockRepository.save).toHaveBeenCalledWith(mockPost);
      expect(result).toEqual(mockPost);
    });

    it('should throw error when save fails', async () => {
      // setups
      const postData = fakePost();

      // operations
      mockRepository.create.mockReturnValue(postData as Post);
      mockRepository.save.mockRejectedValue(new Error('Save failed'));

      // assertions
      await expect(service.create(postData)).rejects.toThrow('Save failed');
    });
  });
});
