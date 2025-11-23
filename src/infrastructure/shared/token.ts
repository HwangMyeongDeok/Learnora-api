import jwt from 'jsonwebtoken';

export const createTokenPair = async (
  payload: object,
  privateKey: string 
) => {
  try {
    const accessToken = jwt.sign(payload, privateKey, {
      algorithm: 'RS256', 
      expiresIn: '15m',
    });

    const refreshToken = jwt.sign(payload, privateKey, {
      algorithm: 'RS256',
      expiresIn: '7d',
    });


    return { accessToken, refreshToken };
  } catch (error) {
    throw error;
  }
};