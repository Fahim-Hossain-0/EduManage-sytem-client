import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hook/useAxiosSecure";
import Loading from "../../../components/Loading";
import { ArrowLeft, Plus, Users, ClipboardList, CheckSquare, Star, Eye } from "lucide-react";

const MyClassDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);

  const { data: progress = {}, isLoading: progressLoading } = useQuery({
    queryKey: ["class-progress", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/class-progress/${id}`);
      return res.data;
    },
  });

  const { data: assignments = [], isLoading: assignmentLoading } = useQuery({
    queryKey: ["assignments", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/assignments/${id}`);
      return res.data;
    },
  });

  const { data: evaluations = [], isLoading: evaluationLoading } = useQuery({
    queryKey: ["evaluations", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/evaluations/${id}`);
      return res.data;
    },
  });

  const averageRating = evaluations.length > 0
    ? (evaluations.reduce((sum, item) => sum + item.rating, 0) / evaluations.length).toFixed(1)
    : 0;

  const createAssignmentMutation = useMutation({
    mutationFn: async (assignmentData) => {
      const res = await axiosSecure.post("/assignments", assignmentData);
      return res.data;
    },
    onSuccess: () => {
      Swal.fire({ icon: "success", title: "Assignment Created Successfully", timer: 1500, showConfirmButton: false });
      setIsOpen(false);
      queryClient.invalidateQueries({ queryKey: ["assignments", id] });
      queryClient.invalidateQueries({ queryKey: ["class-progress", id] });
    },
  });

  const handleCreateAssignment = (e) => {
    e.preventDefault();
    const form = e.target;
    const assignmentData = {
      classId: id,
      title: form.title.value,
      description: form.description.value,
      deadline: form.deadline.value,
      submissionCount: 0,
      createdAt: new Date(),
    };
    createAssignmentMutation.mutate(assignmentData);
  };

  if (progressLoading || assignmentLoading || evaluationLoading) return <Loading />;

  const stats = [
    { label: "Total Enrollment", value: progress.totalEnrollment || 0, icon: Users, color: "text-primary-600", bg: "bg-primary-50" },
    { label: "Total Assignments", value: progress.totalAssignments || 0, icon: ClipboardList, color: "text-accent-600", bg: "bg-accent-50" },
    { label: "Total Submissions", value: progress.totalSubmissions || 0, icon: CheckSquare, color: "text-emerald-600", bg: "bg-emerald-50" },
    { label: "Avg Rating", value: `⭐ ${averageRating}`, icon: Star, color: "text-amber-600", bg: "bg-amber-50" },
  ];

  return (
    <div>
      <button onClick={() => navigate(-1)} className="inline-flex items-center gap-1.5 text-sm text-zinc-500 hover:text-zinc-900 transition-colors mb-6">
        <ArrowLeft className="w-4 h-4" /> Back
      </button>

      <h2 className="text-xl font-semibold text-zinc-900 mb-6">Class Details</h2>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, i) => (
          <div key={i} className="card-premium p-5 flex items-center gap-4">
            <div className={`w-11 h-11 rounded-xl ${stat.bg} flex items-center justify-center shrink-0`}>
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
            </div>
            <div>
              <p className="text-lg font-bold text-zinc-900 leading-none mb-0.5">{stat.value}</p>
              <p className="text-xs text-zinc-500">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-semibold text-zinc-900">Assignments</h3>
        <button onClick={() => setIsOpen(true)} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-primary-50 text-primary-700 text-sm font-medium hover:bg-primary-100 transition-colors">
          <Plus className="w-4 h-4" /> Create Assignment
        </button>
      </div>

      <div className="card-premium overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-zinc-100">
              <th className="text-left text-xs font-medium text-zinc-500 uppercase tracking-wider px-4 py-3">#</th>
              <th className="text-left text-xs font-medium text-zinc-500 uppercase tracking-wider px-4 py-3">Title</th>
              <th className="text-left text-xs font-medium text-zinc-500 uppercase tracking-wider px-4 py-3">Deadline</th>
              <th className="text-left text-xs font-medium text-zinc-500 uppercase tracking-wider px-4 py-3">Submissions</th>
              <th className="text-right text-xs font-medium text-zinc-500 uppercase tracking-wider px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-50">
            {assignments.length === 0 ? (
              <tr>
                <td colSpan="5" className="px-4 py-12 text-center text-sm text-zinc-500">No assignments found</td>
              </tr>
            ) : (
              assignments.map((assignment, index) => (
                <tr key={assignment._id} className="hover:bg-zinc-50/50 transition-colors">
                  <td className="px-4 py-3 text-sm text-zinc-500">{index + 1}</td>
                  <td className="px-4 py-3 text-sm font-medium text-zinc-900">{assignment.title}</td>
                  <td className="px-4 py-3 text-sm text-zinc-500">{assignment.deadline}</td>
                  <td className="px-4 py-3 text-sm text-zinc-500">{assignment.submissionCount || 0}</td>
                  <td className="px-4 py-3 text-right">
                    <Link to={`/dashboard/assignment-submissions/${assignment._id}`}>
                      <button className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium bg-zinc-50 text-zinc-700 hover:bg-zinc-100 transition-colors">
                        <Eye className="w-3.5 h-3.5" /> View
                      </button>
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-8">
        <h3 className="text-base font-semibold text-zinc-900 mb-4">Teaching Evaluation Report</h3>
        <div className="card-premium overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-zinc-100">
                <th className="text-left text-xs font-medium text-zinc-500 uppercase tracking-wider px-4 py-3">#</th>
                <th className="text-left text-xs font-medium text-zinc-500 uppercase tracking-wider px-4 py-3">Student</th>
                <th className="text-left text-xs font-medium text-zinc-500 uppercase tracking-wider px-4 py-3">Rating</th>
                <th className="text-left text-xs font-medium text-zinc-500 uppercase tracking-wider px-4 py-3">Feedback</th>
                <th className="text-left text-xs font-medium text-zinc-500 uppercase tracking-wider px-4 py-3">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-50">
              {evaluations.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-4 py-12 text-center text-sm text-zinc-500">No evaluations found</td>
                </tr>
              ) : (
                evaluations.map((item, index) => (
                  <tr key={item._id} className="hover:bg-zinc-50/50 transition-colors">
                    <td className="px-4 py-3 text-sm text-zinc-500">{index + 1}</td>
                    <td className="px-4 py-3 text-sm font-medium text-zinc-900">{item.studentName}</td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center gap-1 text-sm text-amber-600">{[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-3.5 h-3.5 ${i < item.rating ? 'fill-current' : 'text-zinc-200'}`} />
                      ))}</span>
                    </td>
                    <td className="px-4 py-3 text-sm text-zinc-500 max-w-xs">{item.description}</td>
                    <td className="px-4 py-3 text-sm text-zinc-500">{new Date(item.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isOpen && (
        <dialog open className="modal">
          <div className="modal-box bg-white rounded-xl p-6 max-w-md">
            <h3 className="text-lg font-semibold text-zinc-900 mb-4">Create Assignment</h3>
            <form onSubmit={handleCreateAssignment} className="space-y-4">
              <input type="text" name="title" placeholder="Assignment Title"
                className="w-full px-3.5 py-2.5 rounded-lg border border-zinc-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all" required />
              <textarea name="description" placeholder="Assignment Description"
                className="w-full px-3.5 py-2.5 rounded-lg border border-zinc-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all min-h-[100px] resize-y" required />
              <input type="date" name="deadline"
                className="w-full px-3.5 py-2.5 rounded-lg border border-zinc-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all" required />
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setIsOpen(false)} className="btn-secondary text-sm py-2">Cancel</button>
                <button type="submit" disabled={createAssignmentMutation.isPending} className="btn-primary text-sm py-2">
                  {createAssignmentMutation.isPending ? "Creating..." : "Create"}
                </button>
              </div>
            </form>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default MyClassDetails;
