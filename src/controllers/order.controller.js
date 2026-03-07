import{ orderService } from "../services/order.service.js";
import { responseSuccess } from "../common/helpers/response.helper.js";
export const orderController = {
    async createOrder(req,res){
        const result = await orderService.createOrder(req);
        const response = responseSuccess(result, "Đặt món thành công");
        res.status(response.statusCode).json(response);
    }
}