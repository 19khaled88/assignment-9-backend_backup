import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";

import sendResponse from "../../../shared/sendResponse";
import { BookingService } from "./service";

const createBookingController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await BookingService.createBookingService(req.body);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "New booking created successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};



const getAllBookingsController = async (req: Request, res: Response) => {
  const result = await BookingService.getAllBookingService();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All bookings retrieved successfully",
    data: result,
  });
};

const getSingleBookingController = async (req: Request, res: Response) => {
  const result = await BookingService.getSingleBookingService(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Single booking for given ID fetched successfully",
    data: result,
  });
};

const updateBookingController = async (req: Request, res: Response) => {
  const isUpdate = await BookingService.updateBookingService(
    req.params.id,
    req.body
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Booking for given ID updated successfully",
    data: isUpdate,
  });
};

const deleteBookingController = async (req: Request, res: Response) => {
  const isDeleted = await BookingService.deleteBookingService(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Booking for given Id deleted successfully",
    data: isDeleted,
  });
};

export const BookingController = {
  createBookingController,
  getAllBookingsController,
  getSingleBookingController,
  deleteBookingController,
  updateBookingController,
};
