export class UserNotFoundException extends Error {
    constructor(public readonly email: string) {
        super(`User "${email}" not found`);
    }

}