import { useNavigate, useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";   
import Loading from "./Loading";
import useAxios from "../hook/useAxios";

const ClassDetails = () => {
    const { id } = useParams();
    const axiosInstance = useAxios();
    const navigate = useNavigate();
    const { data: classInfo = {}, isLoading } = useQuery({
        queryKey: ["class-details", id],
        queryFn: async () => {
            const res = await axiosInstance.get(`/all-classes/${id}`);
            return res.data;
        },
    });
    console.log("class info", classInfo);


    if (isLoading) return <Loading></Loading>;

    return (
        <div className="max-w-4xl mx-auto py-10">
            <img
                src={classInfo.image}
                alt={classInfo.title}
                className="w-full h-96 object-cover rounded-xl"
            />

            <div className="mt-6">
                <h1 className="text-4xl font-bold">
                    {classInfo.title}
                </h1>

                <p className="mt-2">
                    Teacher: {classInfo.name}
                </p>

                <p>Email: {classInfo.email}</p>

                <p className="text-2xl font-bold text-primary mt-4">
                    ${classInfo.price}
                </p>

                <p className="mt-4">
                    {classInfo.description}
                </p>

                <p className="mt-4">
                    Total Enrollment:
                    {" "}
                    {classInfo.totalEnrollment}
                </p>

               <button
  onClick={() =>
    navigate(`/checkout/${classInfo._id}`)
  }
  className="btn btn-primary"
>
  Pay Now
</button>
            </div>
        </div>
    );
};

export default ClassDetails;