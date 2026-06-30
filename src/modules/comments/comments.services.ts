import { CommentsSatus } from "../../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";


const createCommentDb = async (payload: any) => {
    const comment = await prisma.comment.create({
        data: payload,
    });

    return comment;
};

const getAllCommentsDb = async () => {
    const comments = await prisma.comment.findMany({
        include: {
            author: true,
            post: true,
        },
    });

    return comments;
};

const getSingleCommentDb = async (id: string) => {
    const comment = await prisma.comment.findUnique({
        where: { id },
        include: {
            author: true,
            post: true,
        },
    });

    return comment;
};

const updateCommentDb = async (id: string, payload: any) => {
    const comment = await prisma.comment.update({
        where: { id },
        data: payload,
    });

    return comment;
};

const deleteCommentDb = async (id: string) => {
    const comment = await prisma.comment.delete({
        where: { id },
    });

    return comment;
};

const getCommentsByAuthorDb = async (authorId: string) => {
    const comments = await prisma.comment.findMany({
        where: {
            authorId,
        },
        include: {
            author: true,
            post: true,
        },
    });

    return comments;
};

const moderateCommentDb = async (
    commentId: string,
    status: CommentsSatus
) => {
    const comment = await prisma.comment.update({
        where: {
            id: commentId,
        },
        data: {
            status,
        },
    });

    return comment;
};

export const commentService = {
    createCommentDb,
    getAllCommentsDb,
    getSingleCommentDb,
    updateCommentDb,
    deleteCommentDb,
    getCommentsByAuthorDb,
    moderateCommentDb,
};