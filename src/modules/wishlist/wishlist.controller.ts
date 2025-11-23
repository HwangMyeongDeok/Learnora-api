import { Request, Response, NextFunction } from "express";
import { WishlistService } from "./wishlist.service";
import { CREATED, OK } from "../../core/success.response";

export class WishlistController {
  constructor(private readonly wishlistService: WishlistService) {}

  getMe = async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.user || !req.user.userId) throw new Error("Unauthorized");
      
      const result = await this.wishlistService.getMyWishlist(req.user.userId);
      new OK({
        message: "Get wishlist success",
        metadata: result,
      }).send(res);
    } catch (error) {
      next(error);
    }
  };

  add = async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.user || !req.user.userId) throw new Error("Unauthorized");
      
      const { courseId } = req.body;
      const result = await this.wishlistService.addToWishlist(req.user.userId, courseId);
      
      new CREATED({
        message: "Added to wishlist",
        metadata: result,
      }).send(res);
    } catch (error) {
      next(error);
    }
  };

  remove = async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.user || !req.user.userId) throw new Error("Unauthorized");
      
      const { courseId } = req.params;
      const result = await this.wishlistService.removeFromWishlist(req.user.userId, courseId);
      
      new OK({
        message: "Removed from wishlist",
        metadata: result,
      }).send(res);
    } catch (error) {
      next(error);
    }
  };
}