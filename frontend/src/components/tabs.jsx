import { useState } from "react";
import Shops from "./shops";
import Workers from "./workers";
import { Store, Users } from "lucide-react";

const Tabs = () => {

  const [activeTab, setActiveTab] = useState("shops");

  return (
    <div className="py-10 px-4">

      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-gray-800">
          Find Work Opportunities
        </h2>
        <p className="text-gray-500 mt-2">
          Explore shops looking for workers or workers searching for jobs
        </p>
      </div>

      {/* Tabs */}
      <div className="flex justify-center mb-12">

        <div className="relative bg-white rounded-full shadow-lg p-2 flex gap-2">

          <button
            onClick={() => setActiveTab("shops")}
            className={`flex items-center gap-2 px-8 py-2 rounded-full font-medium transition ${
              activeTab === "shops"
                ? "bg-indigo-500 text-white shadow-md"
                : "text-gray-600 hover:bg-indigo-50"
            }`}
          >
            <Store size={18} />
            Shops
          </button>

          <button
            onClick={() => setActiveTab("workers")}
            className={`flex items-center gap-2 px-8 py-2 rounded-full font-medium transition ${
              activeTab === "workers"
                ? "bg-indigo-500 text-white shadow-md"
                : "text-gray-600 hover:bg-indigo-50"
            }`}
          >
            <Users size={18} />
            Workers
          </button>

        </div>

      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto transition-all duration-300">
        {activeTab === "shops" ? <Shops /> : <Workers />}
      </div>

    </div>
  );
};

export default Tabs;