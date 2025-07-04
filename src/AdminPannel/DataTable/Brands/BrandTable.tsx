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
import AddBrand from "./AddBrand";
import {
  deleteProductData,
  getFilterProductsData,
  getSingleProductData,
} from "../../../services/ProductService";
import EditBrand from "./EditBrand";
import ViewBrand from "./ViewBrand";
import { deleteMultipleProductData } from "../../../services/ProductService";
import { fetchBrands } from "../../../ReduxToolkit/Slices/BrandSlice";

const BrandTable = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [showAddBrandModal, setshowAddBrandModal] = useState(false);
  const [showEditBrandModal, setshowEditBrandModal] = useState(false);
  const [showBrandDetailModal, setshowBrandDetailModal] = useState(false);
  const [singleBrand, setSingleBrand] = useState();
  const [editData, setEditData] = useState();
  const [query, setQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);

  console.log("filteredProducts", filteredProducts);

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
    if (showAddBrandModal || showEditBrandModal || showBrandDetailModal) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [showAddBrandModal, showEditBrandModal, showBrandDetailModal]);

  const handleDelete = async (productID) => {
    // console.log("productID", productID);
    // try {
    //   const res = await deleteProductData(productID);
    //   if (res) {
    //     alert("Product Deleted Successfully");
    //     dispatch(fetchAllProducts());
    //   }
    // } catch (error) {
    //   console.error("Delete failed:", error);
    //   alert("Failed to delete product. Please try again.");
    // }
  };

  const handleMultipleDelete = async () => {
    // if (selectedRows.length === 0) {
    //   alert("Please select at least one product to delete.");
    //   return;
    // }
    // try {
    //   const res = await deleteMultipleProductData(selectedRows);
    //   if (res) {
    //     alert("Selected Products Deleted Successfully");
    //     dispatch(fetchAllProducts());
    //     setSelectedRows([]); // clear selection
    //   }
    // } catch (error) {
    //   console.error("Multiple delete failed:", error);
    //   alert("Failed to delete selected products. Please try again.");
    // }
  };

  const handleEdit = async (productID) => {
    // try {
    //   const res = await getSingleProductData(productID);
    //   if (res) {
    //     setEditData(res); // ✅ set product data first
    //     setshowEditBrandModal(true); // ✅ then open modal
    //   }
    // } catch (error) {
    //   console.error("Error fetching product for edit:", error);
    // }
  };

  const handleView = async (productID) => {
    // try {
    //   const res = await getSingleProductData(productID);
    //   if (res) {
    //     setSingleBrand(res); // ✅ set product data first
    //     setshowBrandDetailModal(true); // ✅ then open modal
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
      name: "Image",
      selector: (row) => (
        <img
          src={`http://localhost:5000/api/upload/${row.image}`}
          width={40}
          height={40}
          alt=""
        />
      ),
      width: "80px",
    },
    {
      name: "Name",
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
      name: "Brands",
      selector: (row) => row.brand?.name,
      width: "130px",
    },
    {
      name: "Price",
      selector: (row) => row.price,
      width: "80px",
    },

    {
      name: "ACTIONS",
      cell: (row) => (
        <div className="flex gap-1">
          <button
            onClick={() => handleView(row._id)}
            className="btn bg-green-500 text-white p-1 rounded"
            title="View"
          >
            <FaEye />
          </button>
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
      width: "160px", // increase slightly to fit all three icons
    },
  ];

  const closeAddBrandModal = () => {
    setshowAddBrandModal(false);
  };

  const closeEditBrandModal = () => {
    setshowEditBrandModal(false);
  };

  const closeBrandDetailModal = () => {
    setshowBrandDetailModal(false);
  };

  const handleSearch = async (query) => {
    setQuery(query);
    if (query.trim() === "") {
      dispatch(fetchAllProducts());
      return;
    }

    try {
      const res = await getFilterProductsData({ q: query });
      setFilteredProducts(res);
    } catch (err) {
      console.error("Error searching products", err);
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
                  placeholder="Search product categories and more"
                />
              </div>
              <div>
                <button
                  onClick={() => setshowAddBrandModal(true)}
                  className="bg-black text-white rounded-xl p-2 shadow-lg text-sm
                flex items-center"
                >
                  <FaPlus />
                  Add Products
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
                    setFilteredProducts([]);
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
              filteredProducts.length > 0 || query ? filteredProducts : brands
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

      {showBrandDetailModal && singleBrand && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 px-4">
          <div className="bg-white rounded-md shadow-md w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6">
            <ViewBrand
              closeBrandDetailModal={closeBrandDetailModal}
              singleBrand={singleBrand}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default BrandTable;
