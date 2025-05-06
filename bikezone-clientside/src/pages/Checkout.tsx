import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useGetSingleProductQuery } from "@/redux/features/product/productApi";
import OrderCart from "./order/OrderCart";
import { TCartItem } from "@/types";
import LoadAnimation from "@/components/menu/LoadAnimation";
import { toast } from "sonner";
import { useAppSelector } from "@/redux/hooks";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useGeSingletUserQuery } from "@/redux/features/user/userApi";

const Checkout = () => {
  const user = useAppSelector(selectCurrentUser);
  const { data: userData, isLoading: userLoading } = useGeSingletUserQuery(
    user?._id
  );

  const { productId } = useParams<{ productId: string }>();
  const { data: product, isLoading } = useGetSingleProductQuery(
    productId || ""
  );
  const [cart, setCart] = useState<TCartItem[]>([]);
  const [subtotal, setSubtotal] = useState(0);
  const taxRate = 0.0; // 8% tax rate

  useEffect(() => {
    if (product?.data) {
      // Initialize cart with the product if it's not already there
      if (!cart.some((item) => item.productId === productId)) {
        setCart([
          {
            productId: productId || "",
            name: product.data.name,
            price: product.data.price,
            quantity: 1,
            image: product.data.image,
          },
        ]);
      }
    }
  }, [product, productId]);

  useEffect(() => {
    // Calculate subtotal whenever cart changes
    const newSubtotal = cart.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    setSubtotal(newSubtotal);
  }, [cart]);

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    if (newQuantity > product.data.quantity) {
      toast.error(`Stock available is ${product.data.quantity}`);
      return;
    } else {
      setCart(
        cart.map((item) =>
          item.productId === id ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  const tax = subtotal * taxRate;
  const total = subtotal + tax;

  if (isLoading || userLoading) {
    return <LoadAnimation />;
  }

  if (!product?.data) {
    return <div className="p-4">Product not found</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <p className="sm:text-4xl text-2xl font-bold mb-6">Checkout</p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-2">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Your Order</h2>

            {cart.map((item) => (
              <div
                key={item.productId}
                className="flex items-center border-b py-4"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="sm:w-20 sm:h-20 w-10 h-10 object-cover rounded mr-4 "
                />
                <div className="flex-1">
                  <h3 className="font-medium">{item.name}</h3>
                  <p className="text-gray-600">${item.price.toFixed(2)}</p>
                </div>
                <div className="flex md:flex-row flex-col gap-2">
                  <div className="flex items-center">
                    <Button
                      style={{ backgroundColor: "red" }}
                      size="sm"
                      onClick={() =>
                        handleQuantityChange(item.productId, item.quantity - 1)
                      }
                    >
                      -
                    </Button>
                    <span className="mx-4">{item.quantity}</span>
                    <Button
                      style={{ backgroundColor: "green" }}
                      size="sm"
                      onClick={() =>
                        handleQuantityChange(item.productId, item.quantity + 1)
                      }
                    >
                      +
                    </Button>
                  </div>
                  <div className="ml-8 font-medium">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">User Information</h2>
            <div>Name: {userData?.data?.name}</div>
            <div>Email: {userData?.data?.email}</div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow p-6 sticky top-4">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>${0}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax ({taxRate * 100}%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="border-t pt-3 mt-3 flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            <OrderCart cart={cart[0]} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
