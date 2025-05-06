import { BiMenuAltLeft } from "react-icons/bi";
import { BiMenuAltRight } from "react-icons/bi";
interface SectionTitleProps {
  subtitle: string;
  title: string;
}
const SectionTitle = ({ subtitle, title }: SectionTitleProps) => {
  return (
    <div className="text-center sm:py-20 py-10 font-semibold">
      <div className="flex justify-center items-center gap-2 md:text-lg uppercase">
        <BiMenuAltRight className="text-[#E81938] " />
        {subtitle}
        <BiMenuAltLeft className="text-[#E81938] " />
      </div>

      <div className="sm:text-5xl text-2xl">{title}</div>
    </div>
  );
};

export default SectionTitle;
