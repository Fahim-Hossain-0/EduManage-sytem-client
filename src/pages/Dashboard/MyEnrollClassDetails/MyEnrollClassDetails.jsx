import { useState } from "react";
import { useParams } from "react-router";
import {
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import Swal from "sweetalert2";

import useAuth from "../../../hook/useAuth";
import useAxiosSecure from "../../../hook/useAxiosSecure";
import Loading from "../../../components/Loading";

const MyEnrollClassDetails = () => {
  const { id } = useParams();

  const { user } = useAuth();

  const axiosSecure = useAxiosSecure();

  const queryClient = useQueryClient();

  const [selectedAssignment, setSelectedAssignment] =
    useState(null);

  // ======================
  // Get Assignments
  // ======================

  const {
    data: assignments = [],
    isLoading,
  } = useQuery({
    queryKey: ["assignments", id],

    queryFn: async () => {
      const res =
        await axiosSecure.get(
          `/assignments/${id}`
        );

      return res.data;
    },
  });

  // ======================
  // Get Submitted Assignments
  // ======================

  const {
    data: submissions = [],
  } = useQuery({
    queryKey: [
      "student-submissions",
      user?.email,
      id,
    ],

    enabled: !!user?.email,

    queryFn: async () => {
      const res =
        await axiosSecure.get(
          `/submissions/${user.email}/${id}`
        );

      return res.data;
    },
  });

  const submittedAssignmentIds =
    submissions.map(
      (item) => item.assignmentId
    );

  // ======================
  // Submit Assignment
  // ======================

  const handleSubmitAssignment =
    async (e) => {
      e.preventDefault();

      try {
        const form = e.target;

        const submissionText =
          form.submission.value;

        const submissionData = {
          assignmentId:
            selectedAssignment._id,

          classId: id,

          assignmentTitle:
            selectedAssignment.title,

          studentEmail:
            user.email,

          studentName:
            user.displayName,

          submissionText,

          submittedAt:
            new Date(),
        };

        const res =
          await axiosSecure.post(
            "/submissions",
            submissionData
          );

        Swal.fire({
          icon: "success",
          title:
            "Assignment Submitted Successfully",
          timer: 1500,
          showConfirmButton: false,
        });

        form.reset();

        document
          .getElementById(
            "submit_modal"
          )
          .close();

        queryClient.invalidateQueries({
          queryKey: [
            "student-submissions",
          ],
        });

        queryClient.invalidateQueries({
          queryKey: [
            "assignments",
            id,
          ],
        });
      } catch (error) {
        console.log(error);

        Swal.fire({
          icon: "warning",
          title:
            error.response?.data
              ?.message ||
            "Submission Failed",
        });
      }
    };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-8">
        Assignments
      </h2>

      <div className="overflow-x-auto bg-base-100 rounded-xl shadow">
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Deadline</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {assignments.length === 0 ? (
              <tr>
                <td
                  colSpan="4"
                  className="text-center py-10"
                >
                  No Assignments Found
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
                        assignment.deadline
                      }
                    </td>

                    <td>
                      {submittedAssignmentIds.includes(
                        assignment._id
                      ) ? (
                        <button
                          disabled
                          className="btn btn-success btn-sm"
                        >
                          Submitted
                        </button>
                      ) : (
                        <button
                          className="btn btn-primary btn-sm"
                          onClick={() => {
                            setSelectedAssignment(
                              assignment
                            );

                            document
                              .getElementById(
                                "submit_modal"
                              )
                              .showModal();
                          }}
                        >
                          Submit
                        </button>
                      )}
                    </td>
                  </tr>
                )
              )
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}

      <dialog
        id="submit_modal"
        className="modal"
      >
        <div className="modal-box">
          <h3 className="font-bold text-lg">
            Submit Assignment
          </h3>

          <form
            onSubmit={
              handleSubmitAssignment
            }
          >
            <textarea
              name="submission"
              placeholder="Write your answer..."
              className="textarea textarea-bordered w-full mt-4"
              required
            />

            <div className="flex justify-end gap-2 mt-4">
              <button
                type="button"
                className="btn"
                onClick={() =>
                  document
                    .getElementById(
                      "submit_modal"
                    )
                    .close()
                }
              >
                Cancel
              </button>

              <button
                type="submit"
                className="btn btn-primary"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default MyEnrollClassDetails;