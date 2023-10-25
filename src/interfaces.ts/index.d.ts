
export {}
import { JwtPayload } from "jsonwebtoken";
declare global{
    namespace Express{
        interface Request{
            user:JwtPayload | null,
            role:JwtPayload | null,
            id:JwtPayload | null
        }
    }
}

