import { describe } from '@jest/globals';
import axios from 'axios';
import { DataSource } from 'typeorm';
import { PostService } from '../../services/post.service';
import { fakePost } from '../../utils/fake.util';
import { WebzIOService } from '../../services/webzio.service';
import { ResponseType } from '../../types/webzio.type';

jest.mock('axios');
jest.mock('../../services/post.service');

const mockedAxios = axios as jest.Mocked<typeof axios>;
const mockedPostService = PostService as jest.MockedClass<typeof PostService>;

describe('WebzIOService', () => {
  let service: WebzIOService;
  let mockDataSource: DataSource;

  beforeEach(() => {
    jest.clearAllMocks();

    mockDataSource = {
      getRepository: jest.fn()
    } as unknown as DataSource;

    mockedPostService.mockClear();

    service = new WebzIOService(mockDataSource);
  });

  describe('fetchAndStorePosts', () => {
    it('should fetch and store posts successfully from single page', async () => {
      // setups
      const fakePosts = [fakePost(), fakePost()];
      const mockResponse: ResponseType = {
        posts: fakePosts,
        totalResults: 2,
        moreResultsAvailable: 0,
        next: null,
        requestsLeft: 0,
        warnings: null
      };

      mockedAxios.get.mockResolvedValue({ data: mockResponse });

      // Prevent db call and simulate successful save
      mockedPostService.prototype.create.mockResolvedValue({} as any);

      // operations
      await service.fetchAndStorePosts();

      // assertions
      expect(mockedAxios.get).toHaveBeenCalledTimes(1);
      expect(mockedAxios.get).toHaveBeenCalledWith(
        expect.stringContaining('newsApiLite'),
        {}
      );
      expect(mockedPostService.prototype.create).toHaveBeenCalledTimes(2);
    });

    it('should handle pagination', async () => {
      // setups
      const fakePosts = [fakePost(), fakePost()];
      const mockResponse1: ResponseType = {
        posts: fakePosts,
        totalResults: 4,
        moreResultsAvailable: 2,
        next: '/newsApiLite',
        requestsLeft: 3,
        warnings: null
      };

      const mockResponse2: ResponseType = {
        posts: fakePosts,
        totalResults: 2,
        moreResultsAvailable: 0,
        next: null,
        requestsLeft: 2,
        warnings: null
      };

      mockedAxios.get
        .mockResolvedValueOnce({ data: mockResponse1 })
        .mockResolvedValueOnce({ data: mockResponse2 });

      // Prevent db call and simulate successful save
      mockedPostService.prototype.create.mockResolvedValue({} as any);

      // operations
      await service.fetchAndStorePosts();

      // assertions
      expect(mockedAxios.get).toHaveBeenCalledTimes(2);
      expect(mockedAxios.get).toHaveBeenNthCalledWith(
        2,
        expect.stringContaining('/newsApiLite'),
        {}
      );
    });

    // TODO: tests for API errors, individual post storage errors etc.
  });
});
