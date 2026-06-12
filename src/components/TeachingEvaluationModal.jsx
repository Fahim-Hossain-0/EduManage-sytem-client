import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hook/useAxiosSecure";
import Loading from "./Loading";

const TeachingEvaluationSection = () => {
  const axiosSecure =
    useAxiosSecure();

  const {
    data: evaluations = [],
    isLoading,
  } = useQuery({
    queryKey: ["all-evaluations"],

    queryFn: async () => {
      const res =
        await axiosSecure.get(
          "/evaluations"
        );

      return res.data;
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  return (
    <section className="py-16">

      <div className="max-w-6xl mx-auto px-4">

        <h2 className="text-4xl font-bold text-center mb-10">
          Student Reviews
        </h2>

        {evaluations.length === 0 ? (
          <p className="text-center">
            No Reviews Yet
          </p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

            {evaluations.map(
              (review) => (
                <div
                  key={review._id}
                  className="card bg-base-100 shadow-xl"
                >
                  <div className="card-body">

                    <h2 className="card-title">
                      {
                        review.studentName
                      }
                    </h2>

                    <div className="text-warning text-lg">
                      {"⭐".repeat(
                        review.rating
                      )}
                    </div>

                    <p>
                      {
                        review.description
                      }
                    </p>

                  </div>
                </div>
              )
            )}

          </div>
        )}

      </div>

    </section>
  );
};

export default TeachingEvaluationSection;