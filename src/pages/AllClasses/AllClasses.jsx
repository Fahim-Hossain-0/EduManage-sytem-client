import { useQuery } from "@tanstack/react-query";

import ClassCard from "../../components/ClassCard";
import Loading from "../../components/Loading";
import useAxios from "../../hook/useAxios";

const AllClasses = () => {
    const axiosInstance = useAxios();
    const { data: classes = [], isLoading } = useQuery({
       queryKey: ["approved-classes"],
        queryFn: async () => {
            const res = await axiosInstance.get("/all-classes");
            return res.data.result;
        },
    });

    if (isLoading) {
        return <Loading></Loading>;
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {classes.map((item) => (
                <ClassCard
                    key={item._id}
                    item={item}
                />
            ))}
        </div>
    );
};

export default AllClasses;