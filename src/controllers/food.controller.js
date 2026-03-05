import { foodService } from "../services/food.service.js";

export const foodController = {
    async findAll(req, res) {
        try {
            const result = await foodService.findAll();
            res.json(result);   // 🔥 BẮT BUỘC phải trả response
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Server error" });
        }
    }
};