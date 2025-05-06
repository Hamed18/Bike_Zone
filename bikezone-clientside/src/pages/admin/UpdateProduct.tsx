import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader } from "lucide-react";
import { productSchema } from "@/schemas/productForm.schema";
import { toast } from "sonner";

type TProductFormData = z.infer<typeof productSchema>;
import { useEffect } from "react";
import {
  useUpdateProductMutation,
  useGetSingleProductQuery,
} from "@/redux/features/product/productApi";
import LoadAnimation from "@/components/menu/LoadAnimation";

const UpdateProduct = ({
  setIsUpdateProduct,
  refetch,
  productId,
}: {
  setIsUpdateProduct: (open: boolean) => void;
  refetch: () => void;
  productId: string;
}) => {
  const [updateProduct, { isLoading }] = useUpdateProductMutation();
  const { data: product, isFetching: isProductFetching } =
    useGetSingleProductQuery(productId, {
      skip: !productId,
    });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<TProductFormData>({
    resolver: zodResolver(productSchema),
  });

  useEffect(() => {
    if (product) {
      // Pre-fill the form with existing product data
      setValue("name", product.data.name);
      setValue("brand", product.data.brand);
      setValue("image", product.data.image);
      setValue("price", product.data.price);
      setValue("category", product.data.category);
      setValue("description", product.data.description);
      setValue("quantity", product.data.quantity);
      setValue("inStock", product.data.inStock);
    }
  }, [product, setValue]);

  const inStockValue = watch("inStock");

  const onSubmit = async (data: TProductFormData) => {
    const toastId = toast.loading("Updating...");
    try {
      const result = await updateProduct({
        id: productId,
        data,
      }).unwrap();
      console.log("Product updated successfully:", result);
      toast.success("Product Updated!", { id: toastId });
      setIsUpdateProduct(false);
      refetch();
    } catch (error) {
      toast.error("Update Failed!", { id: toastId });
      console.error("Failed to update product:", error);
    }
  };
  if (isProductFetching) {
    return <LoadAnimation />;
  }

  return (
    <DialogContent className="sm:max-w-[600px]">
      <DialogHeader>
        <DialogTitle>Update Product</DialogTitle>
      </DialogHeader>
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Product Name</Label>
            <Input
              id="name"
              {...register("name")}
              placeholder="Enter product name"
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="brand">Brand</Label>
            <Input
              id="brand"
              {...register("brand")}
              placeholder="Enter brand name"
            />
            {errors.brand && (
              <p className="text-sm text-red-500">{errors.brand.message}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="price">Price ($)</Label>
            <Input
              id="price"
              type="number"
              min="0"
              step="0.01"
              {...register("price", { valueAsNumber: true })}
            />
            {errors.price && (
              <p className="text-sm text-red-500">{errors.price.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <select
              id="category"
              {...register("category")}
              className="block w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            >
              <option value="">Select category</option>
              <option value="Mountain">Mountain</option>
              <option value="Road">Road</option>
              <option value="Hybrid">Hybrid</option>
              <option value="Electric">Electric</option>
            </select>
            {errors.category && (
              <p className="text-sm text-red-500">{errors.category.message}</p>
            )}
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="image">Product Image URL</Label>
          <Input
            id="image"
            {...register("image")}
            placeholder="Enter product image"
          />
          {errors.image && (
            <p className="text-sm text-red-500">{errors.image.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            {...register("description")}
            placeholder="Enter product description"
          />
          {errors.description && (
            <p className="text-sm text-red-500">{errors.description.message}</p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="quantity">Quantity</Label>
            <Input
              id="quantity"
              type="number"
              min="0"
              {...register("quantity", { valueAsNumber: true })}
            />
            {errors.quantity && (
              <p className="text-sm text-red-500">{errors.quantity.message}</p>
            )}
          </div>
          <div className="flex items-center justify-end space-x-2 pt-7">
            <Switch
              id="inStock"
              checked={inStockValue}
              onCheckedChange={(checked) => setValue("inStock", checked)}
            />
            <Label htmlFor="inStock">
              {inStockValue ? "In Stock" : "Out of Stock"}
            </Label>
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-4">
          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader className="mr-2 h-4 w-4 animate-spin" />
                Updating...
              </>
            ) : (
              "Update Product"
            )}
          </Button>
        </div>
      </form>
    </DialogContent>
  );
};

export default UpdateProduct;
