import jwt from "jsonwebtoken"
import {appConfig} from "../appConfig";

export const jwtService = {
   async createToken(userId: string): Promise<string> {
       return jwt.sign(
           {userId},
           appConfig.JWT_SECRET,
           {expiresIn: appConfig.JWT_EXPIRES} )
   },

    async decodeToken(token: string): Promise<any> {
        try {
            return jwt.decode(token);
        } catch (e: unknown) {
            if (e instanceof Error) {
                console.error('Can\'t decode token', e.message);
            } else {
                console.error('Unknown error during token decoding');
            }
        }
    },


    async verifyToken(token: string): Promise<{ userId: string } | null> {
        try {
            return jwt.verify(token, appConfig.JWT_SECRET) as { userId: string };
        } catch (e: unknown) {
            if (e instanceof Error) {
                console.error('Token verification failed:', e.message);
            } else {
                console.error('Unknown error during token verification');
            }
            return null;
        }
    }
}