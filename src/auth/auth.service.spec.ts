import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';

describe('AuthService', () => {
  let authService: AuthService;
  let userService: UserService;
  let jwtService: JwtService;
  let userRepository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        UserService,
        JwtService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    userService = module.get<UserService>(UserService);
    jwtService = module.get<JwtService>(JwtService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should register a new user', async () => {
    const newUser = {
      username: 'testuser',
      password: 'testpassword',
      role: 'user',
    };

    const createdUser = await authService.register(
      newUser.username,
      newUser.password,
      newUser.role,
    );

    expect(createdUser).toBeDefined();
    expect(createdUser.username).toBe(newUser.username);
    expect(createdUser.role).toBe(newUser.role);
    expect(bcrypt.compareSync(newUser.password, createdUser.password)).toBe(true);
  });

  it('should login a user and return a JWT token', async () => {
    const user = {
      username: 'testuser',
      password: 'testpassword',
      role: 'user',
    };

    const createdUser = await userRepository.save(user);

    const loginResponse = await authService.login(createdUser);

    expect(loginResponse).toHaveProperty('access_token');
    expect(typeof loginResponse.access_token).toBe('string');
  });

  it('should validate a user with correct password', async () => {
    const user = {
      username: 'testuser',
      password: 'testpassword',
      role: 'user',
    };

    const createdUser = await userRepository.save(user);

    const validatedUser = await authService.validateUser(
      createdUser.username,
      createdUser.password,
    );

    expect(validatedUser).toBeDefined();
    expect(validatedUser.username).toBe(user.username);
  });

  it('should return null for invalid user password', async () => {
    const user = {
      username: 'testuser',
      password: 'testpassword',
      role: 'user',
    };

    const createdUser = await userRepository.save(user);

    const invalidUser = await authService.validateUser(
      createdUser.username,
      'wrongpassword',
    );

    expect(invalidUser).toBeNull();
  });
});
