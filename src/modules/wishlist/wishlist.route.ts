import { Router } from "express";
import { WishlistController } from "./wishlist.controller";
import { WishlistService } from "./wishlist.service";
import { WishlistRepository } from "./wishlist.repository";

import { isAuthenticated } from "../../middleware/isAuthenticated";
import { validateMiddleware } from "../../middleware/validation";
import { AddToWishlistDto } from "./dtos/add-to-wishlist.dto";

const router = Router();

const wishlistRepo = new WishlistRepository();
const wishlistService = new WishlistService(wishlistRepo);
const wishlistController = new WishlistController(wishlistService);


router.get("/", isAuthenticated, wishlistController.getMe);

router.post(
    "/", 
    isAuthenticated, 
    validateMiddleware(AddToWishlistDto), 
    wishlistController.add
);

router.delete("/:courseId", isAuthenticated, wishlistController.remove);

export default router;