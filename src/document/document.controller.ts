// src/document/document.controller.ts
import { Controller, Post, Get, Param, Body, Put, Delete } from '@nestjs/common';
import { DocumentService } from './document.service';

/**
 * DocumentController handles CRUD operations related to documents,
 * such as uploading, viewing, updating, and deleting documents.
 */
@Controller('document')
export class DocumentController {
  constructor(private readonly documentService: DocumentService) {}

  /**
   * Uploads a new document for a user. The user ID must be provided along with the document data.
   * 
   * @param body - The body of the request containing the userId, title, and content of the document.
   * @returns The newly created document object.
   * 
   * Example request body:
   * {
   *   "userId": 1,
   *   "title": "New Document Title",
   *   "content": "Document content goes here."
   * }
   */
  @Post('upload')
  async uploadDocument(@Body() body: { userId: number; title: string; content: string }) {
    const { userId, title, content } = body;
    return this.documentService.createDocument(userId, title, content);
  }

  /**
   * Fetches all documents uploaded by all users.
   * 
   * @returns A list of document objects.
   */
  @Get()
  async getAllDocuments() {
    return this.documentService.getDocuments();
  }

  /**
   * Fetches a document by its ID.
   * 
   * @param id - The ID of the document to fetch.
   * @returns The document object.
   */
  @Get(':id')
  async getDocument(@Param('id') id: number) {
    return this.documentService.getDocument(id);
  }

  /**
   * Updates a document's title and content by its ID.
   * 
   * @param id - The ID of the document to update.
   * @param body - The new title and content of the document.
   * @returns The updated document object.
   * 
   * Example request body:
   * {
   *   "title": "Updated Document Title",
   *   "content": "Updated content."
   * }
   */
  @Put(':id')
  async updateDocument(
    @Param('id') id: number,
    @Body() body: { title: string; content: string },
  ) {
    const { title, content } = body;
    return this.documentService.updateDocument(id, title, content);
  }

  /**
   * Deletes a document by its ID.
   * 
   * @param id - The ID of the document to delete.
   * @returns A confirmation message indicating that the document was deleted.
   */
  @Delete(':id')
  async deleteDocument(@Param('id') id: number) {
    await this.documentService.deleteDocument(id);
    return { message: 'Document deleted successfully' };
  }
}
