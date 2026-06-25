import bcrypt from "bcryptjs";
import { prisma } from "../../lib/prisma";
import { ILoginUser } from "./type"
import jwt, { SignOptions } from 'jsonwebtoken';
import config from "../../config";
import { jwtToken } from "../../utils/jwtSecret";


const loginUser = async (payload: ILoginUser) => {
    const { email, password } = payload;

    const user = await prisma.user.findUniqueOrThrow({
        where: { email }
    })
    const machtPassword = await bcrypt.compare(password, user.password)
    if (!machtPassword) {
        throw new Error("Password wrong!")
    }

    const jwtPayload = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
    }

    const accessToken = jwtToken.createJwt(jwtPayload, config.jwt_access_secret,
        config.jwt_access_expires_in as SignOptions)

    const refreshToken = jwtToken.createJwt(jwtPayload, config.jwt_refresh_secret, {
        expiresIn: config.jwt_refresh_expires_in
    } as SignOptions)
    return { accessToken, refreshToken }
}


export const authService = {
    loginUser,

}