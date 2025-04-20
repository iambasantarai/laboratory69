import axios from 'axios';
import logger from '../utils/log.util';
import { apiConfig } from '../utils/env.util';
import { PostType, ResponseType } from '../types/webzio.type';
import { PostService } from './post.service';
import { DataSource } from 'typeorm';

export class WebzIOService {
  private apiBaseURI: string;
  private postService: PostService;

  constructor(dataSource: DataSource) {
    this.apiBaseURI = apiConfig.url;

    this.postService = new PostService(dataSource);
  }

  /**
   * Fetches posts from webz.io and stores them to database
   */
  async fetchAndStorePosts(queryParams: any): Promise<void> {
    let totalSaved = 0;
    let nextCursor: string | null = null;
    let totalResults = 0;

    // Build initial URL with query params
    const buildInitialUrl = () => {
      const baseUrl = `${this.apiBaseURI}/newsApiLite`;
      const params = new URLSearchParams({
        token: apiConfig.token,
        ...queryParams
      });
      return `${baseUrl}?${params}`;
    };

    try {
      logger.info('Fetching & storing posts from Webz.io');

      do {
        const url: string = nextCursor
          ? this.apiBaseURI + nextCursor
          : buildInitialUrl();

        try {
          const { data } = await axios.get<ResponseType>(url);

          totalResults = data.totalResults;

          const posts = data.posts;

          /* TODO: Implement bulk inserts instead of individual saves to reduce
           * database write operations
           */
          // Use promise to handle asynchronous operation
          const storePromises = posts.map(async (post) => {
            try {
              await this.storePost(post);

              logger.info(`Successfully stored post: ${post.uuid}`);
            } catch (storeError) {
              logger.error(`Failed to store post.\nERROR: `, storeError);
            }
          });

          await Promise.all(storePromises);

          totalSaved += posts.length;
          nextCursor = data.next;

          logger.warn(
            `Successfully processed ${totalSaved} out of ${totalResults}, ${totalResults - totalSaved} posts remaining.`
          );
        } catch (error) {
          logger.error('Error while calling api.\nERROR: ', error);
          throw error;
        }
      } while (nextCursor && totalSaved < totalResults);
    } catch (error) {
      logger.error('Failed to fetch posts.\nERROR: ', error);
      throw error;
    }
  }

  private async storePost(post: PostType) {
    try {
      // Map PostType to Post entity
      const postData = {
        post_id: post.uuid,
        highlight_title: post.highlightTitle,
        highlight_text: post.highlightText,
        highlight_thread_title: post.highlightThreadTitle,
        ...post
      };

      await this.postService.create(postData);
    } catch (error) {
      logger.error('Error storing post.\nERROR: ', error);
      throw error;
    }
  }
}
