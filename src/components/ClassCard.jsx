import { useNavigate } from "react-router";
import { Users, ArrowRight } from "lucide-react";

const ClassCard = ({ item }) => {
    const navigate = useNavigate();

    const handleEnroll = () => {
        navigate(`/classDetails/${item._id}`);
    };

    return (
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden flex flex-col group h-full shadow-sm transition-all duration-300 hover:shadow-md hover:border-blue-200">
            <div className="relative overflow-hidden aspect-video">
                <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-3 left-3">
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-white/95 backdrop-blur-sm text-blue-700 text-[10px] font-bold uppercase tracking-wider shadow-sm">
                        Web Development
                    </span>
                </div>
            </div>

            <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-slate-950 mb-2 group-hover:text-blue-600 transition-colors line-clamp-1">
                    {item.title}
                </h3>

                <p className="text-sm text-slate-600 mb-4">
                    with <span className="text-slate-900 font-medium">{item.name}</span>
                </p>

                <p className="text-slate-600 mb-6 line-clamp-2 leading-relaxed text-sm">
                    {item.description}
                </p>

                <div className="mt-auto flex items-end justify-between pt-4 border-t border-slate-100">
                    <div className="space-y-1">
                        <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Price</p>
                        <p className="text-xl font-bold text-slate-950">${item.price}</p>
                    </div>

                    <button
                        onClick={handleEnroll}
                        className="inline-flex items-center gap-2 bg-slate-900 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-blue-600 transition-all group/btn"
                    >
                        View Class
                        <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ClassCard;
