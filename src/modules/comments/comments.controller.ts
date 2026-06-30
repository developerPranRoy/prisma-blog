import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import { commentService } from "./comments.services";
import { sendResponse } from "../../utils/sendResponse";



const createComment = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const payload = req.body;

        const comment = await commentService.createCommentDb(payload);

        sendResponse(res, {
            success: true,
            statusCode: httpStatus.CREATED,
            message: "Comment created successfully",
            data: comment,
        });
    }
);

const getAllComments = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const comments = await commentService.getAllCommentsDb();

        sendResponse(res, {
            success: true,
            statusCode: httpStatus.OK,
            message: "Comments retrieved successfully",
            data: comments,
        });
    }
);

const getSingleComment = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;
      

        const comment = await commentService.getSingleCommentDb(id as string);

        sendResponse(res, {
            success: true,
            statusCode: httpStatus.OK,
            message: "Comment retrieved successfully",
            data: comment,
        });
    }
);

const updateComment = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;
        const payload = req.body;

        const comment = await commentService.updateCommentDb(id as string, payload);

        sendResponse(res, {
            success: true,
            statusCode: httpStatus.OK,
            message: "Comment updated successfully",
            data: comment,
        });
    }
);

const deleteComment = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;

        const comment = await commentService.deleteCommentDb(id as string);

        sendResponse(res, {
            success: true,
            statusCode: httpStatus.OK,
            message: "Comment deleted successfully",
            data: comment,
        });
    }
);

const getCommentsByAuthor = catchAsync(async (req: Request, res: Response) => {
    const { authorId } = req.params;

    const comments = await commentService.getCommentsByAuthorDb(authorId as string);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Comments Retrieved Successfully",
        data: comments,
    });
});

const moderateComment = catchAsync(async (req: Request, res: Response) => {
    const { commentId } = req.params;
    const { status } = req.body;

    const comment = await commentService.moderateCommentDb(
        commentId as string,
        status
    );

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Comment Moderated Successfully",
        data: comment,
    });
});

export const commentController = {
    createComment,
    getAllComments,
    getSingleComment,
    updateComment,
    deleteComment,
    getCommentsByAuthor,
    moderateComment,
};