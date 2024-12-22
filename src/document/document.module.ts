// src/document/document.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DocumentService } from './document.service';
import { Document } from './entities/document.entity'; // Import Document entity

@Module({
  imports: [TypeOrmModule.forFeature([Document])], // Make DocumentRepository available
  providers: [DocumentService], // Provide the DocumentService
  exports: [DocumentService], // Export the DocumentService if needed elsewhere
})
export class DocumentModule {}
