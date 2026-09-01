import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../hook/useAxiosSecure";
import toast from "react-hot-toast";
import { Star, X, Loader2 } from "lucide-react";

const TeachingEvaluationModal = ({ classId, className, instructorName }) => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (rating === 0) return toast.error("Please select a rating");
    
    setLoading(true);
    try {
      await axiosSecure.post("/evaluations", {
        classId,
        rating,
        description: feedback,
        date: new Date().toISOString(),
      });
      toast.success("Thank you! Your feedback has been submitted.");
      setRating(0);
      setFeedback("");
      document.getElementById("evaluation_modal")?.close();
      queryClient.invalidateQueries({ queryKey: ["evaluation", classId] });
    } catch (error) {
      toast.error("We couldn't submit your feedback. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <dialog id="evaluation_modal" className="modal modal-bottom sm:modal-middle">
      <div className="modal-box bg-white rounded-3xl p-8 max-w-lg">
        <div className="flex justify-between items-start mb-6">
            <div>
                <h3 className="text-2xl font-bold text-slate-950">How was your learning experience?</h3>
                <p className="text-slate-600 mt-1">Share your feedback about this class and instructor.</p>
            </div>
            <button onClick={() => document.getElementById("evaluation_modal").close()} className="text-slate-400 hover:text-slate-600"><X /></button>
        </div>

        <div className="mb-6 p-4 rounded-xl bg-slate-50 border border-slate-100">
            <p className="text-sm font-semibold text-slate-900">{className}</p>
            <p className="text-xs text-slate-500">Instructor: {instructorName}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-3">Rate your experience</label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className={`p-1 transition-all ${star <= rating ? 'text-amber-400' : 'text-slate-200'}`}
                >
                  <Star className="w-8 h-8 fill-current" />
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Your feedback</label>
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/10 focus:border-blue-600 transition-all placeholder:text-slate-400 min-h-[120px] resize-y"
              placeholder="Tell us what you liked about this class and how the learning experience could be improved..."
              required
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button type="button" className="flex-1 px-6 py-3 rounded-xl bg-slate-100 text-slate-700 text-sm font-semibold hover:bg-slate-200 transition-all" onClick={() => document.getElementById("evaluation_modal").close()}>Cancel</button>
            <button type="submit" disabled={loading} className="flex-[2] px-6 py-3 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-all flex items-center justify-center gap-2">
              {loading ? <><Loader2 className="w-5 h-5 animate-spin" /> Sending...</> : "Send Feedback"}
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default TeachingEvaluationModal;