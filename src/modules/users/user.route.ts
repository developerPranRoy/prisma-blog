import { Router } from "express";
import { userController } from "./user.controler";


const router = Router();
router.post("/register", userController.createUser)

export const userRouter = router
