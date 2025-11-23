import { Request, Response, NextFunction } from "express";
import { CartService } from "./cart.service";
import { OK, CREATED } from "../../core/success.response";

export class CartController {
  constructor(private readonly cartService: CartService) {}

  getCart = async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.user || !req.user.userId) throw new Error("Unauthorized");
      
      const result = await this.cartService.getCart(req.user.userId);
      new OK({
        message: "Get cart success",
        metadata: result,
      }).send(res);
    } catch (error) {
      next(error);
    }
  };

  addToCart = async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.user || !req.user.userId) throw new Error("Unauthorized");
      
      const { courseId } = req.body;
      const result = await this.cartService.addToCart(req.user.userId, courseId);

      new CREATED({
        message: "Added to cart",
        metadata: result,
      }).send(res);
    } catch (error) {
      next(error);
    }
  };

  removeFromCart = async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.user || !req.user.userId) throw new Error("Unauthorized");
      
      const { courseId } = req.params;
      const result = await this.cartService.removeFromCart(req.user.userId, courseId);

      new OK({
        message: "Removed from cart",
        metadata: result,
      }).send(res);
    } catch (error) {
      next(error);
    }
  };

  clearCart = async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.user || !req.user.userId) throw new Error("Unauthorized");
      
      await this.cartService.clearCart(req.user.userId);

      new OK({
        message: "Cart cleared",
        metadata: {},
      }).send(res);
    } catch (error) {
      next(error);
    }
  };
}