
import { useEffect, useState } from "react";

const API = "https://work-wagon-ez8e.onrender.com";

const Profile = () => {

  const [data, setData] = useState(null);
  const [pendingRequests, setPendingRequests] = useState([]);
  const [acceptedRequests, setAcceptedRequests] = useState([]);
  const [activeTab, setActiveTab] = useState("profile");

  useEffect(() => {

    const shop = localStorage.getItem("shop");
    const worker = localStorage.getItem("worker");

    let url = "";

    if (shop) url = `${API}/shop/profile`;
    if (worker) url = `${API}/worker/profile`;

    if (url) {
      fetch(url, { credentials: "include" })
        .then(async (res) => {
          if (!res.ok) {
            const text = await res.text();
            throw new Error(text);
          }
          return res.json();
        })
        .then(data => setData(data))
        .catch(err => console.log(err.message));
    }

    fetch(`${API}/requests/pending`, {
      credentials: "include"
    })
      .then(async res => {
        if (!res.ok) return [];
        return res.json();
      })
      .then(data => setPendingRequests(data))
      .catch(() => setPendingRequests([]));

    fetch(`${API}/requests/accepted`, {
      credentials: "include"
    })
      .then(async res => {
        if (!res.ok) return [];
        return res.json();
      })
      .then(data => setAcceptedRequests(data))
      .catch(() => setAcceptedRequests([]));

  }, []);

  const handleAccept = async (id) => {

    const res = await fetch(`${API}/requests/${id}/accept`, {
      method: "PUT",
      credentials: "include"
    });

    if (res.ok) {
      alert("Request accepted");
      setPendingRequests(prev => prev.filter(req => req.id !== id));
      setAcceptedRequests(prev => [...prev, { id }]);
    }

  };

  const handleReject = async (id) => {

    const res = await fetch(`${API}/requests/${id}/reject`, {
      method: "PUT",
      credentials: "include"
    });

    if (res.ok) {
      alert("Request rejected");
      setPendingRequests(prev => prev.filter(req => req.id !== id));
    }

  };

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading profile...
      </div>
    );
  }

  const imageSrc = data.imageData
    ? `data:${data.imageType};base64,${data.imageData}`
    : null;

  const isShop = data.shop_name !== undefined;
  const isWorker = data.worker_name !== undefined;

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden">

        {/* Header */}

        <div className="bg-indigo-500 p-6 flex items-center gap-6">

          {imageSrc ? (
            <img
              src={imageSrc}
              alt="profile"
              className="w-20 h-20 rounded-full object-cover border-4 border-white"
            />
          ) : (
            <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center text-indigo-600 font-bold text-2xl">
              {isShop ? data.shop_name?.charAt(0) : data.worker_name?.charAt(0)}
            </div>
          )}

          <div className="text-white">
            <h2 className="text-2xl font-bold">
              {isShop ? data.shop_name : data.worker_name}
            </h2>

            <span className="text-sm bg-white text-indigo-600 px-3 py-1 rounded-full font-medium">
              {isShop ? "Shopkeeper" : "Worker"}
            </span>
          </div>

        </div>

        {/* Tabs */}

        <div className="flex justify-center gap-6 border-b py-4">

          <button
            onClick={() => setActiveTab("profile")}
            className={activeTab === "profile" ? "font-bold text-indigo-600" : ""}
          >
            Profile
          </button>

          <button
            onClick={() => setActiveTab("pending")}
            className={activeTab === "pending" ? "font-bold text-indigo-600" : ""}
          >
            Pending Requests
          </button>

          <button
            onClick={() => setActiveTab("accepted")}
            className={activeTab === "accepted" ? "font-bold text-indigo-600" : ""}
          >
            Accepted Requests
          </button>

        </div>

        <div className="p-8">

          {/* PROFILE TAB */}

          {activeTab === "profile" && (
            <div className="grid grid-cols-2 gap-4 text-gray-700">

              <p><b>Email</b><br />{data.email}</p>
              <p><b>Mobile</b><br />{data.mobile}</p>

              {isShop && (
                <>
                  <p><b>Shop Keeper</b><br />{data.shop_keeper_name}</p>
                  <p><b>Job Role</b><br />{data.job_name}</p>
                  <p><b>Vacancies</b><br />{data.available}</p>
                </>
              )}

              {isWorker && (
                <>
                  <p><b>Work Known</b><br />{data.work_known}</p>
                  <p><b>City</b><br />{data.city}</p>
                  <p><b>Salary</b><br />₹{data.salary}</p>
                </>
              )}

            </div>
          )}

          {/* PENDING REQUESTS */}

          {activeTab === "pending" && (

            <div className="space-y-4">

              {pendingRequests.length === 0 && (
                <p className="text-gray-500">No pending requests</p>
              )}

              {pendingRequests.map(req => (

                <div key={req.id} className="border p-4 rounded-xl flex justify-between items-center">

                  <div>
                    Request ID: {req.id}
                  </div>

                  <div className="flex gap-3">

                    <button
                      onClick={() => handleAccept(req.id)}
                      className="bg-green-500 text-white px-4 py-1 rounded"
                    >
                      Accept
                    </button>

                    <button
                      onClick={() => handleReject(req.id)}
                      className="bg-red-500 text-white px-4 py-1 rounded"
                    >
                      Reject
                    </button>

                  </div>

                </div>

              ))}

            </div>
          )}

          {/* ACCEPTED REQUESTS */}

          {activeTab === "accepted" && (

            <div className="space-y-4">

              {acceptedRequests.length === 0 && (
                <p className="text-gray-500">No accepted requests</p>
              )}

              {acceptedRequests.map(req => (

                <div key={req.id} className="border p-4 rounded-xl">
                  Request ID: {req.id}
                </div>

              ))}

            </div>

          )}

        </div>

      </div>

    </div>
  );
};

export default Profile;

