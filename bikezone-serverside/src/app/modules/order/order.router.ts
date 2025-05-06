import { Router } from "express";
import { orderController } from "./order.controller";
import auth from "./../../middleeatres/auth";
import { USER_ROLE } from "../user/user.constants";

const orderRouter = Router();

orderRouter.post(
  "/create-order",
  auth(USER_ROLE.customer),
  orderController.createOrder
);
orderRouter.get(
  "/verify",
  auth(USER_ROLE.customer),
  orderController.verifyPayment
);
orderRouter.get("/", orderController.getOrder);
orderRouter.get("/:orderId", orderController.getSingleOrder);

orderRouter.patch('/update-status', orderController.updateStatus)

orderRouter.delete("/:orderId", orderController.deleteOrder);
orderRouter.get(
  "/user/orders",
  auth(USER_ROLE.customer),
  orderController.getUserOrder
);

export default orderRouter;
