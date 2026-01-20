import React, { useState, useEffect } from "react";
import {
  deleteBannerData,
  getBannerData,
  getSingleBannerData,
} from "../../services/BannerServices";
import AddPoster from "./AddPoster";
import EditPoster from "./EditPoster";
import { AiOutlinePlus } from "react-icons/ai";
import { PosterDTO } from "../../types/poster";
import { getPosterData } from "../../services/PosterService";
import { deletePosterData } from "../../services/PosterService";
import conf from "../../config/Conf";
import { getImageUrl } from "../../utils/getImageUrl";

export const Poster: React.FC = () => {
  const [showAddPosterModal, setshowAddPosterModal] = useState<boolean>(false);
  const [showEditPosterModel, setshowEditPosterModel] =
    useState<boolean>(false);
  const [data, setData] = useState<PosterDTO[]>([]);
  const [editData, setEditData] = useState<PosterDTO | null>(null);

   const fetchPosters = async () => {
      try {
        const res: PosterDTO[] = await getPosterData();
        // const heroBanners = res.filter((item) => item.location === "herosection");
        setData(res);
      } catch (err) {
        console.error("Error fetching banners:", err);
      }
    };
  
    useEffect(() => {
      fetchPosters();
    }, []);
  

  const handleDelete = async (bannerId: string) => {
    try {
      const res = await deletePosterData(bannerId);
      if (res) {
        alert("Banner Deleted Successfully");
        // fetchPosters();
      }
    } catch (error) {
      console.error("Delete failed:", error);
      alert("Failed to delete banner. Please try again.");
    }
  };

  const handleEdit = async (bannerId: string) => {
    // try {
    //   const res: PosterDTO = await getSingleBannerData(bannerId);
    //   setEditData(res);
    //   setshowEditPosterModel(true);
    // } catch (error) {
    //   console.error("Error fetching banner for edit:", error);
    // }
  };

  const closeAddPosterModal = () => {
    setshowAddPosterModal(false);
  };

  const closeEditPosterModal = () => {
    setshowEditPosterModel(false);
    setEditData(null);
  };

  useEffect(() => {
    document.body.classList.toggle("overflow-hidden", showAddPosterModal);
    return () => document.body.classList.remove("overflow-hidden");
  }, [showAddPosterModal]);

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-base font-medium font-heading">Poster</h2>
        <button
          onClick={() => setshowAddPosterModal(true)}
          className="border border-orange-500 font-heading text-sm px-4 py-2 rounded flex justify-center items-center gap-1"
        >
          <AiOutlinePlus className="text-lg text-orange-600" />
          Add New Poster
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {data.map((poster) => (
          <div key={poster._id} className="border p-4 shadow rounded space-y-2">
            <img
              src={getImageUrl(poster?.image)}
              alt="Banner"
              className="w-full h-52 object-cover"
            />
            <div className="flex flex-col text-sm font-heading font-light">
              <p>
                <span>Location:</span> {poster.location}
              </p>
              <p>
                <span>Start:</span>{" "}
                {new Date(poster.startDate).toLocaleDateString()}
              </p>
              <p>
                <span>End:</span>{" "}
                {poster.endDate
                  ? new Date(poster.endDate).toLocaleDateString()
                  : "N/A"}
              </p>
              <p>
                <span>Order:</span> {poster.displayOrder}
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(poster._id)}
                className="bg-yellow-500 text-white px-3 py-1 rounded font-heading text-sm font-medium"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(poster._id)}
                className="bg-red-600 text-white px-3 py-1 rounded font-heading text-sm font-medium"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {showAddPosterModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 px-4">
          <div className="bg-white rounded-md shadow-md w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6">
            <AddPoster
              closeAddPosterModal={closeAddPosterModal}
              refreshPosters={fetchPosters}
            />
          </div>
        </div>
      )}

      {showEditPosterModel && editData && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 px-4">
          <div className="bg-white rounded-md shadow-md w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6">
            <EditPoster
              closeEditPosterModal={closeEditPosterModal}
              editData={editData}
              fetchPosters={fetchPosters}
            />
          </div>
        </div>
      )}
    </>
  );
};
