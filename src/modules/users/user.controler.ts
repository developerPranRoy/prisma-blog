import { Request, Response } from "express";
import { userService } from "./user.service"
import httpStatus from 'http-status';


const createUser = async (req: Request, res: Response) => {
    try {
        const payload = req.body
        const user = await userService.createUsersDb(payload)
        res.status(httpStatus.CREATED).json({
            succes: true,
            statusCode: httpStatus.CREATED,
            message: "User Created Sucesfully",
            data: {
                user
            }
        })
    } catch (error) {
        console.log(error);
        res.status(httpStatus.CREATED).json({
            succes: false,
            statusCode: httpStatus.INTERNAL_SERVER_ERROR,
            message: "Faild to creating user",
            error: (error as Error).message
        })
    }
}


export const userController = {
    createUser,

}