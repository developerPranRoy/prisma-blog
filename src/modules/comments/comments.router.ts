import { Router } from "express";
import { commentController } from "./comments.controller";
import { auth } from "../../middlewares/auth.middleware";
import { Role } from "../../../generated/prisma/enums";

const router = Router();
router.get("/author/:authorId", commentController.getCommentsByAuthor);

router.patch("/:commentId/moderate", auth(Role.ADMIN), commentController.moderateComment);

router.get("/", commentController.getAllComments);

// router.get("/:commentId", commentController.getSingleComment);

router.post("/", auth(Role.USER, Role.ADMIN), commentController.createComment);

router.patch("/:commentId", auth(Role.USER, Role.ADMIN), commentController.updateComment);

router.delete("/:commentId", auth(Role.USER, Role.ADMIN), commentController.deleteComment);

export const commentRoutes = router;