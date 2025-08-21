import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { FaPlus, FaSearch } from "react-icons/fa";
import { MdRefresh } from "react-icons/md";
import { getRolesData } from "../../services/roleService";
import { editUserData, getAllUsersData, getFilterUserData } from "../../services/UserServices";
import AddUser from "./AddUser";


const UsersTable = () => {
  const [showAddUserModal, setshowAddUserModal] = useState(false);
  const [query, setQuery] = useState("");
  const [filteredUser, setfilteredUser] = useState([]);
  const [UserData, setUserData] = useState([]);
  const [RolesData, setRolesData] = useState([]);
  const [editingUserId, setEditingUserId] = useState(null);
  const [selectedRole, setSelectedRole] = useState("");

  // Fetch all roles
  const fetchRoles = async () => {
    try {
      const res = await getRolesData();
      setRolesData(res);
    } catch (err) {
      console.error(err);
    }
  };

  // Fetch all users
  const fetchUsers = async () => {
    try {
      const res = await getAllUsersData();
      setUserData(res);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchRoles();
    fetchUsers();
  }, []);

  // Save updated role
  const handleSaveRole = async (userId) => {
    try {
      await editUserData(userId, { roleId: selectedRole });
      setEditingUserId(null);
      fetchUsers();
    } catch (err) {
      console.error("Error updating role:", err);
    }
  };

  const columns = [
    {
      name: "S.No.",
      cell: (row, index) => index + 1,
      width: "70px",
    },
    {
      name: "Name",
      selector: (row) => row.fullname,
      width: "170px",
    },
    {
      name: "Email",
      selector: (row) => row.email,
      width: "220px",
    },
    {
      name: "Role",
      selector: (row) => row.roleId?.name || "No Role",
      width: "160px",
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="flex gap-2 items-center">
          {editingUserId === row._id ? (
            <div className="flex items-center gap-6">
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="border border-gray-300 rounded-lg px-7
                 py-1 text-sm focus:ring-2 focus:ring-green-500 focus:outline-none"
              >
                {RolesData.map((role) => (
                  <option key={role._id} value={role._id}>
                    {role.name}
                  </option>
                ))}
              </select>

              {/* Save Button */}
              <button
                onClick={() => handleSaveRole(row._id)}
                className="flex items-center justify-center bg-green-500 hover:bg-green-600 text-white rounded-full w-8 h-8 shadow-md transition"
                title="Save"
              >
                ✔
              </button>

              {/* Cancel Button */}
              <button
                onClick={() => setEditingUserId(null)}
                className="flex items-center justify-center bg-gray-300 hover:bg-gray-400 text-white rounded-full w-8 h-8 shadow-md transition"
                title="Cancel"
              >
                ✖
              </button>
            </div>
          ) : (
            <button
              onClick={() => {
                setEditingUserId(row._id);
                setSelectedRole(row.roleId?._id || "");
              }}
              className="px-3 py-1 text-xs font-medium border border-green-600 text-green-600 rounded-lg hover:bg-green-600 hover:text-white transition shadow-sm"
            >
              Change Role
            </button>
          )}
        </div>
      ),
      width: "250px",
    },
  ];

  const handleSearch = async (query) => {
      setQuery(query);
  
      if (query.trim() === "") {
         fetchRoles()
        setfilteredUser([]);
        return;
      }
  
      try {
        const res = await getFilterUserData({ q: query });
        setfilteredUser(res);
      } catch (err) {
        console.error("Error searching Role", err);
      }
    };

  return (
    <>
      <div className="bg-gray-100 p-2 border font-heading ">
        <div className="grid bg-white p-4 space-y-6">
          <div className="flex justify-between">
            <h2 className="text-xl font-medium ">Users</h2>
            <div className="flex gap-3 items-center">
              <div className="relative">
                <FaSearch className="absolute top-1/2 left-2 -translate-y-1/2 text-sm text-gray-500" />
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
                  onClick={() => setshowAddUserModal(true)}
                  className="bg-black text-white rounded-xl p-2 shadow-lg text-sm flex items-center"
                >
                  <FaPlus />
                  Add User
                </button>
              </div>
              <div className="border border-black/10 p-2 rounded">
                <MdRefresh
                  onClick={() => {
                    setfilteredUser([]);
                    setQuery("");
                  }}
                  className="text-lg text-gray-600 cursor-pointer"
                />
              </div>
            </div>
          </div>
          <DataTable
            columns={columns}
            data={filteredUser.length > 0 || query ? filteredUser : UserData}
            fixedHeader
            fixedHeaderScrollHeight="60vh"
            pagination
            highlightOnHover
            dense
          />
        </div>
      </div>

      {/* Add User Modal */}
      {showAddUserModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 px-4">
          <div className="bg-white rounded-md shadow-md w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6">
            <AddUser
              fetchUsers={fetchUsers}
              closeAddUserModal={() => setshowAddUserModal(false)}
            />
          </div>
        </div>
      )}

    
    </>
  );
};

export default UsersTable;
