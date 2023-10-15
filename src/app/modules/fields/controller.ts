import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";


import sendResponse from "../../../shared/sendResponse";
import { FieldService } from "./service";

const createController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await FieldService.createFieldService(req.body);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Field created successfully",
      data: result,
    });
  } catch (error) {
    next(error)
  }
};

const getAllFieldController = async (req: Request, res: Response) => {
  const result = await FieldService.getAllFields();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Fields retrieved successfully",
    data: result,
  });
};

const getSingleFieldController = async (req: Request, res: Response) => {
  const result = await FieldService.getSingleField(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Field fetched successfully",
    data: result,
  });
};

const updateFieldController = async (req: Request, res: Response) => {
  const isUpdate = await FieldService.updateField(req.params.id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Field for given ID updated successfully",
    data: isUpdate,
  });
};

const deleteFieldController = async (req: Request, res: Response) => {
  const isDeleted = await FieldService.deleteField(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Field for given Id deleted successfully",
    data: isDeleted,
  });
};

export const FieldController = {
  createController,
  getAllFieldController,
  getSingleFieldController,
  updateFieldController,
  deleteFieldController
};
