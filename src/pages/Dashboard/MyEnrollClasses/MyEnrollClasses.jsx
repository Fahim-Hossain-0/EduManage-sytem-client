import { useQuery } from "@tanstack/react-query";
// import useAuth from "../../../hook/useAuth";
import Loading from "../../../components/Loading";
// import useAxiosSecure from "../../../hook/useAxiosSecure";
import { Link } from "react-router";
import useAxiosSecure from "../../../hook/useAxiosSecure";
import useAuth from "../../../hook/useAuth";

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
  // console.log(enrollments);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">
        My Enrolled Classes
      </h2>

     

<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
  {enrollments.map((item) => (
    <div
      key={item._id}
      className="card bg-base-100 shadow-xl"
    >
      <figure>
        <img
          src={item.classImage}
          alt={item.classTitle}
          className="h-56 w-full object-cover"
        />
      </figure>

      <div className="card-body">
        <h2 className="card-title">
          {item.classTitle}
        </h2>

        <p>
          Teacher:
          {item.teacherName}
        </p>

        <Link
          to={`/dashboard/my-enroll-class/${item.classId}`}
        >
          <button className="btn btn-primary w-full">
            Continue
          </button>
        </Link>
      </div>
    </div>
  ))}
</div>
    </div>
  );
};

export default MyEnrollClasses;