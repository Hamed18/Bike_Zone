import { Router } from "express";
import { productController } from "./product.controller";
import { ProductValidation } from "./product.validation";
import validateRequest from "../../middleeatres/validateRequest";
import auth from "../../middleeatres/auth";
import { USER_ROLE } from "../user/user.constants";

const productRouter = Router();
productRouter.post(
  "/products",
  auth(USER_ROLE.admin),
  validateRequest(ProductValidation.productValidationSchema),
  productController.createProduct
);

productRouter.get("/products", productController.getProduct);
productRouter.get("/products/:productId", productController.getSingleProduct);
productRouter.put(
  "/products/:productId",
  auth(USER_ROLE.admin),
  productController.updateProduct
);
productRouter.delete(
  "/products/:productId",
  auth(USER_ROLE.admin),
  productController.deleteProduct
);

export default productRouter;
