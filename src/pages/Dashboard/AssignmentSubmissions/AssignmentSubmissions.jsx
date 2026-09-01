import { useParams, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hook/useAxiosSecure";
import Loading from "../../../components/Loading";
import { ArrowLeft, Mail, Calendar } from "lucide-react";

const AssignmentSubmissions = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const { data: submissions = [], isLoading, isError, error } = useQuery({
    queryKey: ["assignment-submissions", id],
    enabled: !!id,
    queryFn: async () => {
      const res = await axiosSecure.get(`/assignment-submissions/${id}`);
      return res.data;
    },
  });

  if (isLoading) return <Loading />;

  if (isError) {
    return (
      <div className="p-6">
        <h2 className="text-red-500 text-xl">Error: {error.message}</h2>
      </div>
    );
  }

  return (
    <div>
      <button onClick={() => navigate(-1)} className="inline-flex items-center gap-1.5 text-sm text-zinc-500 hover:text-zinc-900 transition-colors mb-6">
        <ArrowLeft className="w-4 h-4" /> Back
      </button>

      <h2 className="text-xl font-semibold text-zinc-900 mb-6">Assignment Submissions</h2>

      {submissions.length === 0 ? (
        <div className="card-premium p-12 text-center">
          <div className="w-14 h-14 rounded-xl bg-zinc-50 flex items-center justify-center mx-auto mb-4">
            <Mail className="w-6 h-6 text-zinc-300" />
          </div>
          <p className="text-sm font-medium text-zinc-900 mb-1">No submissions yet</p>
          <p className="text-xs text-zinc-500">Students haven't submitted this assignment yet.</p>
        </div>
      ) : (
        <div className="card-premium overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-zinc-100">
                <th className="text-left text-xs font-medium text-zinc-500 uppercase tracking-wider px-4 py-3">#</th>
                <th className="text-left text-xs font-medium text-zinc-500 uppercase tracking-wider px-4 py-3">Student</th>
                <th className="text-left text-xs font-medium text-zinc-500 uppercase tracking-wider px-4 py-3">Assignment</th>
                <th className="text-left text-xs font-medium text-zinc-500 uppercase tracking-wider px-4 py-3">Submission</th>
                <th className="text-left text-xs font-medium text-zinc-500 uppercase tracking-wider px-4 py-3">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-50">
              {submissions.map((item, index) => (
                <tr key={item._id} className="hover:bg-zinc-50/50 transition-colors">
                  <td className="px-4 py-3 text-sm text-zinc-500">{index + 1}</td>
                  <td className="px-4 py-3">
                    <div className="text-sm">
                      <p className="font-medium text-zinc-900">{item.studentName}</p>
                      <p className="text-xs text-zinc-500">{item.studentEmail}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-zinc-700">{item.assignmentTitle}</td>
                  <td className="px-4 py-3 text-sm text-zinc-500 max-w-xs whitespace-normal">{item.submissionText}</td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center gap-1.5 text-xs text-zinc-500">
                      <Calendar className="w-3.5 h-3.5" />
                      {new Date(item.submittedAt).toLocaleDateString()}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AssignmentSubmissions;
