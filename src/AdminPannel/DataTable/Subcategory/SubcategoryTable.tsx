import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { FaEdit, FaPlus } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../../ReduxToolkit/app/Store";
import { fetchAllProducts } from "../../../ReduxToolkit/Slices/ProductSlice";
import { FaEye } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { MdRefresh } from "react-icons/md";
import {
  deleteProductData,
  getFilterProductsData,
  getSingleProductData,
} from "../../../services/ProductService";
import { deleteMultipleProductData } from "../../../services/ProductService";
import { fetchAllCategory } from "../../../ReduxToolkit/Slices/CategorySlice";
import { deleteCategoryData, deleteMultipleCategoryData, getFilterCategoryData, getSingleCategoryData } from "../../../services/CategoryService";
import { fetchSubcategories } from "../../../ReduxToolkit/Slices/SubcategorySlice";
import AddSubcategory from "./AddSubcategory";
import ViewSubcategory from "./ViewSubcategory";
import EditSubcategory from "./EditSubcategory";
import { deleteMultipleSubCategoryData, deleteSubcategoryData, getFilterSubCategoryData } from "../../../services/SubcategoryService";
import { getSingleSubcategoryData } from "../../../services/SubcategoryService";

const SubcategoryTable = () => {

  const dispatch = useDispatch<AppDispatch>();
  const [showAddSubcategoryModal, setshowAddSubcategoryModal] = useState(false);
  const [showEditSubcategoryModal, setshowEditSubcategoryModal] = useState(false);
  const [showCategoryDetailModal, setshowCategoryDetailModal] = useState(false);
  const [singleSubcategory, setSingleSubcategory] = useState();
  const [editData, setEditData] = useState();
  const [query, setQuery] = useState("");
  const [filteredSubcategories, setFilteredSubcategories] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);

  console.log("filteredSubcategories", filteredSubcategories);

  console.log("editData", editData);

const {
    subcategories,
    loading: subcategoryLoading,
    error: subcategoryError,
  } = useSelector((state: RootState) => state.subcategory);

 useEffect(() => {
      dispatch(fetchSubcategories());
    }, [dispatch]);
 

  const handleChange = ({ selectedRows }) => {
    console.log("Selected Rows: ", selectedRows);
    setSelectedRows(selectedRows.map((row) => row._id));
  };

  useEffect(() => {
    if (showAddSubcategoryModal || showEditSubcategoryModal || showCategoryDetailModal) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [showAddSubcategoryModal, showEditSubcategoryModal, showCategoryDetailModal]);

  const handleDelete = async (subcategoryID) => {
    console.log("subcategoryID", subcategoryID);
    try {
      const res = await deleteSubcategoryData(subcategoryID);
      if (res) {
        alert("Subcategory Deleted Successfully");
        dispatch(fetchSubcategories());
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
      const res = await deleteMultipleSubCategoryData(selectedRows);
      if (res) {
        alert("Selected Subactegory Deleted Successfully");
        dispatch(fetchSubcategories());
        setSelectedRows([]); 
      }
    } catch (error) {
      console.error("Multiple delete failed:", error);
      alert("Failed to delete selected products. Please try again.");
    }
  };

  const handleEdit = async (subcategoryID) => {
    try {
      const res = await getSingleSubcategoryData(subcategoryID);
      if (res) {
        setEditData(res); // ✅ set product data first
        setshowEditSubcategoryModal(true); // ✅ then open modal
      }
    } catch (error) {
      console.error("Error fetching product for edit:", error);
    }
  };

  const handleView = async (categoryID) => {
    // try {
    //   const res = await getSingleCategoryData(categoryID);
    //   if (res) {
    //     setSingleSubcategory(res); // ✅ set product data first
    //     setshowCategoryDetailModal(true); // ✅ then open modal
    //   }
    // } catch (error) {
    //   console.error("Error fetching product for edit:", error);
    // }
  };

  const columns = [
    {
      name: "S.No.",
      cell: (row, index) => index + 1,
      grow: 0,
      width: "70px", // ✅ narrow
    },
     {
      name: "category",
      selector: (row) => row.category?.name,
      width: "140px",
    },
    {
      name: "Name",
      selector: (row) => row.name,
      width: "140px",
    },
    
  
    {
  name: "Active",
  cell: (row) => (
    <span
      className={`px-2 py-1 rounded-xl text-xs font-medium ${
        row.isActive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
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
           <button
            onClick={() => handleView(row._id)}
            className="btn bg-green-500 text-white p-1 rounded"
            title="View"
          >
            <FaEye />
          </button>
        </div>
      ),
      width: "160px", // increase slightly to fit all three icons
    },
  ];

  const closeAddSubcategoryModal = () => {
    setshowAddSubcategoryModal(false);
  };

  const closeEditSubcategoryModal = () => {
    setshowEditSubcategoryModal(false);
  };

  const closeCategoryDetailModal = () => {
    setshowCategoryDetailModal(false);
  };

  const handleSearch = async (query) => {
  setQuery(query);

  if (query.trim() === "") {
    dispatch(fetchSubcategories()); // ✅ Original list wapas laane ke liye
    setFilteredSubcategories([]);   // ✅ Filtered list ko clear karna
    return;
  }

  try {
    const res = await getFilterSubCategoryData({ q: query });
    setFilteredSubcategories(res);
  } catch (err) {
    console.error("Error searching categories", err);
  }
};



  return (
    <>
      <div className="bg-gray-100 p-2 border font-heading ">
        <div className="grid bg-white p-4 space-y-6">
          <div className="flex justify-between">
            <h2 className="text-xl font-medium ">SUBCATEGORIES</h2>
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
                  placeholder="Search Subcategories and more"
                />
              </div>
              <div>
                <button
                  onClick={() => setshowAddSubcategoryModal(true)}
                  className="bg-black text-white rounded-xl p-2 shadow-lg text-sm
                flex items-center"
                >
                  <FaPlus />
                  Add Subcategory
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
                    setFilteredSubcategories([]);
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
              filteredSubcategories.length > 0 || query ? filteredSubcategories : subcategories
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
      {showAddSubcategoryModal && (
        <div
          className="fixed inset-0 flex items-center justify-center
   bg-black bg-opacity-50 z-50 px-4"
        >
          <div className="bg-white rounded-md shadow-md w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6">
            < AddSubcategory closeAddSubcategoryModal={closeAddSubcategoryModal} />
          </div>
        </div>
      )}

      {showEditSubcategoryModal && editData && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 px-4">
          <div className="bg-white rounded-md shadow-md w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6">
            <EditSubcategory
              closeEditSubcategoryModal={closeEditSubcategoryModal}
              editData={editData}
            />
          </div>
        </div>
      )}

      {showCategoryDetailModal && singleSubcategory && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 px-4">
          <div className="bg-white rounded-md shadow-md w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6">
            <ViewSubcategory
              closeCategoryDetailModal={closeCategoryDetailModal}
              singleSubcategory={singleSubcategory}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default SubcategoryTable;


