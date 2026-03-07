import { likeService } from "../services/like.service.js";  
import { responseSuccess } from "../common/helpers/response.helper.js";
import { count } from "console";
export const likeController = {
    async toogleLike(req,res){
        const result = await likeService.toogleLike(req)
        const response = responseSuccess(result,"toogle nhà hàng thành công")
        res.status(response.statusCode).json(response)
    },
    // async likeRestaurant(req,res){
    //     const {userId,resId}= req.body

    //     const result = await likeService.likeRestaurant(userId,resId)
    //     const response = responseSuccess(result,"thích nhà hàng thành công")
    //     res.status(response.statusCode).json(response)
    // },
    // async unlikeRestaurant(req,res){
    //     const {userId,resId}=req.body
    //     const result = await likeService.unlikeRestaurant(userId,resId)
    //     const response = responseSuccess(result,"bỏ thích nhà hàng thành công")
    //     res.status(response.statusCode).json(response)
    // }
    async getLikesByRestaurant(req,res){
        const {resId} = req.params;
        const data = await likeService.getLikesByRestaurant(resId);
        const count = await likeService.getLikeCountByRestaurant(resId);
        const response = responseSuccess(
            { totalLikes: count, data }, 
            "Lấy danh sách like nhà hàng thành công"
          );
          res.status(response.statusCode).json(response);
    },
    async getLikesByUser (req,res){
        const {userId} = req.params;
        const data = await likeService.getLikesByUser(userId);
        const response = responseSuccess({totalRestaurants: count, data},
            "Lấy danh sách nhà hàng đã thích thành công")
            res.status(response.statusCode).json(response);
    }
}
