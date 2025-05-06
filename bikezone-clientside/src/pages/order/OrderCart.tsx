import { Button } from "@/components/ui/button";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useCreateOrderMutation } from "@/redux/features/order/order";
import { useAppSelector } from "@/redux/hooks";
import { TCartItem } from "@/types";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const OrderCart = ({ cart }: { cart: TCartItem }) => {
  const user = useAppSelector(selectCurrentUser);

  const navigate = useNavigate();

  // order start
  const [createOrder, { isLoading, isSuccess, data, isError, error }] =
    useCreateOrderMutation();
  const handleAddToOrder = async () => {
    if (!user) {
      navigate("/login");
      toast.error("You must be logged in");
    } else {
      const result = await createOrder({
        product: cart.productId,
        orderQuantity: cart.quantity,
      });
      if (result?.data?.status) {
        // toast.success("Order Successful!");
      } else {
        toast.error("Not Order Successful!");
      }
    }
  };
  const toastId = "order";
  useEffect(() => {
    if (!user) return;

    if (isLoading) toast.loading("Processing ...", { id: toastId });

    if (isSuccess) {
      toast.success(data?.message, { id: toastId });
      if (data?.data) {
        setTimeout(() => {
          window.location.href = data.data;
        }, 1000);
      }
    }

    if (isError) toast.error(JSON.stringify(error), { id: toastId });
  }, [data?.data, data?.message, error, isError, isLoading, isSuccess]);
  // order end
  return (
    <div>
      <Button className="w-full mt-6" size="lg" onClick={handleAddToOrder}>
        Order Now
      </Button>
    </div>
  );
};

export default OrderCart;
