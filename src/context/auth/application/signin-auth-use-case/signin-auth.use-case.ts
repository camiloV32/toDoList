import { Injectable } from "@nestjs/common";
import { SignInDto } from "./signin-auth.dto";
import { AuthRepository } from "../../domain/auth.repository";
import { Auth, PrimitiveAuthServer, PrimitivePublicAuth } from "../../domain/auth.entity";

@Injectable()
export class SignInUseCase {
    constructor(private readonly authRepository: AuthRepository) {}

    async run(dto:SignInDto): Promise<PrimitivePublicAuth>{
        const user = Auth.signIn(dto);

        await this.authRepository.signIn(user);

        const {userId, username, email} = user.toPrimitives();
        
        return {
            userId,
            username,
            email
        }
    }
}
