import { Button } from "@/components/ui/button";
import { useGetOrdersQuery } from "@/redux/features/order/order";
import { useGetAllProductsQuery } from "@/redux/features/product/productApi";
import { useGetAllUsersQuery } from "@/redux/features/user/userApi";
import { Link } from "react-router-dom";
import { TOrder, TProduct } from "@/types";
import { TUser } from "@/types/global.type";
import LoadAnimation from "@/components/menu/LoadAnimation";

const AdminDash = () => {
  const { data: allOrders, isLoading: orderLoading } =
    useGetOrdersQuery(undefined);
  const { data: productData, isLoading: productLoading } =
    useGetAllProductsQuery(undefined);
  const { data: users, isLoading: userLoading } =
    useGetAllUsersQuery(undefined);

  // Calculate order status counts
  const orderStatusCounts = {
    total: allOrders?.data?.length || 0,
    paid:
      allOrders?.data?.filter((order: TOrder) => order.status === "Paid")
        .length || 0,
    delivered:
      allOrders?.data?.filter((order: TOrder) => order.status === "Delivered")
        .length || 0,
    cancelled:
      allOrders?.data?.filter((order: TOrder) => order.status === "Cancelled")
        .length || 0,
    pending:
      allOrders?.data?.filter((order: TOrder) => order.status === "Pending")
        .length || 0,
    shipped:
      allOrders?.data?.filter((order: TOrder) => order.status === "Shipped")
        .length || 0,
  };

  // Calculate user status counts
  const userStatusCounts = {
    total: users?.data?.length || 0,
    active:
      users?.data?.filter((user: TUser) => user.isActive === true).length || 0,
    inactive:
      users?.data?.filter((user: TUser) => user.isActive === false).length || 0,
  };

  if (orderLoading || productLoading || userLoading) {
    return <LoadAnimation />;
  }

  return (
    <div className="p-4 md:p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h3 className="text-2xl font-bold">Admin Dashboard</h3>
        <Link to="/">
          <Button className="gap-2">Go To Home</Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {/* Total Orders Card */}
        <div className="rounded-lg border p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h4 className="text-lg font-semibold">Total Orders</h4>
            <span className="text-2xl font-bold">
              {orderStatusCounts.total}
            </span>
          </div>
          <div className="mt-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Paid</span>
              <span className="font-medium">{orderStatusCounts.paid}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Delivered</span>
              <span className="font-medium">{orderStatusCounts.delivered}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Cancelled</span>
              <span className="font-medium">{orderStatusCounts.cancelled}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Pending</span>
              <span className="font-medium">{orderStatusCounts.pending}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Shipped</span>
              <span className="font-medium">{orderStatusCounts.shipped}</span>
            </div>
          </div>
        </div>

        {/* Total Users Card */}
        <div className="rounded-lg border p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h4 className="text-lg font-semibold">Total Users</h4>
            <span className="text-2xl font-bold">{userStatusCounts.total}</span>
          </div>
          <div className="mt-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-green-600">Active</span>
              <span className="font-medium">{userStatusCounts.active}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-red-600">Inactive</span>
              <span className="font-medium">{userStatusCounts.inactive}</span>
            </div>
          </div>
        </div>

        {/* Total Products Card */}
        <div className="rounded-lg border p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h4 className="text-lg font-semibold">Total Products</h4>
            <span className="text-2xl font-bold">
              {productData?.data?.length || 0}
            </span>
          </div>
          <div className="mt-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">In Stock</span>
              <span className="font-medium">
                {productData?.data?.filter(
                  (product: TProduct) => product.inStock
                ).length || 0}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Out of Stock</span>
              <span className="font-medium">
                {productData?.data?.filter(
                  (product: TProduct) => !product.inStock
                ).length || 0}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="rounded-md border p-4">
        <p className="text-gray-600">More dashboard metrics and charts can be added here</p>
      </div> */}
    </div>
  );
};

export default AdminDash;
