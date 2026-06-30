import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync"
import { authService } from "./auth.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from 'http-status';


const loginUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body;

    const { accessToken, refreshToken } = await authService.loginUserDB(payload);

    res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: false,
        sameSite: "none",
        maxAge: 1000 * 60 * 60 * 48
    })
    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: "none",
        maxAge: 1000 * 60 * 60 * 24 * 7

    })

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "User login sucfesfully!",
        data: { accessToken, refreshToken }

    })
})

const refreshToken = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const refreshToken = req.cookies.refreshToken;
    const { accesseToken } = await authService.refreshTokenDB(refreshToken);

    res.cookie("accessToken", accesseToken, {
        httpOnly: true,
        secure: false,
        sameSite: "none",
        maxAge: 1000 * 60 * 60 * 48
    })
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Token refresh success",
        data: {
            accesseToken
        }
    })
})

export const authController = {
    loginUser,
    refreshToken,
}