// src/pages/Dashboard/Teacher/MyClasses/MyClasses.jsx

import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hook/useAxiosSecure";
import useAuth from "../../../hook/useAuth";
import Loading from "../../../components/Loading";
import { useState } from "react";
import { Link } from "react-router";

const MyClasses = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const [status, setStatus] = useState("approved");

  // pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 5;

  const { data, isLoading } = useQuery({
    queryKey: ["myClasses", user?.email, status, currentPage],

    enabled: !!user?.email,

    queryFn: async () => {
      const res = await axiosSecure.get(
        `/my-classes/${user.email}?status=${status}&page=${currentPage}&limit=${limit}`,
      );

      console.log("my classes", res.data);
      return res.data;
    },
  });

  const myClasses = data?.result || [];
  const totalClasses = data?.totalClasses || 0;

  const totalPages = Math.ceil(totalClasses / limit);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-4xl font-bold">My Classes</h2>

        <select
          className="select select-bordered"
          value={status}
          onChange={(e) => {
            setStatus(e.target.value);
            setCurrentPage(1);
          }}
        >
          <option value="approved">Approved</option>
          <option value="pending">Pending</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      {myClasses.length === 0 ? (
        <div className="text-center py-20">
          <h2 className="text-2xl font-semibold">No Classes Added Yet</h2>
        </div>
      ) : (
        <>
          {/* Table */}
          <div className="overflow-x-auto bg-base-100 shadow-xl rounded-2xl">
            <table className="table">
              <thead className="bg-base-200">
                <tr>
                  <th>#</th>
                  <th>Image</th>
                  <th>Title</th>
                  <th>Price</th>
                  <th>Status</th>
                  <th>Total Enrollment</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {myClasses.map((cls, index) => (
                  <tr key={cls._id}>
                    <td>{(currentPage - 1) * limit + index + 1}</td>

                    <td>
                      <div className="avatar">
                        <div className="w-16 rounded">
                          <img src={cls.image} alt={cls.title} />
                        </div>
                      </div>
                    </td>

                    <td className="font-semibold">{cls.title}</td>

                    <td>${cls.price}</td>

                    <td>
                      <span
                        className={`
                                                            badge
                                                            ${
                                                              cls.status ===
                                                              "approved"
                                                                ? "badge-success"
                                                                : cls.status ===
                                                                    "rejected"
                                                                  ? "badge-error"
                                                                  : "badge-warning"
                                                            }
                                                        `}
                      >
                        {cls.status}
                      </span>
                    </td>

                    <td>{cls.totalEnrollment}</td>
                   <td>
  <div className="flex gap-2">
    <Link to={`/dashboard/update-class/${cls._id}`}>
  <button className="btn btn-sm btn-primary text-black">
    Update
  </button>
</Link>

    {cls.status === "approved" && (
      <Link to={`/dashboard/my-class/${cls._id}`}>
        <button className="btn btn-sm btn-success">
          See Details
        </button>
      </Link>
    )}
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
        </>
      )}
    </div>
  );
};

export default MyClasses;
