import Header from "./header";
import Tabs from "./tabs";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <Header />
      <div className="max-w-7xl mx-auto px-6 py-10">
        <Tabs />
      </div>
    </div>
  );
};

export default Home;