import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../hook/useAxiosSecure";
import Loading from "../../../components/Loading";
import { ChevronLeft, ChevronRight, Shield, UserCog, User } from "lucide-react";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;

  const { data, isLoading } = useQuery({
    queryKey: ["allUsers", currentPage],
    queryFn: async () => {
      const res = await axiosSecure.get(`/all-users?page=${currentPage}&limit=${limit}`);
      return res.data;
    },
  });

  const users = data?.result || [];
  const totalUsers = data?.totalUsers || 0;
  const totalPages = Math.ceil(totalUsers / limit);

  const roleMutation = useMutation({
    mutationFn: async ({ email, role }) => {
      const res = await axiosSecure.patch(`/users/role/${email}`, { role });
      return res.data;
    },
    onSuccess: (_, variables) => {
      toast.success(`${variables.role} role assigned successfully`);
      queryClient.invalidateQueries({ queryKey: ["allUsers"] });
    },
    onError: () => toast.error("Failed to update role"),
  });

  if (isLoading) return <Loading />;

  const roleBadge = (role) => {
    const styles = {
      admin: "bg-red-50 text-red-700 border-red-200",
      teacher: "bg-emerald-50 text-emerald-700 border-emerald-200",
      student: "bg-blue-50 text-blue-700 border-blue-200",
    };
    return `badge-premium border ${styles[role] || styles.student}`;
  };

  const roleIcon = (role) => {
    switch (role) {
      case "admin": return <Shield className="w-3.5 h-3.5" />;
      case "teacher": return <UserCog className="w-3.5 h-3.5" />;
      default: return <User className="w-3.5 h-3.5" />;
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-zinc-900">Manage Users</h2>
        <span className="badge-premium bg-primary-50 text-primary-700 border-primary-200">{totalUsers} total</span>
      </div>

      <div className="card-premium overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-zinc-100">
              <th className="text-left text-xs font-medium text-zinc-500 uppercase tracking-wider px-4 py-3">#</th>
              <th className="text-left text-xs font-medium text-zinc-500 uppercase tracking-wider px-4 py-3">User</th>
              <th className="text-left text-xs font-medium text-zinc-500 uppercase tracking-wider px-4 py-3">Email</th>
              <th className="text-left text-xs font-medium text-zinc-500 uppercase tracking-wider px-4 py-3">Role</th>
              <th className="text-right text-xs font-medium text-zinc-500 uppercase tracking-wider px-4 py-3">Change Role</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-50">
            {users.map((user, index) => (
              <tr key={user._id} className="hover:bg-zinc-50/50 transition-colors">
                <td className="px-4 py-3 text-sm text-zinc-500">{(currentPage - 1) * limit + index + 1}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <img src={user.image} alt={user.name} className="w-9 h-9 rounded-full object-cover" />
                    <span className="text-sm font-medium text-zinc-900">{user.name}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-sm text-zinc-500">{user.email}</td>
                <td className="px-4 py-3">
                  <span className={`inline-flex items-center gap-1.5 ${roleBadge(user.role)}`}>
                    {roleIcon(user.role)}
                    {user.role}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-1.5">
                    {["admin", "teacher", "student"].map((r) => (
                      <button
                        key={r}
                        disabled={user.role === r}
                        onClick={() => roleMutation.mutate({ email: user.email, role: r })}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                          user.role === r
                            ? 'bg-zinc-50 text-zinc-300 cursor-not-allowed'
                            : r === 'admin'
                              ? 'bg-red-50 text-red-700 hover:bg-red-100'
                              : r === 'teacher'
                                ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                                : 'bg-blue-50 text-blue-700 hover:bg-blue-100'
                        }`}
                      >
                        {r}
                      </button>
                    ))}
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
          {[...Array(totalPages).keys()].map((number) => (
            <button
              key={number}
              onClick={() => setCurrentPage(number + 1)}
              className={`w-8 h-8 rounded-lg text-sm font-medium transition-all ${
                currentPage === number + 1 ? 'bg-primary-50 text-primary-700' : 'text-zinc-500 hover:bg-zinc-100'
              }`}
            >
              {number + 1}
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
    </div>
  );
};

export default ManageUsers;
