import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const AboutSection = () => {
  return (
    <section className="bg-white py-12 md:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
        {/* Images Column */}
        <div className="flex gap-4 sm:gap-6 order-1 lg:order-none">
          <div className="w-1/2 relative">
            <img
              src="https://i.ibb.co.com/hxNcCMP9/man-choosed-motorcycles-moto-shop-guy-black-jacket-man-helmet.jpg"
              alt="Motorcycle enthusiast"
              className="w-full rounded-xl object-cover h-[200px] sm:h-[300px] md:h-[400px] lg:h-[500px]"
            />
          </div>
          <div className="w-1/2 relative mt-8 sm:mt-12 md:mt-16">
            <img
              src="https://i.ibb.co.com/zV4Hrw2v/old-motorcycle-with-helmet-outdoors.jpg"
              alt="Vintage motorcycle"
              className="w-full rounded-xl object-cover h-[200px] sm:h-[300px] md:h-[400px] lg:h-[500px]"
            />
          </div>
        </div>

        {/* Text Column */}
        <div className="order-2 lg:order-none">
          <p className="text-sm text-[#E81938] font-semibold uppercase tracking-wide mb-2">
            About Us
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-4">
            Driven by Passion, Powered by Performance
          </h2>
          <p className="text-gray-600 mb-6 leading-relaxed">
            At Velocity Bikes, we believe that cycling is more than just a mode
            of transport — it's a lifestyle. From high-performance road bikes to
            rugged mountain rides and urban commuters, our mission is to deliver
            quality, reliability, and a smooth ride every time.
          </p>
          <p className="text-gray-600 mb-6 leading-relaxed">
            With expert service, premium gear, and a community-first approach,
            we're here to keep you rolling — wherever the road takes you.
          </p>
          <Link to="/about">
            <Button className="w-full sm:w-auto">Learn More About Us</Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;