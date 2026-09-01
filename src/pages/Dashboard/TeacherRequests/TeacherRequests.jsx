import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../hook/useAxiosSecure";
import Loading from "../../../components/Loading";
import { ChevronLeft, ChevronRight, CheckCircle, XCircle } from "lucide-react";

const TeacherRequests = () => {
  const axiosSecure = useAxiosSecure();
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 5;

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["teacherRequests", currentPage],
    queryFn: async () => {
      const res = await axiosSecure.get(`/teacher-requests?page=${currentPage}&limit=${limit}`);
      return res.data;
    },
  });

  const requests = data?.result || [];
  const totalRequests = data?.totalTeacherRequests || 0;
  const totalPages = Math.ceil(totalRequests / limit);

  const handleApprove = async (id, email) => {
    try {
      const res = await axiosSecure.patch(`/teacher-requests/approve/${id}`, { email });
      if (res.data.message) { toast.success(res.data.message); refetch(); }
    } catch (error) { toast.error(error.message); }
  };

  const handleReject = async (id) => {
    try {
      const res = await axiosSecure.patch(`/teacher-requests/reject/${id}`);
      if (res.data.message) { toast.success(res.data.message); refetch(); }
    } catch (error) { toast.error(error.message); }
  };

  if (isLoading) return <Loading />;

  const statusBadge = (status) => {
    const styles = {
      pending: "bg-amber-50 text-amber-700 border-amber-200",
      accepted: "bg-emerald-50 text-emerald-700 border-emerald-200",
      rejected: "bg-red-50 text-red-700 border-red-200",
    };
    return `badge-premium border ${styles[status] || styles.pending}`;
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-zinc-900">Teacher Requests</h2>
        <span className="badge-premium bg-primary-50 text-primary-700 border-primary-200">{totalRequests} pending</span>
      </div>

      {requests.length === 0 ? (
        <div className="card-premium p-12 text-center">
          <div className="w-14 h-14 rounded-xl bg-zinc-50 flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-6 h-6 text-zinc-300" />
          </div>
          <p className="text-sm font-medium text-zinc-900 mb-1">No pending requests</p>
          <p className="text-xs text-zinc-500">All teacher requests have been reviewed.</p>
        </div>
      ) : (
        <>
          <div className="card-premium overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-zinc-100">
                  <th className="text-left text-xs font-medium text-zinc-500 uppercase tracking-wider px-4 py-3">#</th>
                  <th className="text-left text-xs font-medium text-zinc-500 uppercase tracking-wider px-4 py-3">Teacher</th>
                  <th className="text-left text-xs font-medium text-zinc-500 uppercase tracking-wider px-4 py-3">Experience</th>
                  <th className="text-left text-xs font-medium text-zinc-500 uppercase tracking-wider px-4 py-3">Title</th>
                  <th className="text-left text-xs font-medium text-zinc-500 uppercase tracking-wider px-4 py-3">Category</th>
                  <th className="text-left text-xs font-medium text-zinc-500 uppercase tracking-wider px-4 py-3">Status</th>
                  <th className="text-right text-xs font-medium text-zinc-500 uppercase tracking-wider px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-50">
                {requests.map((request, index) => (
                  <tr key={request._id} className="hover:bg-zinc-50/50 transition-colors">
                    <td className="px-4 py-3 text-sm text-zinc-500">{(currentPage - 1) * limit + index + 1}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <img src={request.image} alt={request.name} className="w-9 h-9 rounded-full object-cover" />
                        <div>
                          <p className="text-sm font-medium text-zinc-900">{request.name}</p>
                          <p className="text-xs text-zinc-500">{request.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm capitalize text-zinc-700">{request.experience}</td>
                    <td className="px-4 py-3 text-sm text-zinc-700">{request.title}</td>
                    <td className="px-4 py-3 text-sm text-zinc-700">{request.category}</td>
                    <td className="px-4 py-3">
                      <span className={statusBadge(request.status)}>{request.status}</span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex justify-end gap-1.5">
                        {request.status === "pending" && (
                          <>
                            <button
                              onClick={() => handleApprove(request._id, request.email)}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-colors"
                            >
                              <CheckCircle className="w-3.5 h-3.5" /> Approve
                            </button>
                            <button
                              onClick={() => handleReject(request._id)}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-red-50 text-red-700 hover:bg-red-100 transition-colors"
                            >
                              <XCircle className="w-3.5 h-3.5" /> Reject
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-1 mt-6">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
                className="p-2 rounded-lg text-zinc-400 hover:text-zinc-600 hover:bg-zinc-100 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              {[...Array(totalPages).keys()].map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page + 1)}
                  className={`w-8 h-8 rounded-lg text-sm font-medium transition-all ${
                    currentPage === page + 1 ? 'bg-primary-50 text-primary-700' : 'text-zinc-500 hover:bg-zinc-100'
                  }`}
                >
                  {page + 1}
                </button>
              ))}
              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
                className="p-2 rounded-lg text-zinc-400 hover:text-zinc-600 hover:bg-zinc-100 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default TeacherRequests;
