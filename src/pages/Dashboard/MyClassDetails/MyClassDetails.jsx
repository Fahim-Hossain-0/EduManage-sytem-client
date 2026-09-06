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

  const { data: classInfo = {}, isLoading: classLoading } = useQuery({
    queryKey: ["class-details", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/all-classes/${id}`);
      return res.data;
    },
  });

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

  if (progressLoading || assignmentLoading || evaluationLoading || classLoading) return <Loading />;

  const stats = [
    { label: "Total Enrollment", value: progress.totalEnrollment || 0, icon: Users, color: "text-primary-600", bg: "bg-primary-50" },
    { label: "Total Assignments", value: progress.totalAssignments || 0, icon: ClipboardList, color: "text-accent-600", bg: "bg-accent-50" },
    { label: "Total Submissions", value: progress.totalSubmissions || 0, icon: CheckSquare, color: "text-emerald-600", bg: "bg-emerald-50" },
    { label: "Avg Rating", value: `⭐ ${averageRating}`, icon: Star, color: "text-amber-600", bg: "bg-amber-50" },
  ];

  return (
    <div className="space-y-8 p-6 bg-slate-50 min-h-screen">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-zinc-500">
        <Link to="/dashboard" className="hover:text-zinc-900">Dashboard</Link>
        <span className="text-zinc-300">/</span>
        <Link to="/dashboard/my-classes" className="hover:text-zinc-900">My Classes</Link>
        <span className="text-zinc-300">/</span>
        <span className="text-zinc-950 font-medium">Class Details</span>
      </nav>

      {/* Hero */}
      <div className="bg-white p-8 rounded-2xl border border-zinc-200 shadow-sm grid md:grid-cols-2 gap-8 items-center">
        <div className="space-y-4">
          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${classInfo.status === 'approved' ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700'}`}>
            {classInfo.status}
          </span>
          <h1 className="text-3xl font-extrabold text-zinc-950 tracking-tight">{classInfo.title}</h1>
          <p className="text-zinc-600 leading-relaxed">{classInfo.description}</p>
          <div className="pt-4 text-zinc-900 font-semibold text-lg">${classInfo.price}</div>
        </div>
        <div className="aspect-video rounded-xl overflow-hidden bg-zinc-100">
          <img src={classInfo.image} alt={classInfo.title} className="w-full h-full object-cover" />
        </div>
      </div>

      {/* KPI Row */}
      <div className="grid sm:grid-cols-3 gap-6">
        {[
          { label: "Total Learners", value: progress.totalEnrollment || 0, icon: Users, color: "#0891B2", bg: "#ECFEFF", text: "Students enrolled in this class" },
          { label: "Total Assignments", value: progress.totalAssignments || 0, icon: ClipboardList, color: "#7C3AED", bg: "#F5F3FF", text: "Assignments created for this class" },
          { label: "Assignment Submissions", value: progress.totalSubmissions || 0, icon: CheckSquare, color: "#2563EB", bg: "#EFF6FF", text: "Total submissions received" },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm flex flex-col gap-4">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: stat.bg }}>
              <stat.icon className="w-6 h-6" style={{ color: stat.color }} />
            </div>
            <div>
              <p className="text-3xl font-bold text-zinc-950">{stat.value}</p>
              <p className="text-sm font-medium text-zinc-600">{stat.label}</p>
              <p className="text-xs text-zinc-400 mt-1">{stat.text}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Performance Section */}
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-2xl border border-zinc-200 shadow-sm">
          <h3 className="text-lg font-bold text-zinc-950">Class Performance</h3>
          <p className="text-sm text-zinc-500 mb-6">Understand how learners are engaging with your class.</p>
          <div className="space-y-4">
            <div className="flex justify-between items-center text-sm">
              <span className="text-zinc-600">Total Enrolled</span>
              <span className="font-bold text-zinc-950">{progress.totalEnrollment || 0}</span>
            </div>
            <div className="w-full h-2 rounded-full bg-zinc-100 overflow-hidden">
              <div className="h-full bg-blue-600" style={{ width: '100%' }}></div>
            </div>
            <p className="text-xs text-zinc-400 mt-2">All enrolled students have access.</p>
          </div>
        </div>

        <div className="bg-white p-8 rounded-2xl border border-zinc-200 shadow-sm">
          <h3 className="text-lg font-bold text-zinc-950">Assignment Activity</h3>
          <p className="text-sm text-zinc-500 mb-6">Total assignments vs submissions.</p>
          <div className="grid grid-cols-2 gap-4">
             <div className="bg-purple-50 p-4 rounded-xl border border-purple-100">
                <p className="text-sm text-purple-700 font-medium">Total Assignments</p>
                <p className="text-2xl font-bold text-purple-900">{progress.totalAssignments || 0}</p>
             </div>
             <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                <p className="text-sm text-blue-700 font-medium">Total Submissions</p>
                <p className="text-2xl font-bold text-blue-900">{progress.totalSubmissions || 0}</p>
             </div>
          </div>
        </div>
      </div>

      {/* Class Assignments */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-zinc-950">Class Assignments</h3>
          <p className="text-sm text-zinc-500">Manage and track your class assignments.</p>
        </div>
        <button onClick={() => setIsOpen(true)} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-600 text-white text-sm font-semibold hover:bg-purple-700 transition-colors">
          <Plus className="w-4 h-4" /> Create Assignment
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-zinc-200 overflow-hidden shadow-sm">
        <table className="w-full">
          <thead className="bg-zinc-50">
            <tr className="border-b border-zinc-100">
              <th className="text-left text-xs font-semibold text-zinc-500 uppercase tracking-wider px-6 py-4">Assignment</th>
              <th className="text-left text-xs font-semibold text-zinc-500 uppercase tracking-wider px-6 py-4">Deadline</th>
              <th className="text-left text-xs font-semibold text-zinc-500 uppercase tracking-wider px-6 py-4">Submissions</th>
              <th className="text-right text-xs font-semibold text-zinc-500 uppercase tracking-wider px-6 py-4">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100">
            {assignments.length === 0 ? (
              <tr>
                <td colSpan="4" className="px-6 py-12 text-center text-sm text-zinc-500">
                  <div className="space-y-2">
                    <p className="font-semibold text-zinc-900">No assignments yet</p>
                    <p>Create your first assignment to give learners something practical to work on.</p>
                  </div>
                </td>
              </tr>
            ) : (
              assignments.map((assignment) => (
                <tr key={assignment._id} className="hover:bg-zinc-50/50 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-zinc-900">{assignment.title}</td>
                  <td className="px-6 py-4 text-sm text-zinc-500">{new Date(assignment.deadline).toLocaleDateString()}</td>
                  <td className="px-6 py-4 text-sm text-zinc-500">{assignment.submissionCount || 0}</td>
                  <td className="px-6 py-4 text-right">
                    <Link to={`/dashboard/assignment-submissions/${assignment._id}`} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-blue-600 hover:bg-blue-50 transition-colors">
                      View Submissions
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {isOpen && (
        <dialog open className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-8 max-w-lg w-full shadow-2xl border border-zinc-100">
            {/* Header */}
            <div className="mb-6">
              <span className="text-[10px] font-bold text-purple-600 tracking-widest uppercase">NEW ASSIGNMENT</span>
              <h2 className="text-2xl font-bold text-zinc-950 mt-1">Create an assignment</h2>
              <p className="text-sm text-zinc-500 mt-1">Give your learners a clear task to practice what they're learning.</p>
            </div>
            
            {/* Class Context */}
            <div className="bg-purple-50 border border-purple-100 rounded-xl p-4 mb-6">
              <p className="text-xs font-semibold text-purple-600 uppercase">Creating for</p>
              <p className="text-base font-bold text-zinc-950">{classInfo.title}</p>
            </div>

            <form onSubmit={handleCreateAssignment} className="space-y-6">
              {/* Assignment Details */}
              <div className="space-y-4">
                <h4 className="text-sm font-semibold text-zinc-950">Assignment Details</h4>
                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-1">Assignment title</label>
                  <input type="text" name="title" placeholder="e.g. Build a responsive React dashboard" className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all" required />
                </div>
              </div>

              {/* Schedule */}
              <div className="space-y-4">
                <h4 className="text-sm font-semibold text-zinc-950">Schedule</h4>
                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-1">Assignment deadline</label>
                  <input type="date" name="deadline" className="w-full px-4 py-3 rounded-xl border-amber-200 border bg-amber-50/50 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-zinc-950" required />
                  <p className="text-xs text-zinc-500 mt-2">Choose a deadline that gives learners enough time to complete the task.</p>
                </div>
              </div>

              {/* Instructions */}
              <div className="space-y-4">
                <h4 className="text-sm font-semibold text-zinc-950">Instructions</h4>
                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-1">Assignment description</label>
                  <textarea name="description" placeholder="Describe what learners need to complete, what they should submit, and any important requirements." className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all min-h-[140px] resize-none" required />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-zinc-100">
                <button type="button" onClick={() => setIsOpen(false)} className="px-5 py-3 rounded-xl text-sm font-semibold text-zinc-600 hover:bg-zinc-100 transition-colors">Cancel</button>
                <button type="submit" disabled={createAssignmentMutation.isPending} className="flex-1 px-5 py-3 rounded-xl text-sm font-semibold bg-purple-600 text-white hover:bg-purple-700 transition-colors flex items-center justify-center gap-2">
                  {createAssignmentMutation.isPending ? "Creating assignment..." : "Add Assignment"}
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
