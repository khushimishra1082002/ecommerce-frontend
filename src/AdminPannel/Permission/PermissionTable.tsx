import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { FaEdit, FaPlus } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { FaSearch } from "react-icons/fa";
import { MdRefresh } from "react-icons/md";
import CreatePermission from "./CreatePermission";
import EditPermission from "./EditPermission";
import {
  deleteMultipleRolesData,
  deleteRoleData,
  getFilterRoleData,
  getRolesData,
  getSingleRoleData,
} from "../../services/roleService";
import { deleteMultiplePermissionData, deletePermissionData, getFilterPermissionData, getPermissionData, getSinglePermissionData } from "../../services/permissionServices";

const PermissionTable = () => {
  const [showCreatePermissionMosel, setshowCreatePermissionMosel] =
    useState(false);
  const [showEditPermissionModel, setshowEditPermissionModel] = useState(false);
  const [editData, setEditData] = useState();
  const [query, setQuery] = useState("");
  const [filteredPermission, setfilteredPermission] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [PermissionData, setPermissionData] = useState([]);

  console.log("filteredPermission", filteredPermission);

  console.log("editData", editData);

  const handleChange = ({ selectedRows }) => {
    console.log("Selected Rows: ", selectedRows);
    setSelectedRows(selectedRows.map((row) => row._id));
  };

  useEffect(() => {
    if (showCreatePermissionMosel || showEditPermissionModel) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [showCreatePermissionMosel, showEditPermissionModel]);

  const handleDelete = async (id) => {
    console.log("id", id);
    try {
      const res = await deletePermissionData(id);
      if (res) {
        alert("Permission Deleted Successfully");
        fetchPermission()
      }
    } catch (error) {
      console.error("Delete failed:", error);
      alert("Failed to delete permission. Please try again.");
    }
  };

  const handleMultipleDelete = async () => {
      if (selectedRows.length === 0) {
        alert("Please select at least one role to delete.");
        return;
      }
      try {
        const res = await deleteMultiplePermissionData(selectedRows);
        if (res?.message) {
          alert(res.message);
          fetchPermission();
          setSelectedRows([]);
        }
      } catch (error) {
        console.error("Multiple delete failed:", error);
        alert("Failed to delete selected roles. Please try again.");
      }
  };

  const handleEdit = async (id) => {
    try {
      const res = await getSinglePermissionData(id);
      if (res) {
        setEditData(res);
        setshowEditPermissionModel(true);
      }
    } catch (error) {
      console.error("Error fetching permission for edit:", error);
    }
  };

  const fetchPermission = async () => {
    try {
      const res = await getPermissionData();
      setPermissionData(res);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchPermission();
  }, []);

  const columns = [
    {
      name: "S.No.",
      cell: (row, index) => index + 1,
      grow: 0,
      width: "70px",
    },
    {
      name: " Permission Name",
      selector: (row) => row.name,
      width: "250px",
    },

    {
      name: "Module",
      selector: (row) => row.module,
      width: "160px",
    },

    {
      name: "Description",
      selector: (row) => row.description,
      width: "250px",
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

  const closeCreatePermissionModal = () => {
    setshowCreatePermissionMosel(false);
  };

  const closeEditPermissionModal = () => {
    setshowEditPermissionModel(false);
  };

  const handleSearch = async (query) => {
    setQuery(query);
    if (query.trim() === "") {
       fetchPermission()
      setfilteredPermission([]);
      return;
    }
    try {
      const res = await getFilterPermissionData({ q: query });
      setfilteredPermission(res);
    } catch (err) {
      console.error("Error searching Role", err);
    }
  };

  return (
    <>
      <div className="bg-gray-100 p-2 border font-heading ">
        <div className="grid bg-white p-4 space-y-6">
          <div className="flex justify-between">
            <h2 className="text-xl font-medium ">Permission</h2>
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
                  placeholder="Search Permission and more"
                />
              </div>
              <div>
                <button
                  onClick={() => setshowCreatePermissionMosel(true)}
                  className="bg-black text-white rounded-xl p-2 shadow-lg text-sm
                flex items-center"
                >
                  <FaPlus />
                  Add Permission
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
                    setfilteredPermission([]);
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
              filteredPermission.length > 0 || query
                ? filteredPermission
                : PermissionData
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
      {showCreatePermissionMosel && (
        <div
          className="fixed inset-0 flex items-center justify-center
        bg-black bg-opacity-50 z-50 px-4"
        >
          <div className="bg-white rounded-md shadow-md w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6">
            <CreatePermission
              fetchPermission={fetchPermission}
              closeCreatePermissionModal={closeCreatePermissionModal}
            />
          </div>
        </div>
      )}

      {showEditPermissionModel && editData && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 px-4">
          <div className="bg-white rounded-md shadow-md w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6">
            <EditPermission
              closeEditPermissionModal={closeEditPermissionModal}
              editData={editData}
              fetchPermission={fetchPermission}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default PermissionTable;
