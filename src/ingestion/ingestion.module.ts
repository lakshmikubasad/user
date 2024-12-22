// src/ingestion/ingestion.module.ts

import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios'; // Import HttpModule
import { IngestionService } from './ingestion.service'; // Import IngestionService
import { IngestionController } from './ingestion.controller'; // Import IngestionController (if you have one)

@Module({
  imports: [HttpModule], // Add HttpModule here to make HttpService available
  providers: [IngestionService],
  controllers: [IngestionController],
})
export class IngestionModule {}
