import { NextFunction, Request, Response } from "express";
import { userService } from "./user.service"
import httpStatus from 'http-status';
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";



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


export const userController = {
    createUser,

}