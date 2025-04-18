import axios from 'axios';
import { apiConfig } from './utils/env.util';
import logger from './utils/log.util';

async function testApi() {
  try {
    const apiURI = `${apiConfig.url}?token=${apiConfig.token}&q=Google%20topic%3A%22financial%20and%20economic%20news%22%20sentiment%3Anegative`;
    
    logger.info(`Testing API with URI: ${apiURI}`);
    
    const response = await axios.get(apiURI);
    
    logger.info(`API Response Status: ${response.status}`);
    logger.info(`API Response Data: ${JSON.stringify(response.data, null, 2)}`);
  } catch (error) {
    logger.error('API Test Failed.\nERROR: ', error);
  }
}

testApi(); 