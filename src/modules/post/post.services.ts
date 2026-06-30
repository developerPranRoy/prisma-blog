import { prisma } from "../../lib/prisma";
import { ICreatePostPayload, IUpdatePostPayload } from "./post.interface";


const createPostDb = async (payload: ICreatePostPayload, userId: string) => {
    const post = await prisma.post.create({
        data: {
            ...payload,
            auhtorId: userId
        },
    });

    return post;
};

const getAllPostsDb = async () => {
    const posts = await prisma.post.findMany({
        include: {
            author: {
                omit: {
                    password: true
                }
            },
            comments: true,
        },
    });

    return posts;
};

const getSinglePostDb = async (postId: string) => {

    const post = await prisma.post.findUniqueOrThrow({
        where: { id: postId },
        include: {
            author: {
                omit: {
                    password: true,
                },
            },
            comments: true,
        },
    });
    await prisma.post.update({
        where: { id: postId },
        data: {
            views: {
                increment: 1,
            },
        },
    });



    return post;
};

const updatePostDb = async (postId: string, auhtorId: string, isAdmin: boolean, payload: IUpdatePostPayload) => {
    const post = await prisma.post.findFirstOrThrow({
        where: { id: postId },

    });
    if (!isAdmin && post.auhtorId != auhtorId) {
        throw new Error("You are not the owner of htis post.")
    }

    const result = await prisma.post.update({
        where: {
            id: postId,
        },
        data: payload,
        include: {
            author: {
                omit: {
                    password: true,
                },
            },
            comments: true,
        },
    })

    return result;
};

const deletePostDb = async (postId: string, authorId: string, isAdmin: boolean) => {

    const post = await prisma.post.findUniqueOrThrow({
        where: {
            id: postId,
        },
    });
    if (!isAdmin && post.auhtorId !== authorId) {
        throw new Error("You are not the owner of this post.");
    }

    const result = await prisma.post.delete({
        where: {
            id: postId,
        },
    });

    return result;
};
const getMyPostsDb = async (authorId: string) => {
    const posts = await prisma.post.findMany({
        where: {
            auhtorId: authorId,
        },
        orderBy: {
            createdAt: "desc"
        },
        include: {
            comments: true,
            author: {
                omit: {
                    password: true
                }
            },
            _count: {
                select: {
                    comments: true
                }
            }

        },
    });

    return posts;
};

const getPostStatsDb = async () => {
    const totalPosts = await prisma.post.count();

    const featuredPosts = await prisma.post.count({
        where: {
            isFeatured: true,
        },
    });

    const publishedPosts = await prisma.post.count({
        where: {
            status: "PUBLISHED",
        },
    });

    return {
        totalPosts,
        featuredPosts,
        publishedPosts,
    };
};

export const postService = {
    getMyPostsDb,
    getPostStatsDb,
    createPostDb,
    getAllPostsDb,
    getSinglePostDb,
    updatePostDb,
    deletePostDb,
};