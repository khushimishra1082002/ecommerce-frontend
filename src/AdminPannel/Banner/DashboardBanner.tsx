import React, { useState, useEffect } from "react";
import {
  deleteBannerData,
  getBannerData,
  getSingleBannerData,
} from "../../services/BannerServices";
import AddBanner from "./AddBanner";
import EditBanner from "./EditBanner";
import { AiOutlinePlus } from "react-icons/ai";
import { BannerDTO } from "../../types/banner";
import conf from "../../config/Conf";

export const DashboardBanner: React.FC = () => {
  const [showAddBannerModel, setShowAddBannerModel] = useState<boolean>(false);
  const [showEditBannerModel, setShowEditBannerModel] = useState<boolean>(false);
  const [data, setData] = useState<BannerDTO[]>([]);
  const [editData, setEditData] = useState<BannerDTO | null>(null);

  const fetchBanners = async () => {
    try {
      const res: BannerDTO[] = await getBannerData();
      const heroBanners = res.filter((item) => item.location === "herosection");
      setData(heroBanners);
    } catch (err) {
      console.error("Error fetching banners:", err);
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  const handleDelete = async (bannerId: string) => {
    try {
      const res = await deleteBannerData(bannerId);
      if (res) {
        alert("Banner Deleted Successfully");
        fetchBanners();
      }
    } catch (error) {
      console.error("Delete failed:", error);
      alert("Failed to delete banner. Please try again.");
    }
  };

  const handleEdit = async (bannerId: string) => {
    try {
      const res: BannerDTO = await getSingleBannerData(bannerId);
      setEditData(res);
      setShowEditBannerModel(true);
    } catch (error) {
      console.error("Error fetching banner for edit:", error);
    }
  };

  const closeAddBannerModel = () => {
    setShowAddBannerModel(false);
  };

  const closeEditBannerModel = () => {
    setShowEditBannerModel(false);
    setEditData(null);
  };

  useEffect(() => {
    document.body.classList.toggle("overflow-hidden", showAddBannerModel);
    return () => document.body.classList.remove("overflow-hidden");
  }, [showAddBannerModel]);

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-base font-medium font-heading">
          Hero Section Banners
        </h2>
        <button
          onClick={() => setShowAddBannerModel(true)}
          className="border border-orange-500 font-heading text-sm px-4 py-2 rounded flex justify-center items-center gap-1"
        >
          <AiOutlinePlus className="text-lg text-orange-600" />
          Add New Banner
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {data.map((banner) => (
          <div key={banner._id} className="border p-4 shadow rounded space-y-2">
            <img
              src={`${conf.BaseURL}${conf.GetImageUrl}/${banner.image}`}
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
                {banner.endDate
                  ? new Date(banner.endDate).toLocaleDateString()
                  : "N/A"}
              </p>
              <p>
                <span>Order:</span> {banner.displayOrder}
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(banner._id)}
                className="bg-yellow-500 text-white px-3 py-1 rounded font-heading text-sm font-medium"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(banner._id)}
                className="bg-red-600 text-white px-3 py-1 rounded font-heading text-sm font-medium"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {showAddBannerModel && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 px-4">
          <div className="bg-white rounded-md shadow-md w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6">
            <AddBanner
              closeAddBannerModel={closeAddBannerModel}
              refreshBanners={fetchBanners}
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
