import { NextFunction, Request, Response } from "express"
import ApiError from "../../errors/apiError";
import httpStatus from "http-status";
import { jwtHelper } from "./jwtHelper";
import config from "../../config";
import { Secret } from "jsonwebtoken";
import { verifyJwt } from "../../utils/token";


const authCheck = (...requiredRoles: string[]) => async (req: Request, res: Response,next:NextFunction) => {
    
    try {
        //get authorization token
        const token = req.headers.authorization
       
        if (!token) {
            throw new ApiError(httpStatus.UNAUTHORIZED, 'You are not authorized');
        }

        //verify token
        let verifiedUser = null;
        
        verifiedUser = verifyJwt(token)
       
        req.user = verifiedUser

        if (requiredRoles.length && !requiredRoles.includes(verifiedUser.role)) {
            throw new ApiError(httpStatus.FORBIDDEN, 'Forbidden');
        }
        
        
        next()
    } catch (error) {
        
        next(error)
    }
}

export default authCheck