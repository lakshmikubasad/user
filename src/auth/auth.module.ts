import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt'; // For JWT handling
import { JwtStrategy } from './ jwt.strategy'; // Your JWT Strategy
import { AuthService } from './auth.service'; // Your AuthService
import { UserModule } from '../user/user.module'; // Import the UserModule to make UserService available

@Module({
  imports: [JwtModule.register({
    secret: process.env.JWT_SECRET || 'default-secret', // Secret key for JWT
    signOptions: { expiresIn: '1h' }, // JWT expiration time
  }), UserModule], // Add UserModule here
  providers: [AuthService, JwtStrategy],
  exports: [AuthService], // Export AuthService if you need it in other modules
})
export class AuthModule {}
