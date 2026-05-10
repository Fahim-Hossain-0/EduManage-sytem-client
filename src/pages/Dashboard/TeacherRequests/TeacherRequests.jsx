import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../hook/useAxiosSecure";

const TeacherRequests = () => {
  const axiosSecure = useAxiosSecure();

  const [currentPage, setCurrentPage] = useState(1);
  const limit = 5;

  // Fetch Teacher Requests
  const {
    data,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["teacherRequests", currentPage],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/teacher-requests?page=${currentPage}&limit=${limit}`
      );

      return res.data;
    },
  });

  // Important
  const requests = data?.result || [];
  const totalRequests = data?.totalTeacherRequests || 0;

  const totalPages = Math.ceil(totalRequests / limit);

  // Approve
  const handleApprove = async (id, email) => {
    try {
      const res = await axiosSecure.patch(
        `/teacher-requests/approve/${id}`,
        { email }
      );

      if (res.data.message) {
        toast.success(res.data.message);
        refetch();
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Reject
  const handleReject = async (id) => {
    try {
      const res = await axiosSecure.patch(
        `/teacher-requests/reject/${id}`
      );

      if (res.data.message) {
        toast.success(res.data.message);
        refetch();
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Loading
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="p-5">

      <h2 className="text-3xl font-bold mb-6">
        Teacher Requests
      </h2>

      <div className="overflow-x-auto bg-white rounded-xl shadow-lg">

        <table className="table">

          {/* head */}
          <thead className="bg-base-200">
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Name</th>
              <th>Email</th>
              <th>Experience</th>
              <th>Title</th>
              <th>Category</th>
              <th>Status</th>
              <th>Approve</th>
              <th>Reject</th>
            </tr>
          </thead>

          <tbody>

            {requests.map((request, index) => (
              <tr key={request._id}>

                <td>
                  {(currentPage - 1) * limit + index + 1}
                </td>

                {/* Image */}
                <td>
                  <div className="avatar">
                    <div className="w-12 rounded-full">
                      <img
                        src={request.image}
                        alt={request.name}
                      />
                    </div>
                  </div>
                </td>

                {/* Name */}
                <td>{request.name}</td>

                {/* Email */}
                <td>{request.email}</td>

                {/* Experience */}
                <td className="capitalize">
                  {request.experience}
                </td>

                {/* Title */}
                <td>{request.title}</td>

                {/* Category */}
                <td>{request.category}</td>

                {/* Status */}
                <td>
                  <span className="badge badge-warning capitalize">
                    {request.status}
                  </span>
                </td>

                {/* Approve */}
                <td>
                  <button
                    onClick={() =>
                      handleApprove(
                        request._id,
                        request.email
                      )
                    }
                    className="btn btn-success btn-sm"
                  >
                    Approve
                  </button>
                </td>

                {/* Reject */}
                <td>
                  <button
                    onClick={() =>
                      handleReject(request._id)
                    }
                    className="btn btn-error btn-sm"
                  >
                    Reject
                  </button>
                </td>

              </tr>
            ))}

          </tbody>
        </table>

        {
          requests.length === 0 && (
            <div className="text-center py-10">
              No Pending Requests
            </div>
          )
        }
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-8 gap-2">

        <button
          disabled={currentPage === 1}
          onClick={() =>
            setCurrentPage(currentPage - 1)
          }
          className="btn btn-sm"
        >
          Prev
        </button>

        {[...Array(totalPages).keys()].map((page) => (
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
        ))}

        <button
          disabled={currentPage === totalPages}
          onClick={() =>
            setCurrentPage(currentPage + 1)
          }
          className="btn btn-sm"
        >
          Next
        </button>

      </div>
    </div>
  );
};

export default TeacherRequests;