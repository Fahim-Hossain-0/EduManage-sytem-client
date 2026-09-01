import { useParams, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hook/useAxiosSecure";
import Loading from "../../../components/Loading";
import Swal from "sweetalert2";
import { ArrowLeft } from "lucide-react";

const UpdateClass = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const { data: classData = {}, isLoading } = useQuery({
    queryKey: ["class", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/all-classes/${id}`);
      return res.data;
    },
  });

  const handleUpdate = async (e) => {
    e.preventDefault();
    const form = e.target;
    const updatedClass = {
      title: form.title.value,
      image: form.image.value,
      price: parseFloat(form.price.value),
      description: form.description.value,
    };

    const res = await axiosSecure.patch(`/update-class/${id}`, updatedClass);
    if (res.data.modifiedCount > 0) {
      Swal.fire({ icon: "success", title: "Class Updated Successfully" });
    }
  };

  if (isLoading) return <Loading />;

  return (
    <div className="max-w-2xl">
      <button onClick={() => navigate(-1)} className="inline-flex items-center gap-1.5 text-sm text-zinc-500 hover:text-zinc-900 transition-colors mb-6">
        <ArrowLeft className="w-4 h-4" /> Back
      </button>

      <div className="card-premium p-6 md:p-8">
        <h2 className="text-xl font-semibold text-zinc-900 mb-6">Update Class</h2>

        <form onSubmit={handleUpdate} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1.5">Title</label>
            <input defaultValue={classData.title} name="title" className="w-full px-3.5 py-2.5 rounded-lg border border-zinc-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all" />
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1.5">Image URL</label>
            <input defaultValue={classData.image} name="image" className="w-full px-3.5 py-2.5 rounded-lg border border-zinc-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all" />
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1.5">Price</label>
            <input defaultValue={classData.price} name="price" type="number" className="w-full px-3.5 py-2.5 rounded-lg border border-zinc-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all" />
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1.5">Description</label>
            <textarea defaultValue={classData.description} name="description" className="w-full px-3.5 py-2.5 rounded-lg border border-zinc-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all min-h-[120px] resize-y" />
          </div>

          <div className="flex gap-3">
            <button type="button" onClick={() => navigate(-1)} className="btn-secondary text-sm py-2.5">Cancel</button>
            <button type="submit" className="btn-primary text-sm py-2.5">Update Class</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateClass;
