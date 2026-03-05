import express from "express";
import{ foodController } from "../controllers/food.controller.js";
const foodRouter = express.Router();

foodRouter.get("", foodController.findAll);

export default foodRouter;