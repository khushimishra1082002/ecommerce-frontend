import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { FaEdit, FaPlus } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../../ReduxToolkit/app/Store";
import { FaSearch } from "react-icons/fa";
import { MdRefresh } from "react-icons/md";
import AddBrand from "./AddBrand";
import EditBrand from "./EditBrand";
import { fetchBrands } from "../../../ReduxToolkit/Slices/BrandSlice";
import { deleteBrandData } from "../../../services/BrandService";
import { getFilterBrandData } from "../../../services/BrandService";
import { getSingleBrandData } from "../../../services/BrandService";
import { deleteMultipleBrandData } from "../../../services/BrandService";

const BrandTable = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [showAddBrandModal, setshowAddBrandModal] = useState(false);
  const [showEditBrandModal, setshowEditBrandModal] = useState(false);
  const [editData, setEditData] = useState();
  const [query, setQuery] = useState("");
  const [filteredBrand, setFilteredBrand] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);

  console.log("filteredBrand", filteredBrand);

  console.log("editData", editData);

  const {
    brands,
    loading: brandLoading,
    error: brandError,
  } = useSelector((state: RootState) => state.brand);

  console.log("brands", brands);

  useEffect(() => {
    dispatch(fetchBrands());
  }, [dispatch]);

  const handleChange = ({ selectedRows }) => {
    console.log("Selected Rows: ", selectedRows);
    setSelectedRows(selectedRows.map((row) => row._id));
  };

  useEffect(() => {
    if (showAddBrandModal || showEditBrandModal) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [showAddBrandModal, showEditBrandModal]);

  const handleDelete = async (BrandId) => {
    console.log("BrandId", BrandId);
    try {
      const res = await deleteBrandData(BrandId);
      if (res) {
        alert("Brand Deleted Successfully");
        dispatch(fetchBrands());
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
      const res = await deleteMultipleBrandData(selectedRows);
      if (res) {
        alert("Selected Brands Deleted Successfully");
        dispatch(fetchBrands());
        setSelectedRows([]);
      }
    } catch (error) {
      console.error("Multiple delete failed:", error);
      alert("Failed to delete selected products. Please try again.");
    }
  };

  const handleEdit = async (brandID) => {
    try {
      const res = await getSingleBrandData(brandID);
      if (res) {
        setEditData(res);
        setshowEditBrandModal(true);
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
      name: " Brand Name",
      selector: (row) => row.name,
      width: "170px",
    },
    {
      name: "Categories",
      selector: (row) => row.category?.name,
      width: "120px",
    },
    {
      name: "Subategories",
      selector: (row) => row.subcategory?.name,
      width: "130px",
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

  const closeAddBrandModal = () => {
    setshowAddBrandModal(false);
  };

  const closeEditBrandModal = () => {
    setshowEditBrandModal(false);
  };

  const handleSearch = async (query) => {
    setQuery(query);

    if (query.trim() === "") {
      dispatch(fetchBrands());
      setFilteredBrand([]);
      return;
    }

    try {
      const res = await getFilterBrandData({ q: query });
      setFilteredBrand(res);
    } catch (err) {
      console.error("Error searching brands", err);
    }
  };

  return (
    <>
      <div className="bg-gray-100 p-2 border font-heading ">
        <div className="grid bg-white p-4 space-y-6">
          <div className="flex justify-between">
            <h2 className="text-xl font-medium ">BRANDS</h2>
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
                  placeholder="Search brands and more"
                />
              </div>
              <div>
                <button
                  onClick={() => setshowAddBrandModal(true)}
                  className="bg-black text-white rounded-xl p-2 shadow-lg text-sm
                flex items-center"
                >
                  <FaPlus />
                  Add Brands
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
                    dispatch(fetchBrands());
                    setFilteredBrand([]);
                    setQuery("");
                  }}
                  className="text-lg text-gray-600 cursor-pointer"
                />
              </div>
            </div>
          </div>
          <DataTable
            columns={columns}
            data={filteredBrand.length > 0 || query ? filteredBrand : brands}
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
      {showAddBrandModal && (
        <div
          className="fixed inset-0 flex items-center justify-center
        bg-black bg-opacity-50 z-50 px-4"
        >
          <div className="bg-white rounded-md shadow-md w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6">
            <AddBrand closeAddBrandModal={closeAddBrandModal} />
          </div>
        </div>
      )}

      {showEditBrandModal && editData && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 px-4">
          <div className="bg-white rounded-md shadow-md w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6">
            <EditBrand
              closeEditBrandModal={closeEditBrandModal}
              editData={editData}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default BrandTable;
