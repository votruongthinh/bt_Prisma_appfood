import { responseSuccess } from "../common/helpers/response.helper.js";
import { rateService } from "../services/rate.service.js";

export const rateController = {
  async createOrUpdateRate(req, res) {
    const result = await rateService.createOrUpdateRate(req);
    const response = responseSuccess(result, "Đánh giá nhà hàng thành công");
    res.status(response.statusCode).json(response);
  },
  // Lấy danh sách đánh giá theo nhà hàng
  async getRatesByRestaurant(req, res) {
    const { resId } = req.params;

    const data = await rateService.getRatesByRestaurant(resId);
    const count = await rateService.getRateCountByRestaurant(resId);
    const averageRate = await rateService.getAverageRateByRestaurant(resId);

    const response = responseSuccess(
      { totalRates: count, averageRate, data },
      "Lấy danh sách đánh giá nhà hàng thành công"
    );
    res.status(response.statusCode).json(response);
  },

  // Lấy danh sách đánh giá theo user
  async getRatesByUser(req, res) {
    const { userId } = req.params;

    const data = await rateService.getRatesByUser(userId);
    const count = await rateService.getRateCountByUser(userId);

    const response = responseSuccess(
      { totalRates: count, data },
      "Lấy danh sách đánh giá của user thành công"
    );
    res.status(response.statusCode).json(response);
  },
};
