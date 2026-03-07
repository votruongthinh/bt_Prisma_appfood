import { prisma } from "../common/prisma/connect.prisma.js";
export const orderService = {
  async createOrder(req) {
    const { userId, foodId, amount, code, arrsubId } = req.body;
    return await prisma.orders.create({
      data: {
        userId: parseInt(userId, 10),
        foodId: parseInt(foodId, 10),
        amount: parseInt(amount, 10),
        code: code || null,
        arrsubId: arrsubId || null,
      },
      include: {
        users: {
          select: {
            userId: true,
            fullname: true,
            email: true,
          },
        },
        food: {  // ✅ Đúng - nằm trong include
          select: {
            foodId: true,
            foodname: true,
            price: true,
            image: true,
          },
        },
      },
     
    });

    //return "Tạo đơn hàng thành công"
  },
};
