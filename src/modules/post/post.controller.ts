import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import { postService } from "./post.services";
import { sendResponse } from "../../utils/sendResponse";


const createPost = catchAsync( async (req: Request, res: Response, next: NextFunction) => {
        const id = req.user?.id
        const payload = req.body;

        const post = await postService.createPostDb(payload, id as string);

        sendResponse(res, {
            success: true,
            statusCode: httpStatus.CREATED,
            message: "Post created successfully",
            data: post,
        });
    }
);

const getAllPosts = catchAsync( async (req: Request, res: Response, next: NextFunction) => {
        const posts = await postService.getAllPostsDb();

        sendResponse(res, {
            success: true,
            statusCode: httpStatus.OK,
            message: "Posts retrieved successfully",
            data: posts,
        });
    }
);

const getSinglePost = catchAsync( async (req: Request, res: Response, next: NextFunction) => {
        const { postId } = req.params;
        //   console.log(" Id",postId);

        const post = await postService.getSinglePostDb(postId as string);

        sendResponse(res, {
            success: true,
            statusCode: httpStatus.OK,
            message: "Post retrieved successfully",
            data: post,
        });
    }
);

const updatePost = catchAsync( async (req: Request, res: Response, next: NextFunction) => {
        const authorId = req.user?.id;
        const isAdmin = req.user?.role === "ADMIN";
        const { postId } = req.params;
        const payload = req.body;

        const post = await postService.updatePostDb(postId as string, authorId as string, isAdmin, payload);

        sendResponse(res, {
            success: true,
            statusCode: httpStatus.OK,
            message: "Post updated successfully",
            data: post,
        });
    }
);

const deletePost = catchAsync(async (req: Request, res: Response) => {
    const { postId } = req.params;
    const authorId = req.user?.id;
    const isAdmin = req.user?.role === "ADMIN";

    const result = await postService.deletePostDb(postId as string, authorId as string, isAdmin
    );

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Post deleted successfully",
        data: result,
    });
});

const getMyPosts = catchAsync(async (req: Request, res: Response) => {
    const userId = req.user!.id;

    const posts = await postService.getMyPostsDb(userId);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "My Posts Retrieved Successfully",
        data: posts,
    });
});

const getPostStats = catchAsync(async (req: Request, res: Response) => {
    const stats = await postService.getPostStatsDb();

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Post Stats Retrieved Successfully",
        data: stats,
    });
});

export const postController = {
    createPost,
    getAllPosts,
    getSinglePost,
    updatePost,
    deletePost,
    getMyPosts,
    getPostStats,
};