import { ZodError, ZodIssue } from "zod";


import { IGenericErrorResponse } from "../interfaces.ts/genericErrorResponse";
import { IGenericErrorMessage } from "../interfaces.ts/genericErrorMessage";


const zodError=(error:ZodError):IGenericErrorResponse=>{
    const errors:IGenericErrorMessage[] = error.issues.map((issue:ZodIssue)=>{
        return {
            path:issue?.path[issue.path.length -1],
            message:issue?.message

        }
    })
    const statusCode = 400
    return {
        statusCode,
        message:'Zod Validation Error',
        errorMessages:errors
    }
}

export default zodError