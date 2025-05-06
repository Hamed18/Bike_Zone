import LoadAnimation from "@/components/menu/LoadAnimation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetUserOrdersQuery } from "@/redux/features/order/order";
import { TOrder } from "@/types";
import { ApiError } from "@/types/global.type";
import { TableIcon } from "lucide-react";
import moment from "moment";
import { Link } from "react-router-dom"; // or import from 'next/link' if using Next.js

const UserOrder = () => {
  const {
    data: userOrders,
    isLoading,
    isError,
    error,
  } = useGetUserOrdersQuery(undefined);

  if (isLoading) {
    return <LoadAnimation />;
  }

  if (isError) {
    return (
      <div className="p-4 md:p-6">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline">
            {" "}
            {(error as ApiError)?.data?.message || "Failed to load orders"}
          </span>
        </div>
      </div>
    );
  }

  if (!userOrders?.data?.length) {
    return (
      <div className="p-4 md:p-6">
        <div className="flex flex-col items-center justify-center gap-4 h-[calc(100vh-200px)]">
          <TableIcon className="h-12 w-12 text-gray-400" />
          <h3 className="text-xl font-semibold">No orders found</h3>
          <p className="text-gray-500">
            There are currently no orders to display
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h3 className="text-2xl font-bold">My Orders</h3>
        <div className="text-sm text-gray-500">
          Total Orders: {userOrders?.data?.length}
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>#</TableHead>
              <TableHead>Product</TableHead>
              <TableHead className="text-center">Quantity</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Total Price</TableHead>
              <TableHead>Order Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {userOrders?.data?.map((order: TOrder, i: number) => {
              return (
                <TableRow key={order._id}>
                  <TableCell className="font-medium">{i + 1}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <img
                        src={order.product.image}
                        alt={order.product.name}
                        className="w-10 h-10 object-cover rounded"
                      />
                      <Link
                        to={`/product/${order.product._id}`}
                        className="hover:underline"
                      >
                        {order.product.name}
                      </Link>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">{order?.orderQuantity || 1}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        order.status === "Pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : order.status === "Paid"
                          ? "bg-sky-100 text-gray-800"
                          : order.status === "Shipped"
                          ? "bg-blue-100 text-blue-800"
                          : order.status === "Delivered"
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {order.status}
                    </span>
                  </TableCell>
                  <TableCell>${order.totalPrice.toFixed(2)}</TableCell>
                  <TableCell>
                    {moment(order.createdAt).format("MMM D, YYYY h:mm A")}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default UserOrder;
