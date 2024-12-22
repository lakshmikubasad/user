import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { ExtractJwt } from 'passport-jwt';
import { UserService } from '../user/user.service'; // UserService for finding users

/**
 * JWT Strategy for Passport authentication.
 * It validates the JWT and retrieves the user's information from the JWT payload.
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Extract JWT from Authorization header
      secretOrKey: process.env.JWT_SECRET,  // Use the secret from environment variable
    });
  }

   /**
   * Validates the JWT token by extracting the user information from it.
   * 
   * @param payload - The decoded JWT payload.
   * @returns The user object corresponding to the payload.
   */
  async validate(payload: JwtPayload) {
    const user = await this.userService.findById(payload.sub);
    return user;
  }
}
