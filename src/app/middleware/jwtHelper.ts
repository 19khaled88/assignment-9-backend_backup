import jwt, { JwtPayload, Secret } from "jsonwebtoken"

const createToken=(
    payload:Record<string, unknown>,
    secret:Secret,
    expiresTime:string
)=>{
    return jwt.sign(payload,secret,{
    expiresIn:expiresTime       
    })
}

const verify=(token:string, secret:Secret):JwtPayload=>{
    return jwt.verify(token,secret) as JwtPayload
}

export const jwtHelper = {
    createToken,verify
}