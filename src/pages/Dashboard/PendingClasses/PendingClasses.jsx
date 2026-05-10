// src/pages/Dashboard/Admin/PendingClasses/PendingClasses.jsx

import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import toast from "react-hot-toast";
import useAxiosSecure from "../../../hook/useAxiosSecure";
import Loading from "../../../components/Loading";
import { useState } from "react";

const PendingClasses = () => {

  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // ==========================================
  // Pagination State
  // ==========================================

  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 5;

  // ==========================================
  // Get Pending Classes
  // ==========================================

  const {
    data: classData = {},
    isLoading,
  } = useQuery({
    queryKey: ["pendingClasses", currentPage],

    queryFn: async () => {

      const res = await axiosSecure.get(
        `/pending-classes?page=${currentPage}&limit=${itemsPerPage}`
      );

      return res.data;
    },
  });

  const pendingClasses = classData.result || [];
  const totalClasses = classData.totalClasses || 0;

  const totalPages = Math.ceil(
    totalClasses / itemsPerPage
  );

  // ==========================================
  // Update Status Mutation
  // ==========================================

  const statusMutation = useMutation({

    mutationFn: async ({ id, status }) => {

      const res = await axiosSecure.patch(
        `/classes/status/${id}`,
        { status }
      );

      return res.data;
    },

    onSuccess: (_, variables) => {

      toast.success(
        `Class ${variables.status} successfully`
      );

      queryClient.invalidateQueries({
        queryKey: ["pendingClasses"],
      });
    },

    onError: () => {

      toast.error("Failed to update status");
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

      <div className="flex justify-between items-center mb-8">

        <h2 className="text-4xl font-bold">
          Pending Classes
        </h2>

        <div className="badge badge-primary badge-lg">

          Total: {totalClasses}

        </div>

      </div>

      {
        pendingClasses.length === 0 ? (

          <div className="text-center py-20">

            <h2 className="text-2xl font-semibold">
              No Pending Classes
            </h2>

          </div>

        ) : (

          <>
            <div className="overflow-x-auto bg-base-100 shadow-xl rounded-2xl">

              <table className="table">

                <thead className="bg-base-200">

                  <tr>
                    <th>#</th>
                    <th>Image</th>
                    <th>Title</th>
                    <th>Teacher</th>
                    <th>Email</th>
                    <th>Price</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>

                </thead>

                <tbody>

                  {
                    pendingClasses.map((cls, index) => (

                      <tr key={cls._id}>

                        <td>
                          {(currentPage - 1) * itemsPerPage + index + 1}
                        </td>

                        <td>
                          <div className="avatar">
                            <div className="w-16 rounded">
                              <img
                                src={cls.image}
                                alt={cls.title}
                              />
                            </div>
                          </div>
                        </td>

                        <td className="font-semibold">
                          {cls.title}
                        </td>

                        <td>{cls.name}</td>

                        <td>{cls.email}</td>

                        <td>${cls.price}</td>

                        <td>
                          <span className="badge badge-warning">
                            {cls.status}
                          </span>
                        </td>

                        <td>

                          <div className="flex gap-2">

                            {/* Approve */}
                            <button
                              onClick={() =>
                                statusMutation.mutate({
                                  id: cls._id,
                                  status: "approved",
                                })
                              }
                              className="btn btn-success btn-sm"
                            >
                              Approve
                            </button>

                            {/* Reject */}
                            <button
                              onClick={() =>
                                statusMutation.mutate({
                                  id: cls._id,
                                  status: "rejected",
                                })
                              }
                              className="btn btn-error btn-sm"
                            >
                              Reject
                            </button>

                          </div>

                        </td>

                      </tr>
                    ))
                  }

                </tbody>

              </table>

            </div>

            {/* Pagination */}

            <div className="flex justify-center mt-8 gap-2 flex-wrap">

              <button
                className="btn btn-sm"
                disabled={currentPage === 1}
                onClick={() =>
                  setCurrentPage(currentPage - 1)
                }
              >
                Prev
              </button>

              {
                [...Array(totalPages).keys()].map((page) => (

                  <button
                    key={page}
                    onClick={() =>
                      setCurrentPage(page + 1)
                    }
                    className={`btn btn-sm ${
                      currentPage === page + 1
                        ? "btn-primary"
                        : ""
                    }`}
                  >
                    {page + 1}
                  </button>
                ))
              }

              <button
                className="btn btn-sm"
                disabled={currentPage === totalPages}
                onClick={() =>
                  setCurrentPage(currentPage + 1)
                }
              >
                Next
              </button>

            </div>
          </>
        )
      }
    </div>
  );
};

export default PendingClasses;