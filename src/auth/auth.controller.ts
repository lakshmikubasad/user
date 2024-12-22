// src/auth/auth.controller.ts
import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';

/**
 * AuthController handles all authentication-related operations
 * such as user registration, login, and JWT token generation.
 */
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * Registers a new user by calling the AuthService's register method.
   * 
   * This endpoint takes a username, password, and role, hashes the password,
   * and stores the user in the database. After successful registration,
   * it returns a JWT token for the newly created user.
   * 
   * @param body - The body of the request containing the username, password, and role.
   * 
   * Example request body:
   * {
   *   "username": "user1",
   *   "password": "password123",
   *   "role": "admin"
   * }
   * 
   * @returns The JWT token for the newly registered user.
   */
  @Post('register')
  async register(@Body() body: { username: string; password: string; role: string }) {
    const { username, password, role } = body;
    try {
      return await this.authService.register(username, password, role);
    } catch (error) {
      throw new HttpException(
        'Registration failed. Please try again.',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  /**
   * Logs in a user by validating their credentials and returning a JWT token.
   * 
   * This endpoint validates the user by checking the provided username and password.
   * If valid, it generates a JWT token with the user's details (username, id, and role).
   * 
   * @param body - The body of the request containing the username and password.
   * 
   * Example request body:
   * {
   *   "username": "user1",
   *   "password": "password123"
   * }
   * 
   * @returns The JWT token for the authenticated user.
   * @throws HttpException if the username or password is incorrect.
   */
  @Post('login')
  async login(@Body() body: { username: string; password: string }) {
    const { username, password } = body;
    try {
      // Validate user credentials
      const user = await this.authService.validateUser(username, password);
      if (!user) {
        throw new HttpException('Invalid username or password', HttpStatus.UNAUTHORIZED);
      }

      // Generate JWT token after successful validation
      return this.authService.login(user);
    } catch (error) {
      throw new HttpException(
        error.message || 'Login failed. Please try again.',
        error.status || HttpStatus.BAD_REQUEST,
      );
    }
  }
}
