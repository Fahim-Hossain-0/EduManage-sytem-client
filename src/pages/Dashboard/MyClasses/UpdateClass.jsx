import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hook/useAxiosSecure";
import Loading from "../../../components/Loading";
import Swal from "sweetalert2";

const UpdateClass = () => {
  const { id } = useParams();

  const axiosSecure =
    useAxiosSecure();

  const {
    data: classData = {},
    isLoading,
  } = useQuery({
    queryKey: ["class", id],

    queryFn: async () => {
      const res =
        await axiosSecure.get(
          `/all-classes/${id}`
        );

      return res.data;
    },
  });

  const handleUpdate = async (
    e
  ) => {
    e.preventDefault();

    const form = e.target;

    const updatedClass = {
      title: form.title.value,
      image: form.image.value,
      price: parseFloat(
        form.price.value
      ),
      description:
        form.description.value,
    };

    const res =
      await axiosSecure.patch(
        `/update-class/${id}`,
        updatedClass
      );

    if (
      res.data.modifiedCount > 0
    ) {
      Swal.fire({
        icon: "success",
        title:
          "Class Updated Successfully",
      });
    }
  };

  if (isLoading)
    return <Loading />;

  return (
    <div className="max-w-3xl mx-auto p-6">

      <h2 className="text-3xl font-bold mb-6">
        Update Class
      </h2>

      <form
        onSubmit={handleUpdate}
        className="space-y-4"
      >

        <input
          defaultValue={
            classData.title
          }
          name="title"
          className="input input-bordered w-full"
        />

        <input
          defaultValue={
            classData.image
          }
          name="image"
          className="input input-bordered w-full"
        />

        <input
          defaultValue={
            classData.price
          }
          name="price"
          type="number"
          className="input input-bordered w-full"
        />

        <textarea
          defaultValue={
            classData.description
          }
          name="description"
          className="textarea textarea-bordered w-full"
        />

        <button className="btn btn-primary">
          Update Class
        </button>

      </form>
    </div>
  );
};

export default UpdateClass;