import SectionBanner from "@/components/SectionBanner/SectionBanner";
import { MdEmail, MdCall, MdLocationPin } from "react-icons/md";
import { Link } from "react-router-dom";
const Contact = () => {
  return (
    <>
      <SectionBanner heading="Contact Us" subHeading="Contact Us" />
      <div className="max-w-7xl grid grid-cols-1 md:grid-cols-2 w-full px-4 md:px-0 mx-auto gap-10 md:gap-32 min-h-screen justify-center items-center">
        <div>
          <h2 className="text-2xl pt-4 md:pt-0 md:text-3xl font-bold ">
            Contact Us
          </h2>
          <p className="pt-6 pb-12 ">
            We'd love to hear from you! Whether you have questions about our
            bikes, need help with maintenance, or want to explore the latest
            models, feel free to reach out.
          </p>
          <div className="grid grid-cols-1 gap-10">
            <div className="flex items-center gap-6">
              <MdEmail className="text-3xl" />
              <div>
                <p className="text-sm ">Email</p>
                <Link
                  to="mailto:info@bikeshop.com"
                  className=" hover:underline"
                >
                  info@bikeshop.com
                </Link>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <MdCall className="text-3xl " />
              <div>
                <p className="text-sm ">Phone</p>
                <Link to="tel:+61406000000" className="hover:underline">
                  +61 400 000 000
                </Link>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <MdLocationPin className="text-3xl" />
              <div>
                <p className="text-sm">Location</p>
                <p className="">Dhaka,Bangladesh</p>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full">
          <div className="w-full h-[334px] lg:h-[600px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.902359664899!2d90.39120471538523!3d23.750903494592175!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b85ac4d1531f%3A0x94785d9e2a8a18e2!2sDhaka!5e0!3m2!1sen!2sbd!4v1712812336563!5m2!1sen!2sbd
"
              width="100%"
              height="100%"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              className="rounded-2xl shadow-lg w-full h-full"
            ></iframe>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
