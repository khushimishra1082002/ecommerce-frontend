import React, { useState, useEffect } from "react";
import {
  deleteBannerData,
  getBannerData,
  getSingleBannerData,
} from "../../services/BannerServices";
import AddBanner from "./AddBanner";
import EditBanner from "./EditBanner";
import { AiOutlinePlus } from "react-icons/ai";

export const DashboardBanner = () => {
  const [showAddBannerModel, setshowAddBannerModel] = useState(false);
  const [showEditBannerModel, setshowEditBannerModel] = useState(false);
  const [data, setData] = useState([]);
  const [editData, setEditData] = useState();
  console.log("editData", editData);

  // ✅ Reusable fetch function
  const fetchBanners = async () => {
    try {
      const res = await getBannerData();
      const heroBanners = res.filter((item) => item.location === "herosection");
      setData(heroBanners);
    } catch (err) {
      console.error("Error fetching banners:", err);
    }
  };

  // ✅ Initial load
  useEffect(() => {
    fetchBanners();
  }, []);

  // ✅ Close modal
  const closeAddBannerModel = () => {
    setshowAddBannerModel(false);
  };

  // ✅ Close modal
  const closeEditBannerModel = () => {
    setshowEditBannerModel(false);
  };

  // ✅ Prevent scroll when modal is open
  useEffect(() => {
    document.body.classList.toggle("overflow-hidden", showAddBannerModel);
    return () => document.body.classList.remove("overflow-hidden");
  }, [showAddBannerModel]);

  // ✅ Delete and refresh
  const handleDelete = async (bannerId) => {
    try {
      const res = await deleteBannerData(bannerId);
      if (res) {
        alert("Banner Deleted Successfully");
        fetchBanners(); // Refresh banners after delete
      }
    } catch (error) {
      console.error("Delete failed:", error);
      alert("Failed to delete banner. Please try again.");
    }
  };

  const handleEdit = async (bannerId) => {
    console.log("Clicked edit for bannerId:", bannerId); // ✅ Add this

    try {
      const res = await getSingleBannerData(bannerId);
      if (res) {
        setEditData(res);
        setshowEditBannerModel(true);
      }
    } catch (error) {
      console.error("Error fetching product for edit:", error);
    }
  };

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-base font-medium font-heading">
          Hero Section Banners
        </h2>
        <button
          onClick={() => setshowAddBannerModel(true)}
          className="border border-orange-500 font-heading text-sm px-4 py-2 rounded
          flex justify-center items-center gap-1"
        >
          <AiOutlinePlus className="text-lg text-orange-600" />
          Add New Banner
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {data.map((banner) => (
          <div key={banner._id} className="border p-4 shadow rounded space-y-2">
            <img
              src={`http://localhost:5000/api/upload/${banner.image}`}
              alt="Banner"
              className="w-full h-52 object-cover"
            />
            <div className="flex flex-col text-sm font-heading font-light">
              <p>
                <span>Location:</span> {banner.location}
              </p>
              <p>
                <span>Start:</span>{" "}
                {new Date(banner.startDate).toLocaleDateString()}
              </p>
              <p>
                <span>End:</span>{" "}
                {new Date(banner.endDate).toLocaleDateString()}
              </p>
              <p>
                <span>Order:</span> {banner.displayOrder}
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(banner._id)}
                className="bg-yellow-500 text-white px-3 py-1 rounded font-heading text-sm
                font-medium"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(banner._id)}
                className="bg-red-600 text-white px-3 py-1 rounded font-heading text-sm
                font-medium"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showAddBannerModel && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 px-4">
          <div className="bg-white rounded-md shadow-md w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6">
            <AddBanner
              closeAddBannerModel={closeAddBannerModel}
              refreshBanners={fetchBanners} // ✅ passed here
            />
          </div>
        </div>
      )}

      {showEditBannerModel && editData && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 px-4">
          <div className="bg-white rounded-md shadow-md w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6">
            <EditBanner
              closeEditBannerModel={closeEditBannerModel}
              editData={editData}
              fetchBanners={fetchBanners}
            />
          </div>
        </div>
      )}
    </>
  );
};
