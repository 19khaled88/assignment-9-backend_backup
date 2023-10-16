import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import sendResponse from "../../../shared/sendResponse";
import { PaymentService } from "./service";

const createController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await PaymentService.createPaymentService(req.body);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Payment created successfully",
      data: result,
    });
  } catch (error) {
    next(error)
  }
};

const getAllPaymentController = async (req: Request, res: Response) => {
  const result = await PaymentService.getAllPayment();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Payments retrieved successfully",
    data: result,
  });
};

const getSinglePaymentController = async (req: Request, res: Response) => {
  const result = await PaymentService.getSinglePayment(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Payment fetched successfully",
    data: result,
  });
};

const updatePaymentController = async (req: Request, res: Response) => {
  const isUpdate = await PaymentService.updatePayment(req.params.id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Payment for given ID updated successfully",
    data: isUpdate,
  });
};

const deletePaymentController = async (req: Request, res: Response) => {
  const isDeleted = await PaymentService.deletePayment(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Payment for given Id deleted successfully",
    data: isDeleted,
  });
};

export const PaymentController = {
  createController,
  getAllPaymentController,
  getSinglePaymentController,
  updatePaymentController,
  deletePaymentController
};
