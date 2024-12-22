  import { Injectable } from '@nestjs/common';
  import { InjectRepository } from '@nestjs/typeorm';
  import { Repository } from 'typeorm';
  import { User } from './entities/user.entity';

  /**
   * User Service that handles all operations related to users (CRUD operations).
   */
  @Injectable()
  export class UserService {
    constructor(
      @InjectRepository(User)
      private usersRepository: Repository<User>, // Inject the User repository
    ) {}

    /**
     * Creates a new user and saves it to the database.
     * 
     * @param username - The username of the new user.
     * @param password - The hashed password of the user.
     * @param role - The role of the new user (admin, editor, or viewer).
     * @returns The created user object.
     */
    async create(username: string, password: string, role: string): Promise<User> {
      const user = new User();
      user.username = username;
      user.password = password;
      user.role = role;
      return this.usersRepository.save(user);
    }

    /**
     * Finds a user by their username.
     * 
     * @param username - The username to search for.
     * @returns The user object or undefined if not found.
     */
    async findByUsername(username: string): Promise<User | undefined> {
      return this.usersRepository.findOne({ where: { username } });
    }

    /**
     * Finds a user by their ID.
     * 
     * @param id - The user ID to search for.
     * @returns The user object or undefined if not found.
     */
    async findById(id: number): Promise<User | undefined> {
      return this.usersRepository.findOne(id);
    }

    /**
     * Updates the role of a user by their ID.
     * 
     * @param id - The user ID to update.
     * @param role - The new role for the user.
     */
    async updateRole(id: number, role: string): Promise<void> {
      await this.usersRepository.update(id, { role });
    }

    /**
     * Delete the user from the database (admin can perform this)
     * 
     * @param id - The user ID to update.
     */
    async deleteUser(id: number): Promise<void> {
      const user = await this.usersRepository.findOneBy({ id });

      if (!user) {
        throw new Error('User not found');
      }

      // Delete the user from the database
      await this.usersRepository.delete(id);
    }
  }
