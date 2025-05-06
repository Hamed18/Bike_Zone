import { useState } from "react";
import { Plus, Edit, Trash2, Search, Info } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import AddProduct from "./AddProduct";
import {
  useDeleteProductMutation,
  useGetAllProductsQuery,
} from "@/redux/features/product/productApi";
import LoadAnimation from "@/components/menu/LoadAnimation";
import { TProduct } from "@/types";
import UpdateProduct from "./UpdateProduct";
import { toast } from "sonner";
import DeleteConfirmationDialog from "@/components/others/DeleteConfirmationDialog";
import { Link } from "react-router-dom";

const ManageProducts = () => {
  const {
    data: productData,
    isLoading,
    refetch,
  } = useGetAllProductsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const [deleteProduct] = useDeleteProductMutation();

  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(
    null
  );
  const [productToDelete, setProductToDelete] = useState<{
    id: string;
    name: string;
  } | null>(null);

  const filteredProducts = productData?.data.filter((product: TProduct) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEditClick = (productId: string) => {
    setSelectedProductId(productId);
  };

  const handleUpdateDialogClose = () => {
    setSelectedProductId(null);
  };

  const handleDeleteClick = (product: TProduct) => {
    setProductToDelete({
      id: product._id,
      name: product.name,
    });
  };

  const handleDeleteConfirm = async () => {
    if (!productToDelete) return;
    try {
      await deleteProduct(productToDelete?.id);
      refetch();
      toast.success("Product deleted successfully");
    } catch (error) {
      toast.error("Failed to delete product");
      console.error("Delete error:", error);
    } finally {
      setProductToDelete(null);
    }
  };

  const handleDeleteCancel = () => {
    setProductToDelete(null);
  };

  if (isLoading) {
    return <LoadAnimation />;
  }

  return (
    <div className="p-4 md:p-6">
      {/* Header with title and Add Product button */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h3 className="text-2xl font-bold">Manage Products</h3>

        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Add Product
            </Button>
          </DialogTrigger>
          <AddProduct setIsDialogOpen={setIsAddDialogOpen} refetch={refetch} />
        </Dialog>
      </div>

      {/* Search bar */}
      <div className="relative mb-6 max-w-md">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search products..."
          className="pl-9"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Products table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>#</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Brand</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="text-right">Price</TableHead>
              <TableHead className="text-right">Quantity</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts?.map((product: TProduct, i: number) => (
              <TableRow key={product._id}>
                <TableCell className="font-medium">{i + 1}</TableCell>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell>{product.brand}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell className="text-right">
                  ${product.price.toFixed(2)}
                </TableCell>
                <TableCell className="text-right">{product.quantity}</TableCell>
                <TableCell>
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      product.inStock && product?.quantity > 0
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {product.inStock && product?.quantity > 0 ? "In Stock" : "Out of Stock"}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      title="Edit"
                      variant="destructive"
                      size="icon"
                      onClick={() => handleEditClick(product._id)}
                    >
                      <Edit className="h-4 w-4 text-green-200" />
                    </Button>

                    <Button
                      onClick={() => handleDeleteClick(product)}
                      title="Delete"
                      variant="outline"
                      size="icon"
                    >
                      <Trash2 className="h-4 w-4 text-red-300" />
                    </Button>

                    <Link to={`/product/${product?._id}`} >
                      <Button title="Details" variant="outline" size="icon">
                        <Info className="h-4 w-4 text-blue-300" />
                      </Button>
                    </Link>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Update Product Dialog */}
      <Dialog
        open={!!selectedProductId}
        onOpenChange={(open) => !open && handleUpdateDialogClose()}
      >
        <UpdateProduct
          setIsUpdateProduct={handleUpdateDialogClose}
          refetch={refetch}
          productId={selectedProductId || ""}
        />
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmationDialog
        isOpen={!!productToDelete}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        productName={productToDelete?.name || ""}
      />
    </div>
  );
};

export default ManageProducts;
