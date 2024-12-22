import { Test, TestingModule } from '@nestjs/testing';
import { IngestionService } from './ingestion.service';
import axios from 'axios';

// Mocking axios.post method
jest.mock('axios');

describe('IngestionService', () => {
  let ingestionService: IngestionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IngestionService],
    }).compile();

    ingestionService = module.get<IngestionService>(IngestionService);
  });

  describe('triggerIngestion', () => {
    it('should successfully trigger the ingestion process', async () => {
      // Mock the axios.post to return a successful response
      const mockResponse = { data: { success: true, message: 'Ingestion triggered successfully' } };
      (axios.post as jest.Mock).mockResolvedValue(mockResponse);

      const result = await ingestionService.triggerIngestion();

      expect(result).toEqual(mockResponse.data);
      expect(axios.post).toHaveBeenCalledWith('http://python-backend-url/trigger', {});
      expect(axios.post).toHaveBeenCalledTimes(1);
    });

    it('should throw an error if the ingestion process fails', async () => {
      // Mock the axios.post to throw an error
      const mockError = new Error('Error triggering ingestion');
      (axios.post as jest.Mock).mockRejectedValue(mockError);

      try {
        await ingestionService.triggerIngestion();
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect(error.message).toBe('Error triggering ingestion');
      }
    });
  });
});
