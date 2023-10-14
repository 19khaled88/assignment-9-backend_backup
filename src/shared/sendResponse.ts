import { Response } from "express";
import { IApiResponse } from "../interfaces.ts/apiResponse";




const sendResponse = <T>(res: Response, data: IApiResponse<T>) => {
	const responseData = {
		statusCode: data.statusCode,
		success: data.success,
		message: data.message || null,
		data: data.data || null || undefined,
	};
	res.status(data.statusCode).json(responseData);
};

export default sendResponse;