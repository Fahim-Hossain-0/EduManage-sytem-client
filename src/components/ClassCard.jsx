import { useNavigate } from "react-router";

const ClassCard = ({ item }) => {
    const navigate = useNavigate();

    const handleEnroll = () => {
        navigate(`/classDetails/${item._id}`);
    };

    return (
        <div className="bg-white rounded-2xl overflow-hidden shadow-lg border hover:shadow-xl transition">
            <img
                src={item.image}
                alt={item.title}
                className="w-full h-56 object-cover"
            />

            <div className="p-5">
                <h2 className="text-xl font-bold mb-2">
                    {item.title}
                </h2>

                <p className="text-gray-600 mb-2">
                    Instructor: {item.name}
                </p>

                <p className="text-lg font-semibold text-primary mb-3">
                    ${item.price}
                </p>

                <p className="text-gray-500 text-sm mb-4">
                    {item.description.length > 80
                        ? `${item.description.slice(0, 80)}...`
                        : item.description}
                </p>

                <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">
                        👨‍🎓 {item.totalEnrollment} Enrolled
                    </span>

                    <button
                        onClick={handleEnroll}
                        className="btn btn-primary btn-sm"
                    >
                        Enroll
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ClassCard;