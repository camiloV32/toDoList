import { Module } from "@nestjs/common";
import { PrismaModule } from "src/prisma/prisma.module";
import { SignInUseCase } from "../application/signin-auth-use-case/signin-auth.use-case";
import { SignInAuthController } from "./http-api/signIn-auth/signIn-auth.controller";
import { InMemoryAuthRepository } from "./repositories/in-memory.auth-respository";
import { AuthRepository } from "../domain/auth.repository";
import { LocalStrategy } from "./strategies/local.strategy";
import { LoginUseCase } from "../application/login-auth-use-case/login-auth.use-case";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { SECRET } from "constants/jwt-key";
import { LogInAuthController } from "./http-api/logIn-auth/logIn-auth.controller";
import { JwtStrategy } from "./strategies/jwt.strategy";
import { PrismaService } from "src/prisma/prisma.service";

@Module({
    imports: [
        PrismaModule,
        PassportModule,
        JwtModule.register({
            secret: SECRET,
            signOptions: { expiresIn: '10m' },
        })
    ],
    controllers: [SignInAuthController, LogInAuthController],
    providers: [
        SignInUseCase,
        LoginUseCase,
        InMemoryAuthRepository,
        LocalStrategy,
        JwtStrategy,
        PrismaService,
        {
            provide: AuthRepository,
            useExisting: InMemoryAuthRepository
        }
    ],
    exports: [SignInUseCase, LoginUseCase]
})

export class AuthModule {}