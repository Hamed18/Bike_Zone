import { useState } from "react";
import { Search, Filter, ChevronDown, X, RotateCcw } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Link } from "react-router-dom";
import LoadAnimation from "@/components/menu/LoadAnimation";
import { useGetAllProductsQuery } from "@/redux/features/product/productApi";
import { toast } from "sonner";
import { TProduct } from "@/types";
import SectionBanner from "@/components/SectionBanner/SectionBanner";

const AllProducts = () => {
  const {
    data: productData,
    isLoading,
    isError,
  } = useGetAllProductsQuery(undefined);
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 0]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [inStockOnly, setInStockOnly] = useState(false);

  // Calculate max price when data loads
  const products = productData?.data || [];
  const maxPrice =
    products.length > 0
      ? Math.max(...products.map((p: TProduct) => p.price))
      : 0;

  // Initialize price range once when data loads
  if (priceRange[1] === 0 && maxPrice > 0) {
    setPriceRange([0, maxPrice]);
  }

  // Get unique brands and categories for filters
  const brands = [
    ...new Set(products.map((product: TProduct) => product.brand)),
  ];
  const categories = [
    ...new Set(products.map((product: TProduct) => product.category)),
  ];

  // Filter products based on search and filters
  const filteredProducts = products.filter((product: TProduct) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesPrice =
      product.price >= priceRange[0] && product.price <= priceRange[1];

    const matchesBrand =
      selectedBrands.length === 0 || selectedBrands.includes(product.brand);

    const matchesCategory =
      selectedCategories.length === 0 ||
      selectedCategories.includes(product.category);

    const matchesStock = !inStockOnly || product.inStock;

    return (
      matchesSearch &&
      matchesPrice &&
      matchesBrand &&
      matchesCategory &&
      matchesStock
    );
  });

  const toggleBrand = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const resetPriceRange = () => {
    setPriceRange([0, maxPrice]);
    toast.success("Price range reset");
  };

  const resetFilters = () => {
    setSearchTerm("");
    setPriceRange([0, maxPrice]);
    setSelectedBrands([]);
    setSelectedCategories([]);
    setInStockOnly(false);
    toast.success("All filters reset");
  };

  if (isLoading) {
    return <LoadAnimation />;
  }

  if (isError) {
    return (
      <div className="py-4 max-w-7xl mx-auto px-4 text-center">
        <h3 className="text-2xl font-bold">Error Loading Products</h3>
        <p className="text-muted-foreground mt-2">
          Failed to load products. Please try again later.
        </p>
      </div>
    );
  }

  return (
    <>
      <SectionBanner heading={"All Products"} subHeading={"All Products"} />
      <div className="py-4 max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold">Products</h3>
          {(searchTerm ||
            selectedBrands.length > 0 ||
            selectedCategories.length > 0 ||
            inStockOnly ||
            priceRange[0] !== 0 ||
            priceRange[1] !== maxPrice) && (
            <Button onClick={resetFilters}>
              <X className="h-4 w-4 mr-1" />
              Reset Filters
            </Button>
          )}
        </div>

        {/* Search and Filter Bar */}
        <div className="flex flex-col md:flex-row gap-4 my-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name, brand, or category..."
              className="pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="gap-2">
                <Filter className="h-4 w-4" />
                Filters
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 p-4 space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <h4 className="text-sm font-medium">Price Range</h4>
                  {(priceRange[0] !== 0 || priceRange[1] !== maxPrice) && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={resetPriceRange}
                      className="h-6 px-2 text-xs text-primary"
                    >
                      <RotateCcw className="h-3 w-3 mr-1" />
                      Reset
                    </Button>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    placeholder="Min"
                    value={priceRange[0]}
                    onChange={(e) =>
                      setPriceRange([Number(e.target.value), priceRange[1]])
                    }
                  />
                  <span>-</span>
                  <Input
                    type="number"
                    placeholder="Max"
                    value={priceRange[1]}
                    onChange={(e) =>
                      setPriceRange([priceRange[0], Number(e.target.value)])
                    }
                  />
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium mb-2">Brands</h4>
                <div className="space-y-2">
                  {brands.map((brand) => (
                    <DropdownMenuCheckboxItem
                      checked={selectedBrands.includes(brand as string)}
                      onCheckedChange={() => toggleBrand(brand as string)}
                    >
                      {brand as string}
                    </DropdownMenuCheckboxItem>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium mb-2">Categories</h4>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <DropdownMenuCheckboxItem
                      checked={selectedCategories.includes(category as string)}
                      onCheckedChange={() => toggleCategory(category as string)}
                    >
                      {category as string}
                    </DropdownMenuCheckboxItem>
                  ))}
                </div>
              </div>

              <div>
                <DropdownMenuCheckboxItem
                  checked={inStockOnly}
                  onCheckedChange={() => setInStockOnly(!inStockOnly)}
                >
                  In Stock Only
                </DropdownMenuCheckboxItem>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Products Count */}
        <div className="text-sm text-muted-foreground mb-4">
          Showing {filteredProducts.length}{" "}
          {filteredProducts.length === 1 ? "product" : "products"}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product: TProduct) => {
            return (
              <Card
                key={product._id}
                className="hover:shadow-lg transition-shadow h-full flex flex-col"
              >
                <CardHeader className="p-0">
                  <img
                    src={product.image || "https://via.placeholder.com/300x200"}
                    alt={product.name}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                </CardHeader>
                <CardContent className="p-4 flex-grow">
                  <CardTitle className="text-lg">{product.name}</CardTitle>
                  <div className="mt-2 space-y-1">
                    <p className="text-sm">
                      <span className="font-medium">Brand:</span>{" "}
                      {product.brand}
                    </p>
                    <p className="text-sm">
                      <span className="font-medium">Category:</span>{" "}
                      {product.category}
                    </p>
                    <p className="text-sm">
                      <span className="font-medium">Price:</span> $
                      {product.price.toFixed(2)}
                    </p>
                    <p className="text-sm">
                      <span className="font-medium">Status:</span>
                      <span
                        className={`ml-1 px-2 py-0.5 rounded-full text-xs ${
                          product.inStock && product?.quantity > 0
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {product.inStock && product?.quantity > 0
                          ? "In Stock"
                          : "Out of Stock"}
                      </span>
                    </p>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                    {product.description}
                  </p>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <Link to={`/product/${product._id}`} className="w-full">
                    <Button className="w-full">View Details</Button>
                  </Link>
                </CardFooter>
              </Card>
            );
          })}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12 border rounded-lg">
            <p className="text-muted-foreground">
              No products match your search criteria
            </p>
            <Button className="mt-4" onClick={resetFilters}>
              Clear all filters
            </Button>
          </div>
        )}
      </div>
    </>
  );
};

export default AllProducts;
