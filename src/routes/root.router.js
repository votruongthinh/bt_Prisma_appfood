import express from "express";
import foodRouter from "./food.router.js";
import likeRouter from "./like.router.js";
import rateRouter from "./rateRouter.js";
import orderRouter from "./order.router.js";
const rootRouter = express.Router();

rootRouter.use("/food", foodRouter);
rootRouter.use("/like",likeRouter)
rootRouter.use("/rate",rateRouter);
rootRouter.use("/order",orderRouter);
export default rootRouter;