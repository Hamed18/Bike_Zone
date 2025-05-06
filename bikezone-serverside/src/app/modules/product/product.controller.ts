import { StatusCodes } from "http-status-codes";
import { productService } from "./product.service";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";

// Create a Bike
const createProduct = catchAsync(async (req, res) => {
  const productData = req.body;

  const result = await productService.createProduct(productData);
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    message: "Bike created successfully",
    data: result,
  });
});

//Get all Bike
const getProduct = catchAsync(async (req, res) => {
  const result = await productService.getProduct(req.query);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Bike retrieved successfully",
    data: result,
  });
});

//Get a Specific Bike
const getSingleProduct = catchAsync(async (req, res) => {
  const productId = req.params.productId;
  const result = await productService.getSingleProduct(productId);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Bike retrieved successfully",
    data: result,
  });
});

//Update a Bike
const updateProduct = catchAsync(async (req, res) => {
  const productId = req.params.productId;
  const body = req.body;
  const result = await productService.updateProduct(productId, body);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Bike updated successfully",
    data: result,
  });
});

//Delete a Bike
const deleteProduct = catchAsync(async (req, res) => {
  const productId = req.params.productId;
  await productService.deleteProduct(productId);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Bike deleted successfully",
    data: {},
  });
});

export const productController = {
  createProduct,
  getProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
};
