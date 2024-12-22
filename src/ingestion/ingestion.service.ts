  // src/ingestion/ingestion.service.ts
  import { Injectable } from '@nestjs/common';
  import axios from 'axios';

  /**
   * Ingestion Service that handles communication with the Python backend for ingestion tasks.
   */
  @Injectable()
  export class IngestionService {
    /**
     * Triggers the ingestion process by sending a POST request to the Python backend.
     * 
     * @returns The response from the Python service.
     */
    async triggerIngestion(): Promise<any> {
      try {
        const response = await axios.post('http://python-backend-url/trigger', {});
        return response.data;
      } catch (error) {
        throw new Error('Error triggering ingestion');
      }
    }
  }
