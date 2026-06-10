import { useState } from "react";
import { Link, useParams } from "react-router";
import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hook/useAxiosSecure";
import Loading from "../../components/Loading";

// import useAxiosSecure from "../../../../hook/useAxiosSecure";
// import Loading from "../../../../components/Loading";

const MyClassDetails = () => {
  const { id } = useParams();

  const axiosSecure = useAxiosSecure();

  const queryClient = useQueryClient();

  const [isOpen, setIsOpen] = useState(false);

  // =========================
  // Class Progress
  // =========================
  const {
    data: progress = {},
    isLoading: progressLoading,
  } = useQuery({
    queryKey: ["class-progress", id],

    queryFn: async () => {
      const res = await axiosSecure.get(
        `/class-progress/${id}`
      );

      return res.data;
    },
  });

  // =========================
  // Assignments
  // =========================
  const {
    data: assignments = [],
    isLoading: assignmentLoading,
  } = useQuery({
    queryKey: ["assignments", id],

    queryFn: async () => {
      const res = await axiosSecure.get(
        `/assignments/${id}`
      );

      return res.data;
    },
  });

  // =========================
  // Create Assignment
  // =========================
  const createAssignmentMutation =
    useMutation({
      mutationFn: async (
        assignmentData
      ) => {
        const res =
          await axiosSecure.post(
            "/assignments",
            assignmentData
          );

        return res.data;
      },

      onSuccess: () => {
        Swal.fire({
          icon: "success",
          title:
            "Assignment Created Successfully",
          timer: 1500,
          showConfirmButton: false,
        });

        setIsOpen(false);

        queryClient.invalidateQueries({
          queryKey: [
            "assignments",
            id,
          ],
        });

        queryClient.invalidateQueries({
          queryKey: [
            "class-progress",
            id,
          ],
        });
      },
    });

  // =========================
  // Submit Form
  // =========================
  const handleCreateAssignment = (
    e
  ) => {
    e.preventDefault();

    const form = e.target;

    const assignmentData = {
      classId: id,

      title: form.title.value,

      description:
        form.description.value,

      deadline:
        form.deadline.value,

      submissionCount: 0,

      createdAt: new Date(),
    };

    createAssignmentMutation.mutate(
      assignmentData
    );
  };

  if (
    progressLoading ||
    assignmentLoading
  ) {
    return <Loading />;
  }

  return (
    <div className="p-6">

      {/* Heading */}
      <h2 className="text-4xl font-bold mb-8">
        Class Details
      </h2>

      {/* Progress Cards */}
      <div className="grid md:grid-cols-3 gap-6">

        <div className="card bg-base-100 shadow-xl">
          <div className="card-body text-center">
            <h2 className="text-5xl font-bold">
              {progress.totalEnrollment || 0}
            </h2>

            <p className="font-semibold">
              Total Enrollment
            </p>
          </div>
        </div>

        <div className="card bg-base-100 shadow-xl">
          <div className="card-body text-center">
            <h2 className="text-5xl font-bold">
              {progress.totalAssignments || 0}
            </h2>

            <p className="font-semibold">
              Total Assignments
            </p>
          </div>
        </div>

        <div className="card bg-base-100 shadow-xl">
          <div className="card-body text-center">
            <h2 className="text-5xl font-bold">
              {progress.totalSubmissions || 0}
            </h2>

            <p className="font-semibold">
              Total Submissions
            </p>
          </div>
        </div>

      </div>

      {/* Create Assignment Button */}
      <div className="mt-8">
        <button
          onClick={() =>
            setIsOpen(true)
          }
          className="btn btn-primary"
        >
          Create Assignment
        </button>
      </div>

      {/* Assignment Table */}
      <div className="overflow-x-auto mt-8 bg-base-100 rounded-xl shadow-xl">

        <table className="table">

          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Description</th>
              <th>Deadline</th>
              <th>Submissions</th>
            </tr>
          </thead>

          <tbody>

            {assignments.length === 0 ? (
              <tr>
                <td
                  colSpan="5"
                  className="text-center py-10"
                >
                  No assignments found
                </td>
              </tr>
            ) : (
              assignments.map(
                (
                  assignment,
                  index
                ) => (
                  <tr
                    key={
                      assignment._id
                    }
                  >
                    <td>
                      {index + 1}
                    </td>

                    <td>
                      {
                        assignment.title
                      }
                    </td>

                    <td>
                      {
                        assignment.description
                      }
                    </td>

                    <td>
                      {
                        assignment.deadline
                      }
                    </td>


                    <td>
  {assignment.submissionCount || 0}
</td>
<td>
  <Link
    to={`/dashboard/assignment-submissions/${assignment._id}`}
  >
    <button className="btn btn-info btn-sm">
      View Submissions
    </button>
  </Link>
</td>

                  </tr>
                  
                )
                
              )
            )}

          </tbody>

        </table>
      </div>

      {/* Modal */}
      {isOpen && (
        <dialog
          open
          className="modal"
        >
          <div className="modal-box">

            <h3 className="font-bold text-xl mb-4">
              Create Assignment
            </h3>

            <form
              onSubmit={
                handleCreateAssignment
              }
            >

              <input
                type="text"
                name="title"
                placeholder="Assignment Title"
                className="input input-bordered w-full mb-4"
                required
              />

              <textarea
                name="description"
                placeholder="Assignment Description"
                className="textarea textarea-bordered w-full mb-4"
                required
              />

              <input
                type="date"
                name="deadline"
                className="input input-bordered w-full mb-4"
                required
              />

              <div className="flex justify-end gap-2">

                <button
                  type="button"
                  onClick={() =>
                    setIsOpen(false)
                  }
                  className="btn"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={
                    createAssignmentMutation.isPending
                  }
                >
                  {createAssignmentMutation.isPending
                    ? "Creating..."
                    : "Create"}
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