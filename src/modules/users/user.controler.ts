import { NextFunction, Request, Response } from "express";
import { userService } from "./user.service"
import httpStatus from 'http-status';
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { JwtPayload } from "jsonwebtoken";
import config from "../../config";
import { jwtToken } from "../../utils/jwtSecret";



const createUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body
    const user = await userService.createUsersDb(payload)

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "User Created succesfully",
        data: {
            user
        }

    })
})

const getMyProfile = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    // const { accessToken } = req.cookies;
    // console.log(req.user, " req");
    // const varifyToken = jwtToken.varifyToken(accessToken, config.jwt_access_secret) as JwtPayload & {
    //     id: string
    // };

    const profile = await userService.getMyProfileDB(req.user?.id as string);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "User profile fetched successfully",
        data: {
            profile
        }
    })
})

const updateMyProfile = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const userId = req.user?.id;
    const payload = req.body;

    const updateProfile = await userService.updateMyProfileDB(userId as string, payload)
    
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Profile updated successfully.",
        data: {
            updateProfile
        }
    })
})

export const userController = {
    createUser,
    getMyProfile,
    updateMyProfile,


}