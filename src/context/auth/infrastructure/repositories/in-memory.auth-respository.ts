import { Injectable, InternalServerErrorException, UnauthorizedException } from "@nestjs/common";
import * as bcrypt from "bcrypt";

import { AuthRepository } from "../../domain/auth.repository";
import { PrismaService } from "src/prisma/prisma.service";
import { Auth, PrimitiveAuthServer, PrimitivePublicAuth } from "../../domain/auth.entity";
import { JwtService } from "@nestjs/jwt";


@Injectable()
export class InMemoryAuthRepository extends AuthRepository{
    constructor(private prisma: PrismaService, private jwtService: JwtService) {
        super();
    }
    async signIn(auth: Auth): Promise<PrimitiveAuthServer> {
        try{
            const { userId, username, email, password } = auth.toPrimitives();
            const salts = await bcrypt.genSalt();
            const hash = await bcrypt.hash(password, salts);
            const newUser = await this.prisma.user.create({
                data: { userId, username, email, password: hash },
            })
            
            return newUser;
        }catch (error){
            throw new InternalServerErrorException(error.message);
        }
    }

    async logIn(email: string, password: string): Promise<{access_token: string} | null> {
        try {
            const user = await this.prisma.user.findUnique({ where: { email }});
            const matchResult = await bcrypt.compare(password, user?.password ?? "");

            if(user && matchResult){
                return this.generateJWT({
                    userId: user.userId,
                    email: user.email,
                    username: user.username
                })
            }else{
                return null;
            }
        } catch (error) {
            throw new UnauthorizedException(error.message);
        }
    }

    generateJWT(payload: PrimitivePublicAuth): {access_token:string }{
        return {
            access_token: this.jwtService.sign(payload),
        } 
    }
}