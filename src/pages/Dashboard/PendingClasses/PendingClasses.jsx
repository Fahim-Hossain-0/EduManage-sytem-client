import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../hook/useAxiosSecure";
import Loading from "../../../components/Loading";
import { useState } from "react";
import { ChevronLeft, ChevronRight, CheckCircle, XCircle } from "lucide-react";

const PendingClasses = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const { data: classData = {}, isLoading } = useQuery({
    queryKey: ["pendingClasses", currentPage],
    queryFn: async () => {
      const res = await axiosSecure.get(`/pending-classes?page=${currentPage}&limit=${itemsPerPage}`);
      return res.data;
    },
  });

  const pendingClasses = classData.result || [];
  const totalClasses = classData.totalClasses || 0;
  const totalPages = Math.ceil(totalClasses / itemsPerPage);

  const statusMutation = useMutation({
    mutationFn: async ({ id, status }) => {
      const res = await axiosSecure.patch(`/classes/status/${id}`, { status });
      return res.data;
    },
    onSuccess: (_, variables) => {
      toast.success(`Class ${variables.status} successfully`);
      queryClient.invalidateQueries({ queryKey: ["pendingClasses"] });
    },
    onError: () => toast.error("Failed to update status"),
  });

  if (isLoading) return <Loading />;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-zinc-900">Pending Classes</h2>
        <span className="badge-premium bg-primary-50 text-primary-700 border-primary-200">{totalClasses} total</span>
      </div>

      {pendingClasses.length === 0 ? (
        <div className="card-premium p-12 text-center">
          <div className="w-14 h-14 rounded-xl bg-zinc-50 flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-6 h-6 text-zinc-300" />
          </div>
          <p className="text-sm font-medium text-zinc-900 mb-1">No pending classes</p>
          <p className="text-xs text-zinc-500">All classes have been reviewed.</p>
        </div>
      ) : (
        <>
          <div className="card-premium overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-zinc-100">
                  <th className="text-left text-xs font-medium text-zinc-500 uppercase tracking-wider px-4 py-3">#</th>
                  <th className="text-left text-xs font-medium text-zinc-500 uppercase tracking-wider px-4 py-3">Class</th>
                  <th className="text-left text-xs font-medium text-zinc-500 uppercase tracking-wider px-4 py-3">Teacher</th>
                  <th className="text-left text-xs font-medium text-zinc-500 uppercase tracking-wider px-4 py-3">Price</th>
                  <th className="text-left text-xs font-medium text-zinc-500 uppercase tracking-wider px-4 py-3">Status</th>
                  <th className="text-right text-xs font-medium text-zinc-500 uppercase tracking-wider px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-50">
                {pendingClasses.map((cls, index) => (
                  <tr key={cls._id} className="hover:bg-zinc-50/50 transition-colors">
                    <td className="px-4 py-3 text-sm text-zinc-500">{(currentPage - 1) * itemsPerPage + index + 1}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <img src={cls.image} alt={cls.title} className="w-10 h-10 rounded-lg object-cover" />
                        <span className="text-sm font-medium text-zinc-900">{cls.title}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-sm">
                        <p className="font-medium text-zinc-900">{cls.name}</p>
                        <p className="text-xs text-zinc-500">{cls.email}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-zinc-700">${cls.price}</td>
                    <td className="px-4 py-3">
                      <span className="badge-premium bg-amber-50 text-amber-700 border-amber-200">{cls.status}</span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex justify-end gap-1.5">
                        <button
                          onClick={() => statusMutation.mutate({ id: cls._id, status: "approved" })}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-colors"
                        >
                          <CheckCircle className="w-3.5 h-3.5" /> Approve
                        </button>
                        <button
                          onClick={() => statusMutation.mutate({ id: cls._id, status: "rejected" })}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-red-50 text-red-700 hover:bg-red-100 transition-colors"
                        >
                          <XCircle className="w-3.5 h-3.5" /> Reject
                        </button>
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

export default PendingClasses;
