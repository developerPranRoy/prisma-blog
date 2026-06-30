import { Router } from "express";
import { postController } from "./post.controller";
import { auth } from "../../middlewares/auth.middleware";
import { Role } from "../../../generated/prisma/enums";


const router = Router();

router.post("/", auth(Role.ADMIN, Role.AUTHOR, Role.USER), postController.createPost);

router.get("/", postController.getAllPosts);

router.get("/my-posts", auth(Role.ADMIN, Role.AUTHOR, Role.USER), postController.getMyPosts);

router.get("/stats", auth(Role.ADMIN), postController.getPostStats);

router.get("/:postId", postController.getSinglePost);

router.patch("/:postId", auth(Role.ADMIN,Role.AUTHOR), postController.updatePost);

router.delete("/:postId", auth(Role.ADMIN, Role.AUTHOR), postController.deletePost);
export const postRoutes = router;