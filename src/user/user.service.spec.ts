import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

describe('UserService', () => {
  let userService: UserService;
  let userRepository: Repository<User>;

  // Mocked data for testing
  const mockUser = {
    id: 1,
    username: 'testuser',
    password: 'hashedpassword',
    role: 'admin',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            save: jest.fn().mockResolvedValue(mockUser),
            findOne: jest.fn().mockResolvedValue(mockUser),
            update: jest.fn().mockResolvedValue(undefined),
            delete: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  describe('create', () => {
    it('should create a new user', async () => {
      const username = 'testuser';
      const password = 'hashedpassword';
      const role = 'admin';

      const result = await userService.create(username, password, role);

      expect(result).toEqual(mockUser);
      expect(userRepository.save).toHaveBeenCalledWith({
        username,
        password,
        role,
      });
    });
  });

  describe('findByUsername', () => {
    it('should return a user by username', async () => {
      const username = 'testuser';

      const result = await userService.findByUsername(username);

      expect(result).toEqual(mockUser);
      expect(userRepository.findOne).toHaveBeenCalledWith({
        where: { username },
      });
    });

    it('should return undefined if user not found', async () => {
      userRepository.findOne.mockResolvedValueOnce(undefined); // Simulate no user found

      const result = await userService.findByUsername('nonexistentuser');

      expect(result).toBeUndefined();
      expect(userRepository.findOne).toHaveBeenCalledWith({
        where: { username: 'nonexistentuser' },
      });
    });
  });

  describe('findById', () => {
    it('should return a user by id', async () => {
      const id = 1;

      const result = await userService.findById(id);

      expect(result).toEqual(mockUser);
      expect(userRepository.findOne).toHaveBeenCalledWith(id);
    });

    it('should return undefined if user not found', async () => {
      userRepository.findOne.mockResolvedValueOnce(undefined); // Simulate no user found

      const result = await userService.findById(999);

      expect(result).toBeUndefined();
      expect(userRepository.findOne).toHaveBeenCalledWith(999);
    });
  });

  describe('updateRole', () => {
    it('should update the role of an existing user', async () => {
      const id = 1;
      const role = 'editor';

      await userService.updateRole(id, role);

      expect(userRepository.update).toHaveBeenCalledWith(id, { role });
    });
  });

  describe('deleteUser', () => {
    it('should delete a user by id', async () => {
      const id = 1;

      await userService.deleteUser(id);

      expect(userRepository.delete).toHaveBeenCalledWith(id);
    });

    it('should throw an error if user is not found during deletion', async () => {
      userRepository.findOne.mockResolvedValueOnce(undefined); // Simulate no user found

      await expect(userService.deleteUser(999)).rejects.toThrow('User not found');
    });
  });
});
