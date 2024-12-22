import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { User } from './entities/user.entity'; // Your User entity

@Module({
  imports: [TypeOrmModule.forFeature([User])], // Include User entity for DB operations
  providers: [UserService], // Provide UserService
  exports: [UserService], // Export UserService so other modules can use it
})
export class UserModule {}
