import express from "express";
import { likeController } from "../controllers/like.controller.js";

const likeRouter = express.Router();
//console.log("like router loaded");

likeRouter.post("/toogleLike",likeController.toogleLike);
//likeRouter.get("/restaurant:/:resId",likeController.getLikesByRestaurant)
likeRouter.get("/restaurant/:resId", likeController.getLikesByRestaurant);

likeRouter.get("/user/:userId",likeController.getLikesByUser);
export default likeRouter;