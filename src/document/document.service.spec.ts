import { Test, TestingModule } from '@nestjs/testing';
import { DocumentService } from './document.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Document } from './entities/document.entity';
import { UserService } from '../user/user.service';
import { User } from '../user/entities/user.entity';

// Mock data for testing
const mockUser = {
  id: 1,
  username: 'testuser',
  password: 'testpassword',
  role: 'user',
};

const mockDocument = {
  id: 1,
  title: 'Test Document',
  description: 'Test content',
  user: mockUser,
};

describe('DocumentService', () => {
  let documentService: DocumentService;
  let documentRepository: Repository<Document>;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DocumentService,
        UserService,
        {
          provide: getRepositoryToken(Document),
          useClass: Repository,
        },
        {
          provide: UserService,
          useValue: {
            findById: jest.fn().mockResolvedValue(mockUser), // Mocking findById method
          },
        },
      ],
    }).compile();

    documentService = module.get<DocumentService>(DocumentService);
    documentRepository = module.get<Repository<Document>>(getRepositoryToken(Document));
    userService = module.get<UserService>(UserService);
  });

  describe('createDocument', () => {
    it('should create a new document and associate it with the user', async () => {
      const createDocumentDto = { title: 'Test Document', content: 'Test content' };

      // Mock the documentRepository.save() method
      jest.spyOn(documentRepository, 'save').mockResolvedValue(mockDocument as any);

      const document = await documentService.createDocument(
        mockUser.id,
        createDocumentDto.title,
        createDocumentDto.content,
      );

      expect(document).toBeDefined();
      expect(document.title).toBe(createDocumentDto.title);
      expect(document.description).toBe(createDocumentDto.content);
      expect(document.user.id).toBe(mockUser.id);
    });
  });

  describe('getDocuments', () => {
    it('should return all documents', async () => {
      const documents = [mockDocument];

      // Mock the documentRepository.find() method
      jest.spyOn(documentRepository, 'find').mockResolvedValue(documents as any);

      const result = await documentService.getDocuments();
      expect(result).toEqual(documents);
    });
  });

  describe('getDocument', () => {
    it('should return a document by its ID', async () => {
      // Mock the documentRepository.findOne() method
      jest.spyOn(documentRepository, 'findOne').mockResolvedValue(mockDocument as any);

      const document = await documentService.getDocument(mockDocument.id);

      expect(document).toBeDefined();
      expect(document.id).toBe(mockDocument.id);
      expect(document.title).toBe(mockDocument.title);
    });

    it('should return null if the document is not found', async () => {
      // Mock the documentRepository.findOne() method to return null
      jest.spyOn(documentRepository, 'findOne').mockResolvedValue(null);

      const document = await documentService.getDocument(999); // An ID that doesn't exist
      expect(document).toBeNull();
    });
  });

  describe('updateDocument', () => {
    it('should update the document title and content', async () => {
      const updatedDocument = { ...mockDocument, title: 'Updated Title', description: 'Updated Content' };

      // Mock the documentRepository.findOne() and save() methods
      jest.spyOn(documentRepository, 'findOne').mockResolvedValue(mockDocument as any);
      jest.spyOn(documentRepository, 'save').mockResolvedValue(updatedDocument as any);

      const document = await documentService.updateDocument(
        mockDocument.id,
        'Updated Title',
        'Updated Content',
      );

      expect(document).toBeDefined();
      expect(document.title).toBe('Updated Title');
      expect(document.description).toBe('Updated Content');
    });
  });

  describe('deleteDocument', () => {
    it('should delete a document by its ID', async () => {
      // Mock the documentRepository.delete() method
      jest.spyOn(documentRepository, 'delete').mockResolvedValue({ affected: 1 } as any);

      const deleteResult = await documentService.deleteDocument(mockDocument.id);

      expect(deleteResult).toBeUndefined();
      expect(documentRepository.delete).toHaveBeenCalledWith(mockDocument.id);
    });

    it('should not delete if document does not exist', async () => {
      // Mock the documentRepository.delete() method to simulate a document not found case
      jest.spyOn(documentRepository, 'delete').mockResolvedValue({ affected: 0 } as any);

      const deleteResult = await documentService.deleteDocument(999);

      expect(deleteResult).toBeUndefined();
      expect(documentRepository.delete).toHaveBeenCalledWith(999);
    });
  });
});
