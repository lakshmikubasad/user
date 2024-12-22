// src/auth/auth.service.ts
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcryptjs';

/**
 * Authentication Service that handles user login, registration, and JWT generation.
 */
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService, 
    private jwtService: JwtService,
  ) {}

  /**
   * Validates the user by checking if the provided password matches the stored hashed password.
   * 
   * @param username - The username of the user.
   * @param pass - The password provided by the user.
   * @returns The user object if validated, otherwise null.
   */
  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.findByUsername(username);
    if (user && bcrypt.compareSync(pass, user.password)) {
      return user;
    }
    return null;
  }

  /**
   * Generates a JWT token for the user after successful login.
   * 
   * @param user - The user object.
   * @returns The JWT token.
   */
  async login(user: any) {
    const payload = { username: user.username, sub: user.id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  /**
   * Registers a new user by hashing their password and saving to the database.
   * 
   * @param username - The username of the new user.
   * @param password - The password provided by the user.
   * @param role - The role of the user.
   * @returns The created user object.
   */
  async register(username: string, password: string, role: string) {
    const hashedPassword = bcrypt.hashSync(password, 10);
    return this.userService.create(username, hashedPassword, role);
  }
}
