import { GoDotFill } from "react-icons/go";
interface SectionBannerProps {
  heading: string;
  subHeading: string;
  bannerImage?: string;
}
const SectionBanner = ({
  heading,
  subHeading,
  bannerImage,
}: SectionBannerProps) => {
  const defaultImage =
    "https://i.ibb.co.com/jk8CB45Z/photo-custom-made-retro-motorcycle-against-skyscraper.jpg";
  return (
    <div className="w-full">
      <div className="border relative">
        <img
          alt="banner"
          src={bannerImage || defaultImage}
          className="w-full md:h-[60vh] object-cover"
        />
        <div className="absolute inset-0 bg-black/50 z-10" />
        <div className="text-white absolute top-16 md:top-40 flex items-center pl-5 md:pl-32 max-w-[1440px] mx-auto z-20">
          <div>
            <h2 className="text-2xl md:text-[56px] font-bold pb-4 w-1/2 md:w-full">
              {heading}
            </h2>

            <div className="flex items-center gap-2 text-xs md:text-lg font-medium">
              <p>Home</p>
              <GoDotFill />
              <p>{subHeading}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionBanner;
