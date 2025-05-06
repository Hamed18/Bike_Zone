import { useState } from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import { Slider } from "@/components/ui/slider";
// import Marquee from "./home/Marquee";

const demoProducts = [
  {
    _id: "67f67048df9d77cc552cb5c6",
    name: "Speedster Road Elite",
    brand: "Cannondale",
    price: 1299.99,
    category: "Road",
    description: "Lightweight carbon road bike with Shimano 105 groupset",
    quantity: 8,
    inStock: true,
    image:
      "https://cdn.britannica.com/16/126516-050-2D2DB8AC/Triumph-Rocket-III-motorcycle-2005.jpg",
  },
  {
    _id: "67f648c0a269b3fb99e8c80a",
    name: "Urban Commuter Pro",
    brand: "Specialized",
    image:
      "https://cdn.britannica.com/16/126516-050-2D2DB8AC/Triumph-Rocket-III-motorcycle-2005.jpg",
    price: 10000,
    category: "Mountain",
    description: "Premium urban commuter bike with advanced features",
    quantity: 12,
    inStock: true,
  },
  {
    _id: "67f60f8c5e37f9e2313d2130",
    name: "Sample City Commuter Bike",
    brand: "Raleigh",
    price: 2000,
    category: "Mountain",
    description: "Comfortable city bike with durable construction",
    quantity: 4,
    inStock: true,
    image:
      "https://cdn.britannica.com/16/126516-050-2D2DB8AC/Triumph-Rocket-III-motorcycle-2005.jpg",
  },
  {
    _id: "67f5e7665e37f9e2313d210f",
    name: "Trail Master XT",
    brand: "Specialized",
    image:
      "https://cdn.britannica.com/16/126516-050-2D2DB8AC/Triumph-Rocket-III-motorcycle-2005.jpg",
    price: 10000,
    category: "Mountain",
    description: "Professional grade mountain bike for extreme trails",
    quantity: 1,
    inStock: true,
  },
  {
    _id: "67f5e7315e37f9e2313d2109",
    name: "Trailblazer Mountain Bike",
    brand: "Trek",
    image:
      "https://cdn.britannica.com/16/126516-050-2D2DB8AC/Triumph-Rocket-III-motorcycle-2005.jpg",
    price: 899.99,
    category: "Mountain",
    description: "Full-suspension mountain bike with 29-inch wheels",
    quantity: 15,
    inStock: true,
  },
  {
    _id: "67f5e65a5e37f9e2313d2105",
    name: "City Commuter Bike",
    brand: "Raleigh",
    image:
      "https://cdn.britannica.com/16/126516-050-2D2DB8AC/Triumph-Rocket-III-motorcycle-2005.jpg",
    price: 800,
    category: "Hybrid",
    description: "Versatile hybrid bike for daily commuting",
    quantity: 30,
    inStock: true,
  },
];

const AllProducts2 = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [inStockOnly, setInStockOnly] = useState(false);

  // Get unique brands and categories for filters
  const brands = [...new Set(demoProducts.map((product) => product.brand))];
  const categories = [
    ...new Set(demoProducts.map((product) => product.category)),
  ];

  // Calculate max price for the slider
  const maxPrice = Math.max(...demoProducts.map((p) => p.price), 10000);

  // Filter products based on search and filters
  const filteredProducts = demoProducts.filter((product) => {
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

  const resetFilters = () => {
    setPriceRange([0, maxPrice]);
    setSelectedBrands([]);
    setSelectedCategories([]);
    setInStockOnly(false);
    setSearchTerm("");
  };

  return (
    <div className="py-4 max-w-7xl mx-auto px-4">
      {/* Marquee Section */}
      {/* <Marquee /> */}
      
      <h3 className="text-2xl font-bold mb-6">Products</h3>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Filters Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-medium">Filters</h4>
              <Button
                size="sm"
                onClick={resetFilters}
                style={{ color: "white" }}
                className="text-sm text-primary hover:text-primary"
              >
                <X className="h-4 w-4 mr-1" />
                Reset
              </Button>
            </div>

            {/* Search */}
            <div className="mb-6">
              <Label className="block mb-2">Search</Label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search products..."
                  className="pl-9"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {/* Price Range */}
            <div className="mb-6">
              <Label className="block mb-2">Price Range</Label>
              <Slider
                min={0}
                max={maxPrice}
                step={100}
                value={[priceRange[0], priceRange[1]]}
                onValueChange={(value) => setPriceRange([value[0], value[1]])}
                minStepsBetweenThumbs={1}
                className="mb-4"
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>${priceRange[0].toFixed(2)}</span>
                <span>${priceRange[1].toFixed(2)}</span>
              </div>
            </div>

            {/* Brands */}
            <div className="mb-6">
              <Label className="block mb-2">Brands</Label>
              <div className="space-y-2">
                {brands.map((brand) => (
                  <div key={brand} className="flex items-center space-x-2">
                    <Checkbox
                      id={`brand-${brand}`}
                      checked={selectedBrands.includes(brand)}
                      onCheckedChange={() => toggleBrand(brand)}
                    />
                    <Label htmlFor={`brand-${brand}`} className="text-sm">
                      {brand}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Categories */}
            <div className="mb-6">
              <Label className="block mb-2">Categories</Label>
              <div className="space-y-2">
                {categories.map((category) => (
                  <div key={category} className="flex items-center space-x-2">
                    <Checkbox
                      id={`category-${category}`}
                      checked={selectedCategories.includes(category)}
                      onCheckedChange={() => toggleCategory(category)}
                    />
                    <Label htmlFor={`category-${category}`} className="text-sm">
                      {category}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* In Stock Only */}
            <div className="flex items-center space-x-2">
              <Checkbox
                id="inStock"
                checked={inStockOnly}
                onCheckedChange={() => setInStockOnly(!inStockOnly)}
              />
              <Label htmlFor="inStock" className="text-sm">
                In Stock Only
              </Label>
            </div>
          </div>
        </div>

        {/* Products List */}
        <div className="lg:col-span-3">
          {/* Results Count */}
          <div className="mb-4 text-sm text-muted-foreground">
            Showing {filteredProducts.length} of {demoProducts.length} products
          </div>

          {/* Products Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <Card
                  key={product._id}
                  className="hover:shadow-lg transition-shadow h-full flex flex-col"
                >
                  <CardHeader className="p-0">
                    <img
                      src={
                        product.image || "https://via.placeholder.com/300x200"
                      }
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
                        <span className="font-medium">Price:</span> $
                        {product.price.toFixed(2)}
                      </p>
                      <p className="text-sm">
                        <span className="font-medium">Status:</span>
                        <span
                          className={`ml-1 px-2 py-0.5 rounded-full text-xs ${
                            product.inStock
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {product.inStock ? "In Stock" : "Out of Stock"}
                        </span>
                      </p>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                      {product.description}
                    </p>
                  </CardContent>
                  <CardFooter className="p-4 pt-0">
                    <Link to={`/product/${product?._id}`} className="w-full">
                      <Button className="w-full">View Details</Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
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
      </div>
    </div>
  );
};

export default AllProducts2;
