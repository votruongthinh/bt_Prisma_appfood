import { prisma } from "../common/prisma/connect.prisma.js";

export const likeService = {
  async likeRestaurant(userId, resId) {
    const existing = await prisma.like_res.findUnique({
      where: {
        userId_resId: {
          userId,
          resId,
        },
      },
    });
    if (!existing) {
      return await prisma.like_res.create({
        data: {
          userId,
          resId,
          datelike: new Date(),
          isLike: true,
        },
      });
    }
    return await prisma.like_res.update({
      where: {
        userId_resId: {
          userId,
          resId,
        },
      },
      data: {
        isLike: true,
        datelike: new Date(),
      },
    });
    return true;
  },
  async unlikeRestaurant(userId, resId) {
    return await prisma.like_res.update({
      where: {
        userId_resId: {
          userId,
          resId,
        },
      },
      data: {
        isLike: false,
      },
    });
  },

  async toogleLike(req) {
    const { userId, resId } = req.body;

    const likeEsixt = await prisma.like_res_2.findUnique({
      where: {
        userId_resId: {
          userId: userId,
          resId: resId,
        },
      },
    });

    if (likeEsixt) {
      await prisma.like_res_2.update({
        where: {
          id: likeEsixt.id,
        },
        data: {
          isLike: !likeEsixt.isLike,
        },
      });
    } else {
      await prisma.like_res_2.create({
        data: {
          userId: userId,
          resId: resId,
          isLike: true,
        },
      });
    }

    return true;
  },
};
