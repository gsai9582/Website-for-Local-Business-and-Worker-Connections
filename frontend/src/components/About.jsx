import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-100">

      {/* Hero Section */}
      <div className="relative py-24 px-6 text-center">
        <h1 className="text-5xl font-extrabold text-gray-800 mb-6">
          About <span className="text-indigo-600">Work Wagon</span>
        </h1>
        <p className="max-w-3xl mx-auto text-lg text-gray-600 leading-relaxed">
          Work Wagon is a smart local employment platform connecting shopkeepers 
          and skilled workers in a seamless, efficient, and transparent way.
        </p>
      </div>

      {/* Mission Section */}
      <div className="max-w-6xl mx-auto px-6 pb-20 grid md:grid-cols-3 gap-10">

        <div className="bg-white/70 backdrop-blur-lg rounded-3xl shadow-lg p-8 hover:shadow-2xl transition duration-300">
          <h3 className="text-xl font-bold text-indigo-600 mb-4">🚀 Our Mission</h3>
          <p className="text-gray-600 leading-relaxed">
            To bridge the gap between local businesses and job seekers by 
            creating a reliable digital ecosystem where opportunities meet talent.
          </p>
        </div>

        <div className="bg-white/70 backdrop-blur-lg rounded-3xl shadow-lg p-8 hover:shadow-2xl transition duration-300">
          <h3 className="text-xl font-bold text-indigo-600 mb-4">🤝 How It Helps</h3>
          <p className="text-gray-600 leading-relaxed">
            Shopkeepers can post job vacancies, while workers can showcase 
            their skills and availability. This makes hiring and job searching 
            faster and more transparent.
          </p>
        </div>

        <div className="bg-white/70 backdrop-blur-lg rounded-3xl shadow-lg p-8 hover:shadow-2xl transition duration-300">
          <h3 className="text-xl font-bold text-indigo-600 mb-4">🌍 Why Work Wagon</h3>
          <p className="text-gray-600 leading-relaxed">
            Unlike traditional hiring methods, Work Wagon centralizes local 
            job opportunities in one place, reducing effort and improving 
            trust between employers and workers.
          </p>
        </div>

      </div>

      {/* How To Use Section */}
      <div className="bg-white py-20 px-6">
        <div className="max-w-5xl mx-auto">

          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            How To Use Work Wagon
          </h2>

          <div className="space-y-10">

            <div className="flex gap-6 items-start">
              <div className="w-12 h-12 flex items-center justify-center bg-indigo-500 text-white rounded-full font-bold">
                1
              </div>
              <div>
                <h4 className="font-semibold text-lg text-gray-800">
                  Register Your Account
                </h4>
                <p className="text-gray-600">
                  Sign up as a Shopkeeper or Worker based on your role.
                  Fill in accurate details and upload your profile image.
                </p>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="w-12 h-12 flex items-center justify-center bg-indigo-500 text-white rounded-full font-bold">
                2
              </div>
              <div>
                <h4 className="font-semibold text-lg text-gray-800">
                  Explore Opportunities
                </h4>
                <p className="text-gray-600">
                  Browse available shops or workers. Use the detailed view
                  to understand complete profile information.
                </p>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="w-12 h-12 flex items-center justify-center bg-indigo-500 text-white rounded-full font-bold">
                3
              </div>
              <div>
                <h4 className="font-semibold text-lg text-gray-800">
                  Send Requests
                </h4>
                <p className="text-gray-600">
                  Workers can request job vacancies. Shopkeepers can request
                  skilled workers. The system ensures role-based interaction.
                </p>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="w-12 h-12 flex items-center justify-center bg-indigo-500 text-white rounded-full font-bold">
                4
              </div>
              <div>
                <h4 className="font-semibold text-lg text-gray-800">
                  Manage Profile
                </h4>
                <p className="text-gray-600">
                  After login, access your profile dashboard to manage 
                  information and track engagement.
                </p>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 text-center bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
        <h2 className="text-3xl font-bold mb-6">
          Start Connecting Today
        </h2>
        <p className="mb-8 text-lg opacity-90">
          Whether you're hiring or seeking work, Work Wagon makes it simple.
        </p>

        <Link
          to="/"
          className="bg-white text-indigo-600 font-semibold px-8 py-3 rounded-full shadow-lg hover:scale-105 transition"
        >
          Explore Now
        </Link>
      </div>

    </div>
  );
};

export default About;