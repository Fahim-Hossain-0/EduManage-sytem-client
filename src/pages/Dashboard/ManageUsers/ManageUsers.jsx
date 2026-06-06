// src/pages/Dashboard/Admin/ManageUsers/ManageUsers.jsx

import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import toast from "react-hot-toast";

import useAxiosSecure from "../../../hook/useAxiosSecure";
import Loading from "../../../components/Loading";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // ==========================================
  // Pagination
  // ==========================================

  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;

  // ==========================================
  // Get Users
  // ==========================================

  const { data, isLoading } = useQuery({
    queryKey: ["allUsers", currentPage],

    queryFn: async () => {
      const res = await axiosSecure.get(
        `/all-users?page=${currentPage}&limit=${limit}`,
      );

      return res.data;
    },
  });

  const users = data?.result || [];
  const totalUsers = data?.totalUsers || 0;

  const totalPages = Math.ceil(totalUsers / limit);

  // ==========================================
  // Update Role Mutation
  // ==========================================

  const roleMutation = useMutation({
    mutationFn: async ({ email, role }) => {
      const res = await axiosSecure.patch(`/users/role/${email}`, { role });

      return res.data;
    },

    onSuccess: (_, variables) => {
      toast.success(`${variables.role} role assigned successfully`);

      queryClient.invalidateQueries({
        queryKey: ["allUsers"],
      });
    },

    onError: () => {
      toast.error("Failed to update role");
    },
  });

  // ==========================================
  // Loading
  // ==========================================

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-4xl font-bold">Manage Users</h2>

        <div className="badge badge-primary badge-lg">
          Total Users: {totalUsers}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-base-100 shadow-xl rounded-2xl">
        <table className="table">
          <thead className="bg-base-200">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Change Role</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <td>{(currentPage - 1) * limit + index + 1}</td>

                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img src={user.image} alt={user.name} />
                      </div>
                    </div>

                    <div>
                      <div className="font-bold">{user.name}</div>
                    </div>
                  </div>
                </td>

                <td>{user.email}</td>

                <td>
                  <span
                    className={`
                                                badge
                                                ${
                                                  user.role === "admin"
                                                    ? "badge-error"
                                                    : user.role === "teacher"
                                                      ? "badge-success"
                                                      : "badge-info"
                                                }
                                            `}
                  >
                    {user.role}
                  </span>
                </td>

                <td>
                  <div className="flex gap-2">
                    {/* Make Admin */}
                    <button
                      disabled={user.role === "admin"}
                      onClick={() =>
                        roleMutation.mutate({
                          email: user.email,
                          role: "admin",
                        })
                      }
                      className="btn btn-error btn-sm"
                    >
                      Admin
                    </button>

                    {/* Make Teacher */}
                    <button
                      disabled={user.role === "teacher"}
                      onClick={() =>
                        roleMutation.mutate({
                          email: user.email,
                          role: "teacher",
                        })
                      }
                      className="btn btn-success btn-sm"
                    >
                      Teacher
                    </button>

                    {/* Make User */}
                    <button
                      disabled={user.role === "student"}
                      onClick={() =>
                        roleMutation.mutate({
                          email: user.email,
                          role: "student"
                        })
                      }
                      className="btn btn-info btn-sm"
                    >
                      student
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-8 gap-2">
        <button
          className="btn btn-sm"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          Prev
        </button>

        {[...Array(totalPages).keys()].map((number) => (
          <button
            key={number}
            onClick={() => setCurrentPage(number + 1)}
            className={`btn btn-sm ${
              currentPage === number + 1 ? "btn-primary" : ""
            }`}
          >
            {number + 1}
          </button>
        ))}

        <button
          className="btn btn-sm"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ManageUsers;
