import axios from 'axios';
import logger from '../utils/log.util';
import { apiConfig } from '../utils/env.util';
import { PostType, ResponseType } from '../types/webzioresponse.type';
import { PostService } from './post.service';
import { DataSource } from 'typeorm';

export class WebzIOService {
  private apiURI: string;
  private postService: PostService;

  constructor(dataSource: DataSource) {
    this.apiURI =
      apiConfig.url +
      '?token=' +
      apiConfig.token +
      '&q=Google%20topic%3A%22financial%20and%20economic%20news%22%20sentiment%3Anegative';

    this.postService = new PostService(dataSource);
  }

  async fetchAndStorePosts() {
    let totalSaved = 0;
    let nextCursor: string | null = null;
    let totalResults = 0;

    try {
      logger.info('Fetching & storing posts from Webz.io');
      do {
        const { data } = await axios.get<ResponseType>(this.apiURI);
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
        nextCursor = data.moreResultsAvailable ? data.next : null;

        logger.info(
          `Successfully processed ${totalSaved} out of ${totalResults}, ${totalResults - totalSaved} posts remaining.`
        );
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
