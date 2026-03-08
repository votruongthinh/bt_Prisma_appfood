import express from 'express';
import { orderController } from '../controllers/order.controller.js';
const orderRouter = express.Router();

orderRouter.post("",orderController.createOrder);
// Lấy danh sách order theo user
orderRouter.get("/user/:userId", orderController.getOrdersByUser);

// Lấy danh sách order theo food
orderRouter.get("/food/:foodId", orderController.getOrdersByFood);

// Lấy chi tiết order
orderRouter.get("/:orderId", orderController.getOrderById);

// Cập nhật order
orderRouter.put("", orderController.updateOrder);

// Xoá order
orderRouter.delete("/:orderId", orderController.deleteOrder);
export default orderRouter;