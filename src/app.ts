import cookieParser from "cookie-parser";
import express, { Application, NextFunction, Request, Response, } from "express";
import cors from "cors"
import config from "./config";
import { prisma } from "./lib/prisma";
import { userRouter } from "./modules/users/user.route";
import { authRouter } from "./modules/auth/auth.route";
import { commentRoutes } from "./modules/comments/comments.router";
import { postRoutes } from "./modules/post/post.router";


const app: Application = express();
app.use(cors({
  origin: config.app_url,
  credentials: true

}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser());

app.get('/', async (req: Request, res: Response) => {
  const user = await prisma.user.findMany()
  console.log(user);
  res.send('Hello World!')
})

app.use("/api/users", userRouter)
app.use("/api/auth", authRouter)
app.use("/api/comments", commentRoutes);
app.use("/api/posts", postRoutes);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({
    success: false,
    message: err.message,
    error: err,
  });
});


export default app;