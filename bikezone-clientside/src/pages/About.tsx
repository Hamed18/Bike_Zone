import {
  FaBicycle,
  FaLeaf,
  FaPhoneAlt,
  FaEnvelope,
  FaUsers,
} from "react-icons/fa";

const About = () => {
  return (
    <div className="bg-gray-50 text-gray-800">
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-green-400 to-blue-500 text-white h-[300px] md:h-[400px] flex items-center justify-center text-center px-4">
        <div>
          <h1 className="text-3xl md:text-5xl font-bold">
            Welcome to Bike Zone
          </h1>
          <p className="mt-3 text-lg md:text-xl">
            Your ride, your freedom, our mission.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* About Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Who We Are</h2>
          <p className="text-gray-700 leading-relaxed">
            Bike Zone is more than a shop — we are a destination for cycling
            enthusiasts. Whether you’re a daily commuter, weekend adventurer, or
            eco-conscious rider, we bring quality and style to your ride.
          </p>
        </section>

        {/* Mission, Values, Contact */}
        <section className="grid md:grid-cols-3 gap-8 mb-16 text-center">
          <div className="bg-white p-6 rounded-lg shadow-md border hover:shadow-lg transition">
            <FaBicycle className="text-green-600 text-4xl mx-auto mb-4" />
            <h3 className="font-bold text-xl mb-2">Our Mission</h3>
            <p>
              To empower communities through safe, reliable, and affordable
              cycling.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md border hover:shadow-lg transition">
            <FaLeaf className="text-blue-500 text-4xl mx-auto mb-4" />
            <h3 className="font-bold text-xl mb-2">Our Values</h3>
            <p>
              Sustainability, Innovation, Customer-Centricity, and
              Inclusiveness.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md border hover:shadow-lg transition">
            <FaPhoneAlt className="text-yellow-600 text-3xl mx-auto mb-3" />
            <h3 className="font-bold text-xl mb-2">Contact Info</h3>
            <p className="mb-1">
              <FaEnvelope className="inline mr-2" /> support@bikezone.com
            </p>
            <p>
              <FaPhoneAlt className="inline mr-2" /> +880 1234 567 890
            </p>
          </div>
        </section>

        {/* Quote Section */}
        <section className="bg-blue-600 text-white text-center px-6 py-10 rounded-2xl shadow-md mb-16">
          <blockquote className="italic text-xl max-w-2xl mx-auto">
            “Life is like riding a bicycle. To keep your balance, you must keep
            moving.”
          </blockquote>
          <p className="mt-4 font-semibold">– Albert Einstein</p>
        </section>

        {/* Meet the Team */}
        <section className="text-center">
          <h2 className="text-2xl font-bold mb-4">Meet the Team</h2>
          <FaUsers className="text-4xl text-indigo-600 mx-auto mb-4" />
          <p className="text-gray-700 max-w-xl mx-auto">
            Our team is made up of passionate riders, expert mechanics, and
            support staff who are here to help you get the most out of your
            biking experience. We ride, repair, and relate — because we care.
          </p>
        </section>
      </main>
    </div>
  );
};

export default About;
