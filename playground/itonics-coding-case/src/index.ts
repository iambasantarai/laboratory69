import axios from 'axios';
import { apiConfig } from './utils/env.util';
import dataSource from './db/config/typeorm.config';
import logger from './utils/log.util';

async function fetchPosts() {
  const apiURI =
    apiConfig.url +
    '?token=' +
    apiConfig.token +
    '&q=Google%20topic%3A%22financial%20and%20economic%20news%22%20sentiment%3Anegative';

  try {
    const response = await axios.get(apiURI);
    console.log('::: response :::');
    console.log(response.data);
    console.log('::: response :::');
  } catch (error) {
    logger.error(error);
  }
}

dataSource
  .initialize()
  .then(() => {
    logger.info('Datasource has been initialized.');
  })
  .catch((error) => {
    logger.error(error);
  });

fetchPosts();
