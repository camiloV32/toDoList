import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginUseCase } from '../../application/login-auth-use-case/login-auth.use-case';
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private loginUseCase: LoginUseCase) {
    super();
  }

  async validate(email: string, password: string): Promise<any> {
    const user = await this.loginUseCase.run({email, password});
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}