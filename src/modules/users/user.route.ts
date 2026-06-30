import { Router } from "express";
import { userController } from "./user.controler";
import { Role } from "../../../generated/prisma/enums";
import { auth } from "../../middlewares/auth.middleware";


const router = Router();
router.post("/register", userController.createUser)
router.get("/me", auth(Role.ADMIN, Role.AUTHOR, Role.USER), userController.getMyProfile)
router.put("/my-profile",auth(Role.ADMIN, Role.AUTHOR, Role.USER) ,userController.updateMyProfile)

export const userRouter = router
