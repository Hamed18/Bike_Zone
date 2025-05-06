import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useEffect } from "react";
import { IoIosArrowUp } from "react-icons/io";

const Scroll = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <div>
      <Button
        onClick={scrollToTop}
        className={`fixed bottom-10 right-10 h-14 w-14 rounded-full  text-white shadow-xl hover:bg-blue-700 transition-all duration-300 flex items-center justify-center text-3xl ${
          isVisible ? "block" : "hidden"
        }`}
      >
        <IoIosArrowUp />
      </Button>
    </div>
  );
};

export default Scroll;
