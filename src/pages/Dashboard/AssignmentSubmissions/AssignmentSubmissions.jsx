import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hook/useAxiosSecure";
import Loading from "../../../components/Loading";

const AssignmentSubmissions = () => {
  // const { id } = useParams();
  const { id } = useParams();

console.log("Assignment ID:", id);

  const axiosSecure = useAxiosSecure();

  const {
    data: submissions = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["assignment-submissions", id],

    enabled: !!id,

    queryFn: async () => {
      const res = await axiosSecure.get(
        `/assignment-submissions/${id}`
      );

      return res.data;
    },
  });
  console.log(submissions);

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return (
      <div className="p-6">
        <h2 className="text-red-500 text-xl">
          Error: {error.message}
        </h2>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6">
        Assignment Submissions
      </h2>

      <div className="overflow-x-auto bg-base-100 shadow rounded-xl">
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Student Name</th>
              <th>Email</th>
              <th>Assignment</th>
              <th>Submission</th>
              <th>Submitted Date</th>
            </tr>
          </thead>

          <tbody>
            {submissions.length === 0 ? (
              <tr>
                <td
                  colSpan="6"
                  className="text-center py-10"
                >
                  No submissions found
                </td>
              </tr>
            ) : (
              submissions.map((item, index) => (
                <tr key={item._id}>
                  <td>{index + 1}</td>

                  <td>
                    {item.studentName}
                  </td>

                  <td>
                    {item.studentEmail}
                  </td>

                  <td>
                    {item.assignmentTitle}
                  </td>

                  <td className="max-w-xs whitespace-normal">
                    {item.submissionText}
                  </td>

                  <td>
                    {new Date(
                      item.submittedAt
                    ).toLocaleDateString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AssignmentSubmissions;