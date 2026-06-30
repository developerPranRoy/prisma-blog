import jwt, { JwtPayload, SignOptions } from "jsonwebtoken"

const createJwt = (payload: JwtPayload, secret: string, expiresin: SignOptions) => {
    const token = jwt.sign(payload, secret, {

    } as SignOptions)
    return token;
}

const varifyToken = (token: string, secret: string) => {
    try {
        const varifiedToken = jwt.verify(token, secret);
        return varifiedToken;

    } catch (error: any) {
        throw new Error(error.message);
    }
}
export const jwtToken = {
    createJwt,
    varifyToken,
}