import jwt, { JwtPayload, SignOptions } from "jsonwebtoken"

const createJwt = (payload: JwtPayload, secret: string, expiresin: SignOptions) => {
    const token = jwt.sign(payload, secret, {

    } as SignOptions)
    return token;
}
export const jwtToken = {
    createJwt,
}