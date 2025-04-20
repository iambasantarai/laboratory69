import 'reflect-metadata';
import { WebzIOService } from './services/webzio.service';
import logger from './utils/log.util';
import { WebzQueryBuilder } from './builders/webzioquery.builder';
import dataSource from './config/typeorm.config';

async function main() {
  const query = new WebzQueryBuilder().query('Moon landing was fake.').build();

  try {
    logger.info('Establishing database connection.');
    await dataSource.initialize();
    logger.info('Database connection has been established.');

    // Create services after database is initialized
    const webzioService = new WebzIOService(dataSource);

    await webzioService.fetchAndStorePosts(query);
  } catch (error) {
    logger.error('Failed to fetch posts.\nERROR: ', error);
  } finally {
    logger.info('Database connection has been destroyed.');
    await dataSource.destroy();
  }
}

main();
