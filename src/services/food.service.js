import { prisma } from "../common/prisma/connect.prisma.js";

export const foodService = {
    async findAll() {
        return await prisma.food.findMany();
    }
};