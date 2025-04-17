import axios from 'axios';
import { apiConfig } from './utils/env.util';
import dataSource from './db/config/typeorm.config';

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
    console.log('ERROR: ', error);
  }
}

dataSource
  .initialize()
  .then(() => {
    console.log('] Connected to database.');
  })
  .catch((error) => {
    console.log('ERROR: ', error);
  });

fetchPosts();
