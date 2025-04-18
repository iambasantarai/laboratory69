import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { WebzIOService } from './services/webzio.service';
import logger from './utils/log.util';
import { datasourceOptions } from './db/config/typeorm.config';

async function main() {
  const dataSource = new DataSource(datasourceOptions);

  try {
    logger.info('Establishing database connection.');
    await dataSource.initialize();
    logger.info('Database connection has been established.');

    // Create services after database is initialized
    const webzioService = new WebzIOService(dataSource);

    await webzioService.fetchAndStorePosts();
  } catch (error) {
    logger.error('Failed to fetch posts.\nERROR: ', error);
  } finally {
    logger.info('Database connection has been destroyed.');
    await dataSource.destroy();
  }
}

main();
