// src/pages/Dashboard/Teacher/AddClass/AddClass.jsx

import { useForm } from "react-hook-form";

import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import axios from "axios";
import useAxiosSecure from "../../../hook/useAxiosSecure";
import useAuth from "../../../hook/useAuth";

const AddClass = () => {

    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm();

    const onSubmit = async (data) => {

        try {

            // upload image to imgbb
            const imageFile = { image: data.image[0] };

            const res = await axios.post(
                `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_upload_key}`,
                imageFile,
                {
                    headers: {
                        "content-type": "multipart/form-data",
                    },
                }
            );

            const imageUrl = res.data.data.url;

            // class data
            const classData = {
                title: data.title,
                name: user?.displayName,
                email: user?.email,
                price: parseFloat(data.price),
                description: data.description,
                image: imageUrl,
                status: "pending",
                totalEnrollment: 0,
                createdAt: new Date()
            };

            // save class in database
            const classRes = await axiosSecure.post(
                "/add-class",
                classData
            );

            console.log(classData);

            if (classRes.data.data.insertedId) {
                

    toast.success("Class Added Successfully");

    reset();

    setTimeout(() => {

        navigate("/dashboard/my-classes");

    }, 1500);
}

        } catch (error) {
            console.log(error);
            toast.error("Failed to add class");
        }
    };

    return (
        <div className="max-w-4xl mx-auto bg-base-100 shadow-xl rounded-2xl p-8">

            <h2 className="text-4xl font-bold mb-8 text-center">
                Add New Class
            </h2>

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-6"
            >

                {/* Title */}
                <div>
                    <label className="label">
                        <span className="label-text font-semibold">
                            Class Title
                        </span>
                    </label>

                    <input
                        type="text"
                        placeholder="Enter class title"
                        className="input input-bordered w-full"
                        {...register("title", { required: true })}
                    />

                    {
                        errors.title &&
                        <p className="text-red-500 mt-1">
                            Title is required
                        </p>
                    }
                </div>

                {/* Teacher Name */}
                <div>
                    <label className="label">
                        <span className="label-text font-semibold">
                            Teacher Name
                        </span>
                    </label>

                    <input
                        type="text"
                        value={user?.displayName || ""}
                        readOnly
                        className="input input-bordered w-full bg-base-200"
                    />
                </div>

                {/* Teacher Email */}
                <div>
                    <label className="label">
                        <span className="label-text font-semibold">
                            Teacher Email
                        </span>
                    </label>

                    <input
                        type="email"
                        value={user?.email || ""}
                        readOnly
                        className="input input-bordered w-full bg-base-200"
                    />
                </div>

                {/* Price */}
                <div>
                    <label className="label">
                        <span className="label-text font-semibold">
                            Price
                        </span>
                    </label>

                    <input
                        type="number"
                        placeholder="Enter price"
                        className="input input-bordered w-full"
                        {...register("price", { required: true })}
                    />

                    {
                        errors.price &&
                        <p className="text-red-500 mt-1">
                            Price is required
                        </p>
                    }
                </div>

                {/* Description */}
                <div>
                    <label className="label">
                        <span className="label-text font-semibold">
                            Description
                        </span>
                    </label>

                    <textarea
                        className="textarea textarea-bordered w-full h-32"
                        placeholder="Write class description"
                        {...register("description", { required: true })}
                    ></textarea>

                    {
                        errors.description &&
                        <p className="text-red-500 mt-1">
                            Description is required
                        </p>
                    }
                </div>

                {/* Image */}
                <div>
                    <label className="label">
                        <span className="label-text font-semibold">
                            Class Image
                        </span>
                    </label>

                    <input
                        type="file"
                        className="file-input file-input-bordered w-full"
                        {...register("image", { required: true })}
                    />

                    {
                        errors.image &&
                        <p className="text-red-500 mt-1">
                            Image is required
                        </p>
                    }
                </div>

                {/* Submit Button */}
                <button className="btn btn-primary w-full text-black">
                    Add Class
                </button>

            </form>
        </div>
    );
};

export default AddClass;