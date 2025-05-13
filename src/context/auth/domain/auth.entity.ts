
type UUID = string;
export interface PrimitiveAuthServer {
    userId: UUID;
    username: string;
    email: string;
    password: string;
}

export type PrimitivePublicAuth = Omit<PrimitiveAuthServer, 'password'>;


export class Auth{
    constructor(private attributes: PrimitiveAuthServer){}

    static signIn(signInUser: PrimitiveAuthServer): Auth{
        return new Auth({
            userId: signInUser.userId,
            username: signInUser.username,
            email: signInUser.email,
            password: signInUser.password,
        })
    }

    toPrimitives(): PrimitiveAuthServer {
        return {
            userId: this.attributes.userId,
            username: this.attributes.username,
            email: this.attributes.email,
            password: this.attributes.password
        }
    }
}