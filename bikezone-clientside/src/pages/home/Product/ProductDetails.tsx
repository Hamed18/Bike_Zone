import { useGetAllProductsQuery } from "@/redux/features/product/productApi";
import { TProduct } from "@/types";
import { Link, useParams } from "react-router-dom";
// import OrderCart from "@/pages/order/OrderCart";
import SectionBanner from "@/components/SectionBanner/SectionBanner";
import LoadAnimation from "@/components/menu/LoadAnimation";
import { ApiError } from "@/types/global.type";
import { Button } from "@/components/ui/button";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hooks";
import { useGeSingletUserQuery } from "@/redux/features/user/userApi";

const ProductDetails = () => {
  const currentData = useAppSelector(selectCurrentUser);
  const { data: userData, isLoading: userLoading } = useGeSingletUserQuery(
    currentData?._id
  );

  const { productId } = useParams();
  const { data, error, isLoading, isError } = useGetAllProductsQuery(undefined);

  const products: TProduct[] = data?.data || [];
  const product = products.find(
    (prod: TProduct) => String(prod._id) === productId
  );

  if (isLoading || userLoading) {
    return <LoadAnimation />;
  }

  if (isError) {
    return (
      <div className="p-4 md:p-6">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline">
            {" "}
            {(error as ApiError)?.data?.message || "Failed to load product"}
          </span>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="p-4 md:p-6">
        <div className="flex flex-col items-center justify-center gap-4 h-[calc(100vh-200px)]">
          <h3 className="text-xl font-semibold">No product found</h3>
        </div>
      </div>
    );
  }

  return (
    <div>
      <SectionBanner heading="Product Details" subHeading="Product Details" />
      <div className="max-w-7xl mx-auto px-2">
        <div className="grid md:grid-cols-2 md:gap-10 gap-5 items-start my-10">
          <div>
            <img
              className="w-full md:h-[60vh] object-contain rounded-2xl"
              src={product.image}
              alt={product.name}
            />
          </div>
          <div className="px-4">
            <h3 className="text-xl font-bold py-5">{product.name}</h3>
            <h2 className="text-2xl text-[#E81938] font-bold border-b border-black mb-2">
              Price: ${product.price}
            </h2>
            <div className="text-gray-700 font-semibold pb-4">
              <p className="">Category : {product.category}</p>
              <p className="my-2">Available : {product.quantity}</p>
              <p className="">Brand : {product.brand}</p>
              <p className="mt-4">{product.description}</p>
            </div>
            {userData?.data?.isActive == false ? (
              <Button style={{ backgroundColor: "red" }}>
                You are blocked
              </Button>
            ) : product.inStock && product?.quantity > 0 ? (
              currentData?.role == "admin" ? (
                <Button style={{ backgroundColor: "red" }}>
                  Admin Can't Buy
                </Button>
              ) : (
                <Link to={`/checkout/${product._id}`}>
                  <Button>Buy Now</Button>
                </Link>
              )
            ) : (
              <Button>Out of stock</Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
