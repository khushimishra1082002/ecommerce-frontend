import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { FaEdit, FaPlus } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { FaSearch } from "react-icons/fa";
import { MdRefresh } from "react-icons/md";
import EditBrand from "./EditRole";
import CreateRole from "./CreateRole";
import EditRole from "./EditRole";
import { deleteMultipleRolesData, deleteRoleData, getFilterRoleData, getRolesData, getSingleRoleData } from "../../services/roleService";

const RoleTable = () => {
  const [showCreateRoleModel, setshowCreateRoleModel] = useState(false);
  const [showEditRoleModel, setshowEditRoleModel] = useState(false);
  const [editData, setEditData] = useState();
  const [query, setQuery] = useState("");
  const [filteredRole, setfilteredRole] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [RolesData, setRolesData] = useState([]);

  console.log("filteredRole", filteredRole);

  console.log("editData", editData);

  const handleChange = ({ selectedRows }) => {
    console.log("Selected Rows: ", selectedRows);
    setSelectedRows(selectedRows.map((row) => row._id));
  };

  useEffect(() => {
    if (showCreateRoleModel || showEditRoleModel) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [showCreateRoleModel, showEditRoleModel]);

  const handleDelete = async (id) => {
    console.log("id", id);
    try {
      const res = await deleteRoleData(id);
      if (res) {
        alert("Role Deleted Successfully");
        fetchRoles()
      }
    } catch (error) {
      console.error("Delete failed:", error);
      alert("Failed to delete role. Please try again.");
    }
  };

const handleMultipleDelete = async () => {
  if (selectedRows.length === 0) {
    alert("Please select at least one role to delete.");
    return;
  }
  try {
    const res = await deleteMultipleRolesData(selectedRows);
    if (res?.message) {
      alert(res.message);
      fetchRoles(); 
      setSelectedRows([]);
    }
  } catch (error) {
    console.error("Multiple delete failed:", error);
    alert("Failed to delete selected roles. Please try again.");
  }
};

  const handleEdit = async (id) => {
    try {
      const res = await getSingleRoleData(id);
      if (res) {
        setEditData(res);
        setshowEditRoleModel(true);
      }
    } catch (error) {
      console.error("Error fetching product for edit:", error);
    }
  };

const fetchRoles = async () => {
    try {
      const res = await getRolesData();
      setRolesData(res);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  const columns = [
    {
      name: "S.No.",
      cell: (row, index) => index + 1,
      grow: 0,
      width: "70px",
    },
   {
  name: "Role Name",
  selector: (row) =>
    row.name
      .split(" ")
      .map(
        (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
      )
      .join(" "),
  width: "170px",
},


    {
      name: "Permission",
      selector: (row) => row.permissions.map((p) => p.name).join(", "),
      width: "220px",
    },

    {
      name: "Description",
      selector: (row) => row.description,
      width: "300px",
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

  const closeCreateRoleModel = () => {
    setshowCreateRoleModel(false);
  };

  const closeEditRoleModel = () => {
    setshowEditRoleModel(false);
  };

  const handleSearch = async (query) => {
    setQuery(query);

    if (query.trim() === "") {
       fetchRoles()
      setfilteredRole([]);
      return;
    }

    try {
      const res = await getFilterRoleData({ q: query });
      setfilteredRole(res);
    } catch (err) {
      console.error("Error searching Role", err);
    }
  };

  return (
    <>
      <div className="bg-gray-100 p-2 border font-heading ">
        <div className="grid bg-white p-4 space-y-6">
          <div className="flex justify-between">
            <h2 className="text-xl font-medium ">Roles</h2>
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
                  placeholder="Search Roles and more"
                />
              </div>
              <div>
                <button
                  onClick={() => setshowCreateRoleModel(true)}
                  className="bg-black text-white rounded-xl p-2 shadow-lg text-sm
                flex items-center"
                >
                  <FaPlus />
                  Add Role
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
                    
                    setfilteredRole([]);
                    setQuery("");
                  }}
                  className="text-lg text-gray-600 cursor-pointer"
                />
              </div>
            </div>
          </div>
          <DataTable
            columns={columns}
            data={filteredRole.length > 0 || query ? filteredRole : RolesData}
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
      {showCreateRoleModel && (
        <div
          className="fixed inset-0 flex items-center justify-center
        bg-black bg-opacity-50 z-50 px-4"
        >
          <div className="bg-white rounded-md shadow-md w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6">
            <CreateRole fetchRoles={fetchRoles} closeCreateRoleModel={closeCreateRoleModel} />
          </div>
        </div>
      )}

      {showEditRoleModel && editData && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 px-4">
          <div className="bg-white rounded-md shadow-md w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6">
            <EditRole
              closeEditRoleModel={closeEditRoleModel}
              editData={editData}
              fetchRoles={fetchRoles}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default RoleTable;
