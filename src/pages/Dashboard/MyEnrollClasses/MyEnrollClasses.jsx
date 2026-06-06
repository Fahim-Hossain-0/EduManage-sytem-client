import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hook/useAuth";
import Loading from "../../../components/Loading";
import useAxiosSecure from "../../../hook/useAxiosSecure";

const MyEnrollClasses = () => {
  const { user } = useAuth();

  const axiosSecure = useAxiosSecure();

  const {
    data: enrollments = [],
    isLoading,
  } = useQuery({
    queryKey: [
      "my-enrollments",
      user?.email,
    ],
    enabled: !!user?.email,
    queryFn: async () => {
      const res =
        await axiosSecure.get(
          `/enrollments/${user.email}`
        );

      return res.data;
    },
  });
  console.log(enrollments);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">
        My Enrolled Classes
      </h2>

      {enrollments.length === 0 ? (
        <div className="text-center py-20">
          <h3 className="text-xl font-semibold">
            No enrolled classes found
          </h3>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>Image</th>
                <th>Class</th>
                <th>Transaction ID</th>
                <th>Enroll Date</th>
                <th>Price</th>
              </tr>
            </thead>

            <tbody>
              {enrollments.map(
                (item, index) => (
                  <tr key={item._id}>
                    <td>
                      {index + 1}
                    </td>

                    <td>
                      <img
                        src={
                          item.classImage
                        }
                        alt={
                          item.classTitle
                        }
                        className="w-16 h-16 rounded object-cover"
                      />
                    </td>

                    <td>
                      {item.classTitle}
                    </td>

                    <td className="max-w-[200px] truncate">
                      {
                        item.transactionId
                      }
                    </td>

                    <td>
                      {new Date(
                        item.enrolledAt
                      ).toLocaleDateString()}
                    </td>
                    <td>${item.price ?? 0}</td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyEnrollClasses;