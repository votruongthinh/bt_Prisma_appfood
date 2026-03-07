import express from "express";
import foodRouter from "./food.router.js";
import likeRouter from "./like.router.js";
const rootRouter = express.Router();

rootRouter.use("/food", foodRouter);
rootRouter.use("/like",likeRouter)

export default rootRouter;