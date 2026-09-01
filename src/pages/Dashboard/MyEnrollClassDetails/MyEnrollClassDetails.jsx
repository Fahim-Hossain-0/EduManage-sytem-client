import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAuth from "../../../hook/useAuth";
import useAxiosSecure from "../../../hook/useAxiosSecure";
import Loading from "../../../components/Loading";
import TeachingEvaluationModal from "../../../components/TeachingEvaluationModal";
import { ArrowLeft, FileText, Send, Star, CheckCircle, ChevronRight, AlertCircle, BookOpen } from "lucide-react";
import { calculateProgress, getProgressLabel, getAssignmentStatus } from "../../../utils/progressUtils";

const MyEnrollClassDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [selectedAssignment, setSelectedAssignment] = useState(null);

  const { data: assignments = [], isLoading: assignmentsLoading } = useQuery({
    queryKey: ["assignments", id],
    enabled: !!id,
    queryFn: async () => {
      const res = await axiosSecure.get(`/assignments/${id}`);
      return res.data;
    },
  });

  const { data: submissions = [], isLoading: submissionsLoading } = useQuery({
    queryKey: ["student-submissions", user?.email, id],
    enabled: !!user?.email && !!id,
    queryFn: async () => {
      const res = await axiosSecure.get(`/submissions/${user.email}/${id}`);
      return res.data;
    },
  });

  const { data: evaluation, isLoading: evaluationLoading } = useQuery({
    queryKey: ["evaluation", id, user?.email],
    enabled: !!user?.email && !!id,
    queryFn: async () => {
      const res = await axiosSecure.get(`/evaluations/${id}/${user.email}`);
      return res.data;
    },
  });

  // Fetch class details specifically to get title/teacher name, etc.
  const { data: classInfo = {}, isLoading: classLoading } = useQuery({
    queryKey: ["class-details", id],
    enabled: !!id,
    queryFn: async () => {
      const res = await axiosSecure.get(`/all-classes/${id}`);
      return res.data;
    },
  });

  const submittedAssignmentIds = submissions.map((item) => item.assignmentId);
  const progress = calculateProgress(submittedAssignmentIds.length, assignments.length);

  const handleSubmitAssignment = async (e) => {
    e.preventDefault();
    try {
      const form = e.target;
      const submissionData = {
        assignmentId: selectedAssignment._id,
        classId: id,
        assignmentTitle: selectedAssignment.title,
        studentEmail: user.email,
        studentName: user.displayName,
        submissionText: form.submission.value,
        submittedAt: new Date(),
      };
      await axiosSecure.post("/submissions", submissionData);
      Swal.fire({ icon: "success", title: "Assignment Submitted Successfully", timer: 1500, showConfirmButton: false });
      form.reset();
      document.getElementById("submit_modal")?.close();
      queryClient.invalidateQueries({ queryKey: ["student-submissions", user?.email, id] });
    } catch (error) {
      Swal.fire({ icon: "warning", title: error.response?.data?.message || "Submission Failed" });
    }
  };

  if (assignmentsLoading || submissionsLoading || evaluationLoading || classLoading) return <Loading />;

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-slate-500">
        <span className="hover:text-slate-900 cursor-pointer" onClick={() => navigate('/dashboard')}>Dashboard</span>
        <ChevronRight className="w-4 h-4" />
        <span className="hover:text-slate-900 cursor-pointer" onClick={() => navigate('/dashboard/my-enroll-classes')}>My Enrollments</span>
        <ChevronRight className="w-4 h-4" />
        <span className="text-slate-950 font-medium">{classInfo?.title || 'Assignments'}</span>
      </nav>

      {/* Header */}
      <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
                <h1 className="text-3xl font-extrabold text-slate-950 tracking-tight">{classInfo?.title || 'Loading...'}</h1>
                <p className="text-slate-600 mt-2">Instructor: {classInfo?.name}</p>
            </div>
            <button
            disabled={!!evaluation}
            onClick={() => document.getElementById("evaluation_modal").showModal()}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-blue-600 text-blue-600 text-sm font-semibold hover:bg-blue-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
            >
            <Star className="w-4 h-4" />
            {evaluation ? "Already Evaluated" : "Teaching Evaluation"}
            </button>
        </div>
        
        {/* Progress */}
        <div className="pt-6 border-t border-slate-100">
            {assignments.length > 0 ? (
                <>
                    <div className="flex justify-between text-sm mb-2">
                        <span className="font-semibold text-slate-950">Course Progress: {getProgressLabel(progress)}</span>
                        <span className="font-bold text-blue-600">{progress}%</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                        <div className="bg-blue-600 h-full rounded-full transition-all duration-500" style={{ width: `${progress}%` }}></div>
                    </div>
                </>
            ) : (
                <div className="text-sm font-semibold text-slate-500">
                    Course Progress: No assignments yet
                </div>
            )}
        </div>
      </div>

      {/* Assignment List */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {assignments.length === 0 ? (
          <div className="p-16 text-center">
            <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mx-auto mb-6">
                <BookOpen className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-lg font-bold text-slate-950 mb-2">No assignments yet</h3>
            <p className="text-slate-600 max-w-sm mx-auto">Your instructor hasn't added any assignments for this class yet. Check back here when new work is available.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 text-slate-600 text-xs uppercase tracking-wider">
                <tr>
                  <th className="text-left px-6 py-4">Assignment</th>
                  <th className="text-left px-6 py-4">Deadline</th>
                  <th className="text-center px-6 py-4">Status</th>
                  <th className="text-right px-6 py-4">Submission</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {assignments.map((assignment) => {
                  const status = getAssignmentStatus(assignment, submittedAssignmentIds.includes(assignment._id));
                  return (
                  <tr key={assignment._id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <FileText className="w-5 h-5 text-slate-400" />
                        <div>
                            <p className="text-sm font-semibold text-slate-950">{assignment.title}</p>
                            <p className="text-xs text-slate-500 mt-0.5">{assignment.description}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-sm text-slate-600 font-medium">{assignment.deadline}</td>
                    <td className="px-6 py-5 text-center">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${status.class}`}>
                        {status.label === "Submitted" ? <CheckCircle className="w-3.5 h-3.5" /> : <AlertCircle className="w-3.5 h-3.5" />} {status.label}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-right">
                      {!submittedAssignmentIds.includes(assignment._id) && (
                        <button
                          onClick={() => {
                            setSelectedAssignment(assignment);
                            document.getElementById("submit_modal").showModal();
                          }}
                          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-all"
                        >
                          <Send className="w-4 h-4" /> Submit
                        </button>
                      )}
                    </td>
                  </tr>
                )})}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <TeachingEvaluationModal 
        classId={id} 
        className={classInfo?.title} 
        instructorName={classInfo?.name} 
      />

      {/* Submission Modal */}
      <dialog id="submit_modal" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box bg-white rounded-3xl p-8 max-w-lg">
          <h3 className="text-2xl font-bold text-slate-950 mb-6">Submit Assignment</h3>
          <form onSubmit={handleSubmitAssignment} className="space-y-4">
            <textarea
              name="submission"
              className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/10 focus:border-blue-600 transition-all placeholder:text-slate-400 min-h-[160px] resize-y"
              placeholder="Paste your submission or response here..."
              required
            />
            <div className="flex flex-col sm:flex-row justify-end gap-3 mt-6">
              <button type="button" className="px-6 py-3 rounded-xl bg-slate-100 text-slate-700 text-sm font-semibold hover:bg-slate-200 transition-all" onClick={() => document.getElementById("submit_modal").close()}>Cancel</button>
              <button type="submit" className="px-6 py-3 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-all">Submit Assignment</button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default MyEnrollClassDetails;