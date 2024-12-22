// src/user/user.controller.ts
import { Controller, Get, Post, Body, Param, Put } from '@nestjs/common';
import { UserService } from './user.service';

/**
 * UserController handles requests related to user management,
 * such as creating users, updating user roles, and fetching user details.
 */
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   * Creates a new user in the system. Only admins can create new users.
   * 
   * @param body - The body of the request containing the username, password, and role.
   * @returns The newly created user object.
   * 
   * Example request body:
   * {
   *   "username": "user1",
   *   "password": "password123",
   *   "role": "editor"
   * }
   */
  @Post('create')
  async createUser(@Body() body: { username: string; password: string; role: string }) {
    const { username, password, role } = body;
    return this.userService.create(username, password, role);
  }

  /**
   * Fetches the user by their unique username.
   * 
   * @param username - The username of the user.
   * @returns The user object.
   */
  @Get(':username')
  async getUser(@Param('username') username: string) {
    return this.userService.findByUsername(username);
  }

  /**
   * Updates the role of a user. Only admins are allowed to update roles.
   * 
   * @param id - The user ID whose role is to be updated.
   * @param role - The new role to assign to the user (admin, editor, viewer).
   * @returns The updated user object.
   */
  @Put(':id/role')
  async updateUserRole(@Param('id') id: number, @Body() body: { role: string }) {
    const { role } = body;
    return this.userService.updateRole(id, role);
  }
}
