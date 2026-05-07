import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router';
import toast from 'react-hot-toast';
import useAuth from '../../../hook/useAuth';
import SocialLogin from '../socialLogin/SocialLogin';



const Login = () => {

    const { signInUser } = useAuth();

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const location = useLocation();
    const navigate = useNavigate();

    const from = location.state?.from || '/';

    const onSubmit = (data) => {

        signInUser(data.email, data.password)
            .then(result => {
                console.log(result.user);

                toast.success('Login Successful');

                navigate(from);
            })
            .catch(error => {
                console.error(error);
                toast.error('Invalid Email or Password');
            })
    }

    return (
        <div className="min-h-screen bg-base-200 flex items-center justify-center px-4">

            <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 bg-base-100 rounded-3xl overflow-hidden shadow-2xl">

                {/* LEFT SIDE */}
                <div className="hidden lg:flex flex-col justify-center items-center bg-primary text-primary-content p-12">

                    <h1 className="text-5xl font-extrabold mb-6">
                        Welcome Back 👋
                    </h1>

                    <p className="text-lg text-center leading-relaxed">
                        Login to access your dashboard, manage your account,
                        and continue your journey with us.
                    </p>

                    <img
                        src="https://i.ibb.co.com/6R6Yc2L/login.png"
                        alt="login"
                        className="w-80 mt-10"
                    />
                </div>

                {/* RIGHT SIDE */}
                <div className="p-8 md:p-14">

                    <div className="mb-8">
                        <h2 className="text-4xl font-bold mb-2">
                            Login
                        </h2>

                        <p className="text-base-content/70">
                            Please login to your account
                        </p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)}>

                        <fieldset className="space-y-5">

                            {/* EMAIL */}
                            <div>
                                <label className="label font-semibold">
                                    Email Address
                                </label>

                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="input input-bordered w-full"
                                    {...register('email', { required: true })}
                                />

                                {
                                    errors.email?.type === 'required' &&
                                    <p className="text-red-500 mt-1 text-sm">
                                        Email is required
                                    </p>
                                }
                            </div>

                            {/* PASSWORD */}
                            <div>
                                <label className="label font-semibold">
                                    Password
                                </label>

                                <input
                                    type="password"
                                    placeholder="Enter your password"
                                    className="input input-bordered w-full"
                                    {...register('password', {
                                        required: true,
                                        minLength: 6
                                    })}
                                />

                                {
                                    errors.password?.type === 'required' &&
                                    <p className="text-red-500 mt-1 text-sm">
                                        Password is required
                                    </p>
                                }

                                {
                                    errors.password?.type === 'minLength' &&
                                    <p className="text-red-500 mt-1 text-sm">
                                        Password must be at least 6 characters
                                    </p>
                                }
                            </div>

                            {/* FORGOT PASSWORD */}
                            <div className="text-right">
                                <a className="link link-hover text-primary">
                                    Forgot password?
                                </a>
                            </div>

                            {/* BUTTON */}
                            <button className="btn btn-primary w-full text-black text-lg">
                                Login
                            </button>

                        </fieldset>
                    </form>

                    {/* DIVIDER */}
                    <div className="divider my-8">OR</div>

                    {/* SOCIAL LOGIN */}
                    <SocialLogin />

                    {/* REGISTER LINK */}
                    <p className="text-center mt-6">
                        Don’t have an account?
                        <Link
                            to="/register"
                            className="text-primary font-semibold ml-2 hover:underline"
                        >
                            Register
                        </Link>
                    </p>

                </div>

            </div>

        </div>
    );
};

export default Login;