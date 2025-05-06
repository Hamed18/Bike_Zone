import AboutSection from "../AboutSection";
import Banner from "./Banner";
import FeaturedProduct from "./Product/FeaturedProduct";
import Scroll from "./Scroll/Scroll";
import Testimonials from "./Testimonials/Testimonials";

const Home = () => {
  return (
    <div className="min-h-screen">
      <Banner />
      <AboutSection />
      <FeaturedProduct />
      <Testimonials />
      <Scroll />
    </div>
  );
};

export default Home;
