import { prisma } from "../common/prisma/connect.prisma.js";

export const likeService = {
  // async likeRestaurant(userId, resId) {
  //   const existing = await prisma.like_res.findUnique({
  //     where: {
  //       userId_resId: {
  //         userId,
  //         resId,
  //       },
  //     },
  //   });
  //   if (!existing) {
  //     return await prisma.like_res.create({
  //       data: {
  //         userId,
  //         resId,
  //         datelike: new Date(),
  //         isLike: true,
  //       },
  //     });
  //   }
  //   return await prisma.like_res.update({
  //     where: {
  //       userId_resId: {
  //         userId,
  //         resId,
  //       },
  //     },
  //     data: {
  //       isLike: true,
  //       datelike: new Date(),
  //     },
  //   });
  //   return true;
  // },

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
  async getLikesByRestaurant(resId) {
  return  await prisma.like_res_2.findMany({
      where: {
        resId: parseInt(resId,10),
        isLike: true,
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
        datelike: "desc",
      },
    });
   // return true;
  },
  async getLikeCountByRestaurant(resId) {
    await prisma.like_res_2.count({
      where: {
        resId: parseInt(resId,10),
        isLike: true,
      },
    });
    //return true;
  },
  async getLikesByUser(userId){
    return await prisma.like_res_2.findMany({
      where:{
        userId:parseInt(userId,10),
        isLike:true,
      },
      include:{
        restaurant:{
          select:{
            resId:true,
            resname:true,
            image:true,
            desc:true,
          }
        }
      },
      orderBy:{
        datelike:"desc",
      }
    })
  }
};
