import { Request, Response } from "express";
import { userService } from "./user.service";
import sendResponse from "../../utils/sendResponse";
import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import mongoose from "mongoose";

const createAdmin = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  const result = await userService.createAdmin(payload);

  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    message: "User created successfully",
    data: result,
  });
});
const getUser = async (req: Request, res: Response) => {
  const result = await userService.getUser();
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "User get successfully",
    data: result,
  });
};

const getSingleUser = async (req: Request, res: Response) => {
  const { userId } = req.params;

  // Validate userId exists
  if (!userId) {
    return sendResponse(res, {
      statusCode: StatusCodes.BAD_REQUEST,
      message: "User ID is required",
      data: {},
    });
  }

  // Validate proper ObjectId format
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return sendResponse(res, {
      statusCode: StatusCodes.BAD_REQUEST,
      message: "Invalid user ID format",
      data: {},
    });
  }

  const result = await userService.getSingleUser(userId);

  // If service returns null (user not found)
  if (!result) {
    return sendResponse(res, {
      statusCode: StatusCodes.BAD_REQUEST,
      message: "User not found",
      data: {},
    });
  }

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "User retrieved successfully",
    data: result,
  });
};

const updateUser = async (req: Request, res: Response) => {
  const userId = req.params.userId;
  const body = req.body;
  const result = await userService.updateUser(userId, body);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "User update successfully",
    data: result,
  });
};
const updatePassword = catchAsync(async (req: Request, res: Response) => {
  const { userId } = req.params;
  const { currentPassword, newPassword } = req.body;

  // Validate required fields
  if (!currentPassword || !newPassword) {
    return sendResponse(res, {
      statusCode: StatusCodes.BAD_REQUEST,
      message: "Both currentPassword and newPassword are required",
      data: {},
    });
  }

  const result = await userService.updatePassword(userId, {
    currentPassword,
    newPassword,
  });

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Password updated successfully",
    data: result,
  });
});

const deleteUser = async (req: Request, res: Response) => {
  const userId = req.params.userId;
  await userService.deleteUser(userId);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "User deleted successfully",
    data: {},
  });
};
const activationUser = async (req: Request, res: Response) => {
  const userId = req.params.userId;
  const result = await userService.activationUser(userId);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "User activation changed",
    data: result,
  });
};

export const userController = {
  createAdmin,
  getUser,
  getSingleUser,
  updateUser,
  deleteUser,
  activationUser,
  updatePassword,
};
