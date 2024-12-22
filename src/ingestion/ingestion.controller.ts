// src/ingestion/ingestion.controller.ts
import { Controller, Post } from '@nestjs/common';
import { IngestionService } from './ingestion.service';

/**
 * IngestionController is responsible for triggering the ingestion process
 * through a POST request to the Python backend.
 */
@Controller('ingestion')
export class IngestionController {
  constructor(private readonly ingestionService: IngestionService) {}

  /**
   * Triggers the ingestion process by making an API call to the Python backend.
   * 
   * @returns The response from the Python backend.
   */
  @Post('trigger')
  async triggerIngestion() {
    return this.ingestionService.triggerIngestion();
  }
}
