import { Auth, PrimitiveAuthServer } from "./auth.entity";

export abstract class AuthRepository {
    abstract signIn(auth: Auth): Promise<PrimitiveAuthServer>;
    abstract logIn(email: string, password: string): Promise<{access_token: string} | null>;
}