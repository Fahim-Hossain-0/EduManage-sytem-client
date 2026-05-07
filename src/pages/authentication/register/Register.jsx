import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import axios from "axios";

import useAxios from "../../../hook/useAxios";
import useAuth from "../../../hook/useAuth";
import Loading from "../../../components/Loading";
import { Link, useLocation, useNavigate } from "react-router";
import SocialLogin from "../socialLogin/SocialLogin";


const Register = () => {

  // 🔥 Custom hooks
  const { createUser, updateUserProfile } = useAuth();
  const axiosInstance = useAxios();

  // 🔥 State for image & loading
  const [profilePic, setProfilePic] = useState("");
  const [loading, setLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation()
  const from = location.state?.from || '/';

  // 🔥 React Hook Form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // =========================================================
  // 🔥 Handle Register Form Submit
  // =========================================================
  const onSubmit = async (data) => {

    // Prevent submit without image
    if (!profilePic) {
      return toast.error("Please upload an image");
    }

    try {

      setLoading(true);

      // 🔥 Create firebase user
      const result = await createUser(
        data.email,
        data.password
      );

      // 🔥 Update firebase profile
      await updateUserProfile({
        displayName: data.name,
        photoURL: profilePic,
        
      }).then(() => {
        navigate(from);
        console.log("Profile updated successfully");
      }).catch((error) => {
        console.error("Error updating profile:", error);
      } );


      // 🔥 User data for database
      const userInfo = {
        name: data.name,
        email: data.email,
        role: "user",
        image: profilePic,
        createdAt: new Date(),
      };

      // 🔥 Save user in database
      const res = await axiosInstance.post(
        "/users",
        userInfo
      );

      console.log(res.data);

      // 🔥 Success message
      toast.success("Registration successful!");

      // 🔥 Reset form
      reset();
      setProfilePic("");

    } catch (error) {

      console.error(error);

      toast.error(
        error?.message || "Registration failed"
      );

    } finally {

      // 🔥 Stop loading
      setLoading(false);
    }
  };

  // =========================================================
  // 🔥 Handle Image Upload
  // =========================================================
  const handleImageUpload = async (e) => {

    try {

      setImageLoading(true);

      // 🔥 Get selected file
      const image = e.target.files[0];

      // Prevent empty upload
      if (!image) return;

      console.log(image);

      // 🔥 Form data
      const formData = new FormData();
      formData.append("image", image);

      // 🔥 ImgBB API
      const imageUploadUrl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_upload_key}`;

      // 🔥 Upload image
      const res = await axios.post(
        imageUploadUrl,
        formData
      );

      console.log(res.data);

      // 🔥 Save uploaded image URL
      setProfilePic(res.data.data.url);

      toast.success("Image uploaded successfully!");

    } catch (error) {

      console.error(error);

      toast.error("Image upload failed");

    } finally {

      setImageLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">

      {/* =========================
          Register Card
      ========================== */}
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">

        {/* Title */}
        <h2 className="text-3xl font-bold text-center mb-6">
          Register Now
        </h2>

        {/* =========================
            Register Form
        ========================== */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5"
        >

          {/* =========================
              Name Input
          ========================== */}
          <div>

            <label className="label font-semibold">
              Name
            </label>

            <input
              type="text"
              placeholder="Enter your name"
              className="input input-bordered w-full"
              {...register("name", {
                required: "Name is required",
              })}
            />

            {/* Error Message */}
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">
                {errors.name.message}
              </p>
            )}
          </div>

          {/* =========================
              Email Input
          ========================== */}
          <div>

            <label className="label font-semibold">
              Email
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              className="input input-bordered w-full"
              {...register("email", {
                required: "Email is required",
              })}
            />

            {/* Error Message */}
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* =========================
              Password Input
          ========================== */}
          <div>

            <label className="label font-semibold">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter your password"
              className="input input-bordered w-full"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message:
                    "Password must be at least 6 characters",
                },
              })}
            />

            {/* Error Message */}
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* =========================
              Image Upload
          ========================== */}
          <div>

            <label className="label font-semibold">
              Image
            </label>

            <input
              type="file"
              className="file-input file-input-bordered w-full"
              onChange={handleImageUpload}
            />

            {/* Image Upload Loading */}
            {imageLoading && (
              <div className="mt-3 flex justify-center">
                <span className="loading loading-spinner loading-md text-primary"></span>
              </div>
            )}
          </div>

          {/* =========================
              Submit Button
          ========================== */}
          <button
            type="submit"
            disabled={loading || imageLoading}
            className="btn btn-primary w-full"
          >

            {/* Button Loading */}
            {loading ? (
            <Loading></Loading>
            ) : (
              "Register"
            )}

          </button>

        </form>
        <p>or</p>
        <p>
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      <SocialLogin></SocialLogin>
      </div>
    </div>
  );
};

export default Register;