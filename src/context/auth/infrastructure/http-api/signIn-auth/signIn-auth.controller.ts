import { Body, Controller, HttpCode, Post } from "@nestjs/common";
import { v4 as uuidv4 } from 'uuid';

import { SignInUseCase } from "src/context/auth/application/signin-auth-use-case/signin-auth.use-case";
import { SignInHttpDto } from "./signIn-auth.http-dto";
import { PrimitivePublicAuth } from "src/context/auth/domain/auth.entity";
import { AUTH_ROUTE } from "../route.constants";


@Controller(AUTH_ROUTE)
export class SignInAuthController {
  constructor(private readonly signInUseCase: SignInUseCase) {}

  @Post("/signIn")
  @HttpCode(201)
  async run(
    @Body() signInHttpDto: SignInHttpDto,
  ): Promise<PrimitivePublicAuth> {

    return await this.signInUseCase.run({
        userId: uuidv4(),
        username: signInHttpDto.username,
        email: signInHttpDto.email,
        password: signInHttpDto.password,
    });
  }
}