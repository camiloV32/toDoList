import { Injectable, NestMiddleware, UnauthorizedException } from "@nestjs/common";
import { Request, Response } from "express";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class JwtVerifyMiddleware implements NestMiddleware {
    constructor(private readonly jwtService: JwtService) {}

    use(req: Request, res: Response, next: (error?: any) => void) {
        const { authorization } = req.headers;

        if (!authorization || !authorization.startsWith("Bearer ")) {
            throw new UnauthorizedException("Token no proporcionado");
        }
        
        const token = authorization.split(" ")[1];

        try {
            const payload = this.jwtService.verify(token);
            req.body.userId = payload.userId; 
            next();
        } catch (error) {
            throw new UnauthorizedException("Token inválido o expirado");
        }
    }
}
