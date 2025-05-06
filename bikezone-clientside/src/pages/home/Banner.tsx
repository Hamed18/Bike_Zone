import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, EffectFade } from "swiper/modules";
import type { SwiperOptions } from "swiper/types";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { Link } from "react-router-dom";

interface BannerProps {
  banners?: {
    id: number;
    imageUrl: string;
    altText: string;
    title?: string;
    subtitle?: string;
    ctaText?: string;
  }[];
}

const Banner: React.FC<BannerProps> = ({ banners = defaultBanners }) => {
  const swiperParams: SwiperOptions = {
    modules: [Navigation, Autoplay, EffectFade],
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    effect: "fade",
    fadeEffect: {
      crossFade: true,
    },
    loop: true,
    speed: 1000,
    navigation: true,
    pagination: {
      clickable: true,
    },
  };

  return (
    <div className="relative w-full">
      <Swiper {...swiperParams} className="h-[50vh] md:h-[70vh] lg:h-[90vh]">
        {banners.map((banner) => (
          <SwiperSlide key={banner.id} className="relative">
            <div className="absolute inset-0 backdrop-brightness-75 bg-black/20 flex items-center justify-center">
              <div className="text-center text-white px-4 max-w-4xl mx-auto">
                <p className="text-3xl md:text-5xl font-bold mb-4 animate-fadeIn">
                  {banner.title}
                </p>
                <p className="text-sm md:text-2xl mb-6 animate-fadeIn delay-100">
                  {banner.subtitle}
                </p>
                {banner.ctaText && (
                  <Link to={`/products`} className="bg-primary hover:bg-primary-dark text-white font-bold py-2 px-6 rounded-full text-lg animate-fadeIn delay-200">
                    {banner.ctaText}
                  </Link>
                )}
              </div>
            </div>
            <img
              src={banner.imageUrl}
              alt={banner.altText}
              className="w-full h-full object-cover object-center"
              loading="lazy"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

// Default banners data with text content
const defaultBanners = [
  {
    id: 1,
    imageUrl:
      "https://s3-ap-southeast-2.amazonaws.com/imotor-cms/images_cms/240034_wm-bmw-banner-june23-hqn.jpg",
    altText: "BMW Motorcycle Banner 1",
    title: "Experience the Ultimate Ride",
    subtitle: "Discover our premium BMW motorcycle collection with unmatched performance",
    ctaText: "Explore Now"
  },
  {
    id: 2,
    imageUrl:
      "https://s3-ap-southeast-2.amazonaws.com/imotor-cms/images_cms/240036_wm-bmw2-banner-june23-hqn.jpg",
    altText: "BMW Motorcycle Banner 2",
    title: "Summer Special Offers",
    subtitle: "Limited-time discounts on select models. Ride in style this season!",
    ctaText: "View Deals"
  },
];

// Add this to your global CSS for fade-in animation:
// @keyframes fadeIn {
//   from { opacity: 0; transform: translateY(20px); }
//   to { opacity: 1; transform: translateY(0); }
// }
// .animate-fadeIn {
//   animation: fadeIn 0.8s ease-out forwards;
// }
// .delay-100 { animation-delay: 0.2s; }
// .delay-200 { animation-delay: 0.4s; }

export default Banner;