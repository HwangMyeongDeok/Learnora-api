import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AuthFailureError, NotFoundError } from "../core/error.response"; 
import { KeyTokenRepository } from "../modules/auth/key-token.repository"; 
import { catchAsyncError } from "./catchAsyncError"; 

declare global {
  namespace Express {
    interface Request {
      user?: any;
      keyStore?: any;
      refreshToken?: string;
    }
  }
}

const keyTokenRepo = new KeyTokenRepository();

export const isAuthenticated = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.headers["x-client-id"] as string;
  const deviceId = req.headers["x-device-id"] as string || "unknown";
  if (!userId) throw new AuthFailureError("Invalid Request: Missing Client ID");


  const keyStore = await keyTokenRepo.findByUserIdAndDeviceId(userId, deviceId);
  
  if (!keyStore) throw new NotFoundError("Keystore not found. Pls login.");

  const accessToken = req.headers["authorization"]?.replace("Bearer ", "");
  if (!accessToken) throw new AuthFailureError("Invalid Request: Missing Token");

  try {
    const decodeUser = jwt.verify(accessToken, keyStore.publicKey) as any;
    
    if (userId !== decodeUser.userId) throw new AuthFailureError("Invalid User ID");

    req.keyStore = keyStore;
    req.user = decodeUser; 
    
    return next();
  } catch (error) {
    throw new AuthFailureError("AccessToken Expired or Invalid");
  }
});