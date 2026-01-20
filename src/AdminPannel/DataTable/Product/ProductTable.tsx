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
import AddProduct from "./AddProduct";
import {
  deleteProductData,
  getFilterProductsData,
  getSingleProductData,
} from "../../../services/ProductService";
import EditProduct from "./EditProduct";
import ViewProduct from "./ViewProduct";
import { deleteMultipleProductData } from "../../../services/ProductService";
import conf from "../../../config/Conf";
import { getImageUrl } from "../../../utils/getImageUrl";

const ProductTable = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [showEditProductModal, setShowEditProductModal] = useState(false);
  const [showProductDetailModal, setShowProductDetailModal] = useState(false);
  const [singleProduct, setSingleProduct] = useState();
  const [editData, setEditData] = useState();
  const [query, setQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);

  console.log("filteredProducts", filteredProducts);

  console.log("editData", editData);

  const { products, loading, error } = useSelector(
    (state: RootState) => state.allproducts
  );
  console.log("products", products);

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  const handleChange = ({ selectedRows }) => {
    console.log("Selected Rows: ", selectedRows);
    setSelectedRows(selectedRows.map((row) => row._id));
  };

  useEffect(() => {
    if (showAddProductModal || showEditProductModal || showProductDetailModal) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [showAddProductModal, showEditProductModal, showProductDetailModal]);

  const handleDelete = async (productID) => {
    console.log("productID", productID);
    try {
      const res = await deleteProductData(productID);
      if (res) {
        alert("Product Deleted Successfully");
        dispatch(fetchAllProducts());
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
      const res = await deleteMultipleProductData(selectedRows);
      if (res) {
        alert("Selected Products Deleted Successfully");
        dispatch(fetchAllProducts());
        setSelectedRows([]);
      }
    } catch (error) {
      console.error("Multiple delete failed:", error);
      alert("Failed to delete selected products. Please try again.");
    }
  };

  const handleEdit = async (productID) => {
    try {
      const res = await getSingleProductData(productID);
      if (res) {
        setEditData(res);
        setShowEditProductModal(true);
      }
    } catch (error) {
      console.error("Error fetching product for edit:", error);
    }
  };

  const handleView = async (productID) => {
    try {
      const res = await getSingleProductData(productID);
      if (res) {
        setSingleProduct(res);
        setShowProductDetailModal(true);
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
      width: "160px",
    },
  ];

  const closeAddProductModal = () => {
    setShowAddProductModal(false);
  };

  const closeEditProductModal = () => {
    setShowEditProductModal(false);
  };

  const closeProductDetailModal = () => {
    setShowProductDetailModal(false);
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
            <h2 className="text-xl font-medium ">PRODUCTS</h2>
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
                  onClick={() => setShowAddProductModal(true)}
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
                    dispatch(fetchAllProducts());
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
              filteredProducts.length > 0 || query ? filteredProducts : products
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
      {showAddProductModal && (
        <div
          className="fixed inset-0 flex items-center justify-center
   bg-black bg-opacity-50 z-50 px-4"
        >
          <div className="bg-white rounded-md shadow-md w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6">
            <AddProduct closeAddProductModal={closeAddProductModal} />
          </div>
        </div>
      )}

      {showEditProductModal && editData && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 px-4">
          <div className="bg-white rounded-md shadow-md w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6">
            <EditProduct
              closeEditProductModal={closeEditProductModal}
              editData={editData}
            />
          </div>
        </div>
      )}

      {showProductDetailModal && singleProduct && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 px-4">
          <div className="bg-white rounded-md shadow-md w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6">
            <ViewProduct
              closeProductDetailModal={closeProductDetailModal}
              singleProduct={singleProduct}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ProductTable;
