import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";


import sendResponse from "../../../shared/sendResponse";
import { UserService } from "./service";
import pick from "../../../shared/pick";
import { paginationFields } from "../../../shared/paginationFields";

const signUpController = async (req: Request, res: Response, next: NextFunction) => {
  
  try {
    const result = await UserService.signUpServices(req.body);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "User created successfully",
      data: result,
    });
  } catch (error) {
    next(error)
  }
};

const signInController = async (req: Request, res: Response) => {
  try {
    const result = await UserService.signInServices(req.body);
    res.send({
      success: true,
      statusCode: 200,
      message: "User signin successfully",
      token: result?.token,
    });
  } catch (error) {
    if (error instanceof Error) {
      sendResponse(res, {
        statusCode: httpStatus.UNAUTHORIZED,
        success: false,
        message: "User signin unsuccessful",
        data: error.message
      });
    } else {
      sendResponse(res, {
        statusCode: httpStatus.UNAUTHORIZED,
        success: false,
        message: "User signin unsuccessful",
        data: "unknow error"
      });
    }
  }
};

const getAllUsersController = async (req: Request, res: Response) => {
  const paginatinOptions = pick(req.query, paginationFields)
  const result = await UserService.getAllUsers(paginatinOptions);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Users retrieved successfully",
    data: result,
  });
};

const getSingleUserController = async (req: Request, res: Response) => {
  const result = await UserService.getSingleUser(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User fetched successfully",
    data: result,
  });
};

const updateUserController = async (req: Request, res: Response) => {
  const isUpdate = await UserService.updateUser(req.params.id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User updated successfully",
    data: isUpdate,
  });
};

const deleteUserControler = async (req: Request, res: Response) => {
  const isDeleted = await UserService.deleteUser(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User deleted successfully",
    data: isDeleted,
  });
};

export const UserController = {
  signUpController,
  signInController,
  getAllUsersController,
  getSingleUserController,
  updateUserController,
  deleteUserControler,
};
