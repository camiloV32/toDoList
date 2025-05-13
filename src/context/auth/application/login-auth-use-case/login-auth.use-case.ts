import { LoginAuthDto } from "./login-auth.dto";
import { Injectable } from "@nestjs/common";
import { AuthRepository } from "../../domain/auth.repository";
import { UserNotFoundException } from "../../domain/user-not-found.exception";

@Injectable()
export class LoginUseCase {
    constructor(private readonly authRepository: AuthRepository) {}

    async run(dto: LoginAuthDto): Promise<{access_token: string}>{
        const { email, password } = dto;
        const user = await this.authRepository.logIn( email, password );

        if(!user){
            throw new UserNotFoundException(dto.email)
        }

        return user;
    }
}


