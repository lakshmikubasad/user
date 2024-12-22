import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Document } from './entities/document.entity';
import { UserService } from '../user/user.service';

/**
 * Document Service that handles CRUD operations related to documents.
 */
@Injectable()
export class DocumentService {
  constructor(
    @InjectRepository(Document)
    private documentsRepository: Repository<Document>,  // Inject the Document repository
    private userService: UserService,
  ) {}

  /**
   * Creates a new document and associates it with the user.
   * 
   * @param userId - The user ID who is uploading the document.
   * @param title - The title of the document.
   * @param content - The content of the document.
   * @returns The created document object.
   */
  async createDocument(userId: number, title: string, content: string): Promise<Document> {
    const user = await this.userService.findById(userId);
    const document = new Document();
    document.title = title;
    document.description = content;
    document.user = user;
    return this.documentsRepository.save(document);
  }

  /**
   * Retrieves all documents from the database.
   * 
   * @returns An array of documents.
   */
  async getDocuments(): Promise<Document[]> {
    return this.documentsRepository.find();
  }

  /**
   * Retrieves a document by its ID.
   * 
   * @param id - The ID of the document to retrieve.
   * @returns The document object.
   */
  async getDocument(id: number): Promise<Document> {
    return this.documentsRepository.findOne(id);
  }

  /**
   * Updates the title and content of an existing document.
   * 
   * @param id - The document ID to update.
   * @param title - The new title for the document.
   * @param content - The new content for the document.
   * @returns The updated document object.
   */
  async updateDocument(id: number, title: string, content: string): Promise<Document> {
    const document = await this.documentsRepository.findOne(id);
    document.title = title;
    document.content = content;
    return this.documentsRepository.save(document);
  }

   /**
   * Deletes a document by its ID.
   * 
   * @param id - The document ID to delete.
   */
   async deleteDocument(id: number): Promise<void> {
    await this.documentsRepository.delete(id);
  }
}
