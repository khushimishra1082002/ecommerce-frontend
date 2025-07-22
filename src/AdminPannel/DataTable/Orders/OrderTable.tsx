import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { MdDelete } from "react-icons/md";
import { FaSearch } from "react-icons/fa";
import { MdRefresh } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../../ReduxToolkit/app/Store";
import { fetchAllOrders } from "../../../ReduxToolkit/Slices/OrderSlice";
import { deleteOrderData, editOrderStatusData } from "../../../services/OrderService";
import { getFilterOrderData } from "../../../services/OrderService";

const OrderTable = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { orders, loading, error } = useSelector(
    (state: RootState) => state.order
  );
  const [query, setQuery] = useState("");
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);

  useEffect(() => {
    dispatch(fetchAllOrders());
  }, [dispatch]);

  const handleChange = ({ selectedRows }) => {
    setSelectedRows(selectedRows.map((row) => row._id));
  };

  const handleDelete = async (orderId: string) => {
    try {
      const res = await deleteOrderData(orderId);
      if (res) {
        alert("Order Deleted Successfully");
        dispatch(fetchAllOrders());
      }
    } catch (error) {
      console.error("Delete failed:", error);
      alert("Failed to delete order. Please try again.");
    }
  };

  const handleSearch = async (query: string) => {
    setQuery(query);
    if (query.trim() === "") {
      dispatch(fetchAllOrders());
      setFilteredOrders([]);
      return;
    }

    try {
     const res = await getFilterOrderData(query); 
      console.log(res);

      setFilteredOrders(res);
    } catch (err) {
      console.error("Error searching orders", err);
    }
  };
  const updateStatus = async (orderId, status) => {
    
  try {
    const res =  await editOrderStatusData(orderId,status)

    if (res.ok) {
      alert("Status updated");
      dispatch(fetchAllOrders());
    }
  } catch (err) {
    console.error("Failed to update status", err);
  }
};
  const columns = [
    {
      name: "S.No.",
      cell: (_row: any, index: number) => index + 1,
      grow: 0,
      width: "70px",
    },
    {
      name: "Order ID",
      selector: (row: any) => row._id,
      width: "200px",
    },
    {
      name: "Name",
      selector: (row: any) => row.userId?.fullname || "N/A",
      sortable: true,
      width: "120px",
    },
    {
      name: "User Email",
      selector: (row: any) => row.userId?.email || "N/A",
      sortable: true,
      width: "220px",
    },
    {
      name: "Items",
      selector: (row: any) => row.items?.length || 0,
      width: "80px",
    },
    {
      name: "Total",
      selector: (row: any) => `₹${row.summary.finalTotal}`,
      width: "120px",
    },
    {
      name: "Payment",
      selector: (row: any) => row.paymentMethod,
      width: "100px",
    },
    {
      name: "Status",
      cell: (row: any) => (
      <select
  value={row.status}
  onChange={(e) => updateStatus(row._id, e.target.value)}
  className="text-xs border rounded"
>
  <option value="Pending">Pending</option>
  <option value="Confirmed">Confirmed</option>
  <option value="Shipped">Shipped</option>
  <option value="Delivered">Delivered</option>
  <option value="Cancelled">Cancelled</option>
</select>

      ),
      width: "140px",
    },
    {
      name: "Date",
      selector: (row: any) => new Date(row.createdAt).toLocaleDateString(),
      width: "120px",
    },
    {
      name: "Actions",
      cell: (row: any) => (
        <button
          onClick={() => handleDelete(row._id)}
          className="btn bg-orange-600 text-white p-1 rounded"
          title="Delete"
        >
          <MdDelete />
        </button>
      ),
      width: "100px",
    },
  ];

  const ExpandedComponent = ({ data }) => (
    <div className="p-4 bg-gray-50 border border-black/15 rounded-md">
      <h4 className="font-semibold mb-2">Items in Order:</h4>
      <ul className="list-disc ml-5 space-y-1">
        {data.items.map((item) => (
          <li key={item._id} className="text-sm font-heading">
            <span className="font-heading text-sm  ">
              {item.productId?.name?.slice(0, 80)}...
            </span>
            {" - "}₹{item.productId?.price} × {item.quantity}
          </li>
        ))}
      </ul>
    </div>
  );

  


  return (
    <div className="bg-gray-100 p-2 border font-heading">
      <div className="grid bg-white p-4 space-y-6">
        <div className="flex justify-between">
          <h2 className="text-xl font-medium">ORDERS</h2>
          <div className="flex gap-3 items-center">
            <div className="relative">
              <FaSearch className="absolute top-1/2 left-2 -translate-y-1/2 text-sm text-gray-500" />
              <input
                className="border-none rounded-sm font-heading text-sm bg-skin-secondary w-96 pl-8 px-2 h-10 text-[13px]"
                type="text"
                value={query}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Search orders by ID, user, etc."
              />
            </div>
            <div className="border border-black/10 p-2 rounded">
              <MdRefresh
                onClick={() => {
                  dispatch(fetchAllOrders());
                  setFilteredOrders([]);
                  setQuery("");
                }}
                className="text-lg text-gray-600 cursor-pointer"
              />
            </div>
          </div>
        </div>
        <DataTable
          columns={columns}
          data={filteredOrders.length > 0 || query ? filteredOrders : orders}
          fixedHeader
          fixedHeaderScrollHeight="60vh"
          pagination
          highlightOnHover
          selectableRows
          onSelectedRowsChange={handleChange}
          dense
          expandableRows
          expandableRowsComponent={ExpandedComponent}
        />
      </div>
    </div>
  );
};

export default OrderTable;
