import{ orderService } from "../services/order.service.js";
import { responseSuccess } from "../common/helpers/response.helper.js";
export const orderController = {
    async createOrder(req,res){
        const result = await orderService.createOrder(req);
        const response = responseSuccess(result, "Đặt món thành công");
        res.status(response.statusCode).json(response);
    },
      // Lấy danh sách order theo user
  async getOrdersByUser(req, res) {
    const { userId } = req.params;

    const data = await orderService.getOrdersByUser(userId);
    const count = await orderService.getOrderCountByUser(userId);

    const response = responseSuccess(
      { totalOrders: count, data },
      "Lấy danh sách order của user thành công"
    );
    res.status(response.statusCode).json(response);
  },

  // Lấy danh sách order theo food
  async getOrdersByFood(req, res) {
    const { foodId } = req.params;

    const data = await orderService.getOrdersByFood(foodId);
    const count = await orderService.getOrderCountByFood(foodId);

    const response = responseSuccess(
      { totalOrders: count, data },
      "Lấy danh sách order theo food thành công"
    );
    res.status(response.statusCode).json(response);
  },

  // Lấy chi tiết order
  async getOrderById(req, res) {
    const { orderId } = req.params;

    const data = await orderService.getOrderById(orderId);

    if (!data) {
      const response = responseFail("Order không tồn tại", 404);
      return res.status(response.statusCode).json(response);
    }

    const response = responseSuccess(data, "Lấy chi tiết order thành công");
    res.status(response.statusCode).json(response);
  },

  // Cập nhật order
  async updateOrder(req, res) {
    const result = await orderService.updateOrder(req);
    const response = responseSuccess(result, "Cập nhật order thành công");
    res.status(response.statusCode).json(response);
  },

  // Xoá order
  async deleteOrder(req, res) {
    const { orderId } = req.params;

    await orderService.deleteOrder(orderId);
    const response = responseSuccess(null, "Xoá order thành công");
    res.status(response.statusCode).json(response);
  },
}