import { Router } from "express";
import { CartController } from "./cart.controller";
import { CartService } from "./cart.service";
import { CartRepository } from "./cart.repository";
import { isAuthenticated } from "../../middleware/isAuthenticated";
import { validateMiddleware } from "../../middleware/validation";
import { AddToCartDto } from "./dtos/add-to-cart.dto";

const router = Router();

const cartRepo = new CartRepository();
const cartService = new CartService(cartRepo);
const cartController = new CartController(cartService);


router.get(
    "/", 
    isAuthenticated, 
    cartController.getCart
);
router.post(
    "/add", 
    isAuthenticated, 
    validateMiddleware(AddToCartDto), 
    cartController.addToCart
);

router.delete(
    "/remove/:courseId", 
    isAuthenticated, 
    cartController.removeFromCart
);

router.delete(
    "/clear", 
    isAuthenticated, 
    cartController.clearCart
);

export default router;