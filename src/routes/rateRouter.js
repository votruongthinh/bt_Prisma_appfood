import express from "express";

import { rateController } from "../controllers/rate.controller.js";

const rateRouter = express.Router();

rateRouter.post("", rateController.createOrUpdateRate);

// Lấy danh sách đánh giá theo nhà hàng
rateRouter.get("/restaurant/:resId", rateController.getRatesByRestaurant);

// Lấy danh sách đánh giá theo user
rateRouter.get("/user/:userId", rateController.getRatesByUser);
export default rateRouter;
