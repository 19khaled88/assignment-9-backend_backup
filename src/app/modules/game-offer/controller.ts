import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";


import sendResponse from "../../../shared/sendResponse";
import { GameOfferService } from "./service";


const createController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await GameOfferService.createGameOfferService(req.body);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Game offer event created successfully",
      data: result,
    });
  } catch (error) {
    next(error)
  }
};

const getAllGameOfferController = async (req: Request, res: Response) => {


  const result = await GameOfferService.getAllGameOffers();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Offered games retrieved successfully",
    data: result,
  });
};

const getSingleGameOfferController = async (req: Request, res: Response) => {
  const result = await GameOfferService.getSingleGameOffer(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Offered game for given ID fetched successfully",
    data: result,
  });
};

const updateGameOfferController = async (req: Request, res: Response) => {
  const isUpdate = await GameOfferService.updateGameOffer(req.params.id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Offered game for given ID updated successfully",
    data: isUpdate,
  });
};

const deleteGameOfferController = async (req: Request, res: Response) => {
  const isDeleted = await GameOfferService.deleteGameOffer(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Offered game for given Id deleted successfully",
    data: isDeleted,
  });
};

export const GameOfferController = {
  createController,
  getAllGameOfferController,
  getSingleGameOfferController,
  deleteGameOfferController,
  updateGameOfferController
};
