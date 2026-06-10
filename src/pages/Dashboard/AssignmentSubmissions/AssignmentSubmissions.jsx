import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hook/useAxiosSecure";
import Loading from "../../../components/Loading";

const AssignmentSubmissions = () => {
  const { assignmentId } =
    useParams();

  const axiosSecure =
    useAxiosSecure();

  const {
    data: submissions = [],
    isLoading,
  } = useQuery({
    queryKey: [
      "assignment-submissions",
      assignmentId,
    ],

    queryFn: async () => {
      const res =
        await axiosSecure.get(
          `/assignment-submissions/${assignmentId}`
        );

      return res.data;
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6">
        Assignment Submissions
      </h2>

      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Student Name</th>
              <th>Email</th>
              <th>Submission</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>
            {submissions.map(
              (
                submission,
                index
              ) => (
                <tr
                  key={
                    submission._id
                  }
                >
                  <td>
                    {index + 1}
                  </td>

                  <td>
                    {
                      submission.studentName
                    }
                  </td>

                  <td>
                    {
                      submission.studentEmail
                    }
                  </td>

                  <td>
                    {
                      submission.submissionText
                    }
                  </td>

                  <td>
                    {new Date(
                      submission.submittedAt
                    ).toLocaleDateString()}
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AssignmentSubmissions;   