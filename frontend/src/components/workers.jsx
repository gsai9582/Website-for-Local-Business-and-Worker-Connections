import { useEffect, useState } from "react";

const Workers = () => {

  
  const [workers, setWorkers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedWorker, setSelectedWorker] = useState(null);
  const [isShopLoggedIn, setIsShopLoggedIn] = useState(false);

  useEffect(() => {
    fetch("https://work-wagon-ez8e.onrender.com/workers")
      .then((res) => res.json())
      .then((data) => {
        setWorkers(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));

    const shop = localStorage.getItem("shop");
    if (shop) setIsShopLoggedIn(true);
  }, []);
     

     const sendRequest = async (workerId) => {
  try {
   const res = await fetch("https://work-wagon-ez8e.onrender.com/requests/send", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  credentials: "include",
  body: JSON.stringify({
    receiverId: selectedWorker.id
  })
});

if (!res.ok) {
  const text = await res.text();
  alert(text);
  return;
}

const data = await res.json();
alert("Request sent successfully");

  } catch (err) {
    alert(err.message);
  }
};

   

  if (loading) {
    return <div className="text-center text-gray-500 text-lg mt-16">Loading workers...</div>;
  }

  if (workers.length === 0) {
    return <div className="text-center text-gray-500 text-lg mt-16">No workers available.</div>;
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
        {workers.map((data) => (
          <div
            key={data.id}
            className="bg-white rounded-3xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden"
          >
            <div className="h-52 bg-gray-100 flex items-center justify-center overflow-hidden">
              {data.imageData && (
                <img
                  src={`data:${data.imageType};base64,${data.imageData}`}
                  alt={data.worker_name}
                  className="h-full w-full object-cover"
                />
              )}
            </div>

            <div className="p-5">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {data.worker_name}
              </h3>
              <p className="text-sm text-gray-600">
                Work: {data.work_known}
              </p>
              <p className="text-sm text-gray-600 mt-1">
                City: {data.city}
              </p>

              <button
                onClick={() => setSelectedWorker(data)}
                className="mt-4 w-full bg-indigo-500 hover:bg-indigo-600 text-white py-2 rounded-xl transition"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedWorker && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl p-8 relative">
            <button
              onClick={() => setSelectedWorker(null)}
              className="absolute top-4 right-4 text-gray-500 hover:text-black"
            >
              ✕
            </button>

            {selectedWorker.imageData && (
              <div className="h-52 bg-gray-100 rounded-xl overflow-hidden mb-5">
                <img
                  src={`data:${selectedWorker.imageType};base64,${selectedWorker.imageData}`}
                  alt={selectedWorker.worker_name}
                  className="h-full w-full object-cover"
                />
              </div>
            )}

            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              {selectedWorker.worker_name}
            </h2>

            <div className="space-y-2 text-gray-700">
              <p><span className="font-semibold">Work Known:</span> {selectedWorker.work_known}</p>
              <p><span className="font-semibold">Age:</span> {selectedWorker.age}</p>
              <p><span className="font-semibold">City:</span> {selectedWorker.city}</p>
              <p><span className="font-semibold">Available:</span> {selectedWorker.available}</p>
              <p><span className="font-semibold">Expected Salary:</span> {selectedWorker.salary}</p>
              <p><span className="font-semibold">Email:</span> {selectedWorker.email}</p>
              <p><span className="font-semibold">Mobile:</span> {selectedWorker.mobile}</p>
            </div>

            {isShopLoggedIn && selectedWorker.available === "Yes" && (
              <button  
    onClick={() => sendRequest(selectedWorker.id)} className="mt-6 w-full bg-indigo-500 hover:bg-indigo-600 text-white py-3 rounded-xl transition">
                Request
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Workers;