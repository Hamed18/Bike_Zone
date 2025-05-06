import { Button } from "@/components/ui/button";
import "./ErrorPage.css";
import { IoIosArrowRoundBack } from "react-icons/io";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="error-item bg-fixed text-center">
      <div className="md:flex justify-center items-center relative ">
        <div className=" text-white z-10">
          <h3 className="text-9xl">404</h3>

          <p className="text-4xl pb-1">Page not found</p>
          <p className="md:max-w-md py-4 ">
            The page you are looking for no longer exists. Perhaps you can
            return to the site's homepage and see if you can find what you are
            looking for.
          </p>
          <Link to="/">
            <Button>
              <IoIosArrowRoundBack /> Back Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
