import LoadAnimation from "@/components/menu/LoadAnimation";
import { Button } from "@/components/ui/button";
import { useGetUserOrdersQuery } from "@/redux/features/order/order";
import { Link } from "react-router-dom";

const UserDash = () => {
  const { data: userOrders, isLoading } = useGetUserOrdersQuery(undefined);

  if (isLoading) {
    return <LoadAnimation />;
  }

  return (
    <div className="p-4 md:p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h3 className="text-2xl font-bold">User Dashboard</h3>
        <Link to="/">
          {" "}
          <Button className="gap-2">Go To Home</Button>
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {/* Total Orders Card */}
        <div className="rounded-lg border p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h4 className="text-lg font-semibold">Total Orders</h4>
            <span className="text-2xl font-bold">
              {userOrders?.data?.length}
            </span>
          </div>
          <div className="mt-4 space-y-2"></div>
        </div>
      </div>
    </div>
  );
};

export default UserDash;
