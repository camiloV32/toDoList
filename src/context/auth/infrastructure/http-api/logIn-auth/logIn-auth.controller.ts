import { Body, Controller, Post, UseGuards } from "@nestjs/common";

import { PrimitivePublicAuth } from "src/context/auth/domain/auth.entity";
import { AUTH_ROUTE } from "../route.constants";
import { LogInHttpDto } from "./logIn-auth.http-dto";
import { LoginUseCase } from "src/context/auth/application/login-auth-use-case/login-auth.use-case";
import { LocalAuthGuard } from "../../guards/local-auth.guard";


@Controller(AUTH_ROUTE)
export class LogInAuthController {
  constructor(private readonly loginUseCase: LoginUseCase) {}

  @Post("/login")
  async run(
    @Body() logInHttpDto: LogInHttpDto,
  ): Promise<{access_token: string}> {

    return await this.loginUseCase.run({
        email: logInHttpDto.email,
        password: logInHttpDto.password,
    });
  }
}