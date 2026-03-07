import express from "express";
import { likeController } from "../controllers/like.controller.js";

const likeRouter = express.Router();
//console.log("like router loaded");

likeRouter.post("/toogleLike",likeController.toogleLike);
likeRouter.post("/",likeController.likeRestaurant);
likeRouter.get("/test", (req,res)=>{
    res.json("like router working");
 });
likeRouter.delete("/",likeController.unlikeRestaurant);
export default likeRouter;