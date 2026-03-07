import { prisma } from "../common/prisma/connect.prisma.js";

export const rateService = {
  async createOrUpdateRate(req) {
    const { userId, resId, amount } = req.body;
    const rateExist = await prisma.rate_res.findUnique({
      where: {
        userId_resId: {
          userId: parseInt(userId, 10),
          resId: parseInt(resId, 10),
        },
      },
    });
    if (rateExist) {
      return await prisma.rate_res.update({
        where: {
          userId_resId: {
            userId: parseInt(userId, 10),
            resId: parseInt(resId, 10),
          },
        },
        data: {
          amount: parseInt(amount, 10),
          daterate: new Date(),
        },
      });
    } else {
      return await prisma.rate_res.create({
        data: {
          userId: parseInt(userId, 10),
          resId: parseInt(resId, 10),
          amount: parseInt(amount, 10),
          daterate: new Date(),
        },
      });
    }
    //return "Đánh giá nhà hàng thành công"
  },
  // Lấy danh sách đánh giá theo nhà hàng
  async getRatesByRestaurant(resId) {
    return await prisma.rate_res.findMany({
      where: {
        resId: parseInt(resId, 10),
      },
      include: {
        users: {
          select: {
            userId: true,
            fullname: true,
            email: true,
          },
        },
      },
      orderBy: {
        daterate: "desc",
      },
    });
  },

  // Lấy tổng số đánh giá theo nhà hàng
  async getRateCountByRestaurant(resId) {
    return await prisma.rate_res.count({
      where: {
        resId: parseInt(resId, 10),
      },
    });
  },

  // Lấy điểm trung bình đánh giá theo nhà hàng
  async getAverageRateByRestaurant(resId) {
    const result = await prisma.rate_res.aggregate({
      where: {
        resId: parseInt(resId, 10),
      },
      _avg: {
        amount: true,
      },
    });

    return result._avg.amount || 0;
  },

  // Lấy danh sách đánh giá theo user
  async getRatesByUser(userId) {
    return await prisma.rate_res.findMany({
      where: {
        userId: parseInt(userId, 10),
      },
      include: {
        restaurant: {
          select: {
            resId: true,
            resname: true,
            image: true,
            desc: true,
          },
        },
      },
      orderBy: {
        daterate: "desc",
      },
    });
  },

  // Lấy tổng số đánh giá theo user
  async getRateCountByUser(userId) {
    return await prisma.rate_res.count({
      where: {
        userId: parseInt(userId, 10),
      },
    });
  },
};
