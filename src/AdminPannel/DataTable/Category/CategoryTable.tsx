import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { FaEdit, FaPlus } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../../ReduxToolkit/app/Store";
import { FaSearch } from "react-icons/fa";
import { MdRefresh } from "react-icons/md";
import AddCategory from "./AddCategory";
import EditCategory from "./EditCategory";
import { fetchAllCategory } from "../../../ReduxToolkit/Slices/CategorySlice";
import {
  deleteCategoryData,
  deleteMultipleCategoryData,
  getFilterCategoryData,
  getSingleCategoryData,
} from "../../../services/CategoryService";
import conf from "../../../config/Conf";
import { getImageUrl } from "../../../utils/getImageUrl";

const CategoryTable = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [showAddCategoryModal, setshowAddCategoryModal] = useState(false);
  const [showEditCategoryModal, setshowEditCategoryModal] = useState(false);
  const [editData, setEditData] = useState();
  const [query, setQuery] = useState("");
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);

  console.log("filteredCategories", filteredCategories);

  console.log("editData", editData);

  const { category, loading, error } = useSelector(
    (state: RootState) => state.allcategory
  );
  console.log("category", category);

  useEffect(() => {
    dispatch(fetchAllCategory());
  }, [dispatch]);

  const handleChange = ({ selectedRows }) => {
    console.log("Selected Rows: ", selectedRows);
    setSelectedRows(selectedRows.map((row) => row._id));
  };

  useEffect(() => {
    if (showAddCategoryModal || showEditCategoryModal) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [showAddCategoryModal, showEditCategoryModal]);

  const handleDelete = async (categoryID) => {
    console.log("categoryID", categoryID);
    try {
      const res = await deleteCategoryData(categoryID);
      if (res) {
        alert("Category Deleted Successfully");
        dispatch(fetchAllCategory());
      }
    } catch (error) {
      console.error("Delete failed:", error);
      alert("Failed to delete product. Please try again.");
    }
  };

  const handleMultipleDelete = async () => {
    if (selectedRows.length === 0) {
      alert("Please select at least one product to delete.");
      return;
    }

    try {
      const res = await deleteMultipleCategoryData(selectedRows);
      if (res) {
        alert("Selected Category Deleted Successfully");
        dispatch(fetchAllCategory());
        setSelectedRows([]);
      }
    } catch (error) {
      console.error("Multiple delete failed:", error);
      alert("Failed to delete selected products. Please try again.");
    }
  };

  const handleEdit = async (categoryID) => {
    try {
      const res = await getSingleCategoryData(categoryID);
      if (res) {
        setEditData(res);
        setshowEditCategoryModal(true);
      }
    } catch (error) {
      console.error("Error fetching product for edit:", error);
    }
  };

  const columns = [
    {
      name: "S.No.",
      cell: (row, index) => index + 1,
      grow: 0,
      width: "70px",
    },
    {
      name: "Image",
      selector: (row) => (
        <img
          src={getImageUrl(row.image)}
          width={40}
          height={40}
          alt=""
        />
      ),
      width: "110px",
    },
    {
      name: "Name",
      selector: (row) => row.name,
      width: "140px",
    },
    {
      name: "Description",
      selector: (row) => row.description,
      width: "220px",
    },
    {
      name: "Active",
      cell: (row) => (
        <span
          className={`px-2 py-1 rounded-xl text-xs font-medium ${
            row.isActive
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {row.isActive ? "Active" : "Inactive"}
        </span>
      ),
      width: "140px",
    },

    {
      name: "ACTIONS",
      cell: (row) => (
        <div className="flex gap-1">
          <button
            onClick={() => handleEdit(row._id)}
            className="btn bg-blue-600 text-white p-1 rounded"
            title="Edit"
          >
            <FaEdit />
          </button>
          <button
            onClick={() => handleDelete(row._id)}
            className="btn bg-orange-600 text-white p-1 rounded"
            title="Delete"
          >
            <MdDelete />
          </button>
        </div>
      ),
      width: "160px",
    },
  ];

  const closeAddCategoryModal = () => {
    setshowAddCategoryModal(false);
  };

  const closeEditCategoryModal = () => {
    setshowEditCategoryModal(false);
  };

  const handleSearch = async (query) => {
    setQuery(query);
    if (query.trim() === "") {
      dispatch(fetchAllCategory());
      setFilteredCategories([]);
      return;
    }

    try {
      const res = await getFilterCategoryData({ q: query });
      setFilteredCategories(res);
    } catch (err) {
      console.error("Error searching categories", err);
    }
  };

  return (
    <>
      <div className="bg-gray-100 p-2 border font-heading ">
        <div className="grid bg-white p-4 space-y-6">
          <div className="flex justify-between">
            <h2 className="text-xl font-medium ">CATEGORIES</h2>
            <div className="flex gap-3 items-center">
              <div className="relative">
                <FaSearch
                  className="absolute top-1/2 left-2 -translate-y-1/2 
                       text-sm text-gray-500"
                />
                <input
                  className="border-none rounded-sm font-heading text-sm bg-skin-secondary w-96 pl-8 px-2
                  h-10 text-[13px]"
                  type="text"
                  value={query || ""}
                  onChange={(e) => handleSearch(e.target.value)}
                  placeholder="Search categories and more"
                />
              </div>
              <div>
                <button
                  onClick={() => setshowAddCategoryModal(true)}
                  className="bg-black text-white rounded-xl p-2 shadow-lg text-sm
                flex items-center"
                >
                  <FaPlus />
                  Add Category
                </button>
              </div>
              <div>
                <button
                  onClick={handleMultipleDelete}
                  disabled={selectedRows.length === 0}
                  className={`${
                    selectedRows.length === 0
                      ? "bg-gray-300 cursor-not-allowed"
                      : "bg-red-600 hover:bg-red-700"
                  } text-white rounded-xl p-2 shadow-lg text-sm flex items-center gap-1`}
                >
                  <MdDelete />
                  Delete Selected
                </button>
              </div>
              <div className="border border-black/10 p-2 rounded">
                <MdRefresh
                  onClick={() => {
                    dispatch(fetchAllCategory());
                    setFilteredCategories([]);
                    setQuery("");
                  }}
                  className="text-lg text-gray-600 cursor-pointer"
                />
              </div>
            </div>
          </div>
          <DataTable
            columns={columns}
            data={
              filteredCategories.length > 0 || query
                ? filteredCategories
                : category
            }
            fixedHeader
            fixedHeaderScrollHeight="60vh"
            pagination
            highlightOnHover
            selectableRows
            onSelectedRowsChange={handleChange}
            dense
          />
        </div>
      </div>

      {/* Modal */}
      {showAddCategoryModal && (
        <div
          className="fixed inset-0 flex items-center justify-center
   bg-black bg-opacity-50 z-50 px-4"
        >
          <div className="bg-white rounded-md shadow-md w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6">
            <AddCategory closeAddCategoryModal={closeAddCategoryModal} />
          </div>
        </div>
      )}

      {showEditCategoryModal && editData && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 px-4">
          <div className="bg-white rounded-md shadow-md w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6">
            <EditCategory
              closeEditCategoryModal={closeEditCategoryModal}
              editData={editData}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default CategoryTable;
