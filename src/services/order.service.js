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
   // Lấy danh sách order theo user
   async getOrdersByUser(userId) {
    return await prisma.orders.findMany({
      where: {
        userId: parseInt(userId, 10),
      },
      include: {
        food: {
          select: {
            foodId: true,
            foodname: true,
            price: true,
            image: true,
            desc: true,
          },
        },
      },
      orderBy: {
        orderId: "desc",
      },
    });
  },

  // Lấy tổng số order theo user
  async getOrderCountByUser(userId) {
    return await prisma.orders.count({
      where: {
        userId: parseInt(userId, 10),
      },
    });
  },

  // Lấy danh sách order theo food
  async getOrdersByFood(foodId) {
    return await prisma.orders.findMany({
      where: {
        foodId: parseInt(foodId, 10),
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
        orderId: "desc",
      },
    });
  },

  // Lấy tổng số order theo food
  async getOrderCountByFood(foodId) {
    return await prisma.orders.count({
      where: {
        foodId: parseInt(foodId, 10),
      },
    });
  },

  // Lấy chi tiết order theo ID
  async getOrderById(orderId) {
    return await prisma.orders.findUnique({
      where: {
        orderId: parseInt(orderId, 10),
      },
      include: {
        users: {
          select: {
            userId: true,
            fullname: true,
            email: true,
          },
        },
        food: {
          select: {
            foodId: true,
            foodname: true,
            price: true,
            image: true,
          },
        },
      },
    });
  },

  // Xoá order
  async deleteOrder(orderId) {
    return await prisma.orders.delete({
      where: {
        orderId: parseInt(orderId, 10),
      },
    });
  },

  // Cập nhật order
  async updateOrder(req) {
    const { orderId, amount, code, arrsubId } = req.body;

    return await prisma.orders.update({
      where: {
        orderId: parseInt(orderId, 10),
      },
      data: {
        amount: amount ? parseInt(amount, 10) : undefined,
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
        food: {
          select: {
            foodId: true,
            foodname: true,
            price: true,
            image: true,
          },
        },
      },
    });
  },
};
