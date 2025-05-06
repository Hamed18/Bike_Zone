import SectionTitle from "@/components/SectionTitle/SectionTitle";
import ProductCard from "./ProductCard";

const FeaturedProduct = () => {
  return (
    <div className="max-w-7xl mx-auto px-2">
      <SectionTitle subtitle="Our products" title="Best Selling" />
      <ProductCard />
    </div>
  );
};

export default FeaturedProduct;
