import React, { useState } from "react";
import axios from "axios";

import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

// import { Loader } from "../../App/Common/UI/Loader";
import { toast } from "react-hot-toast";
import { validateResetPassword } from "../../App/authe/reset";

export const ResetPassword = () => {
  const NavigateTo = useNavigate();
  const [form, setForm] = useState({
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });

  const handleShowPassword = (name) => {
    setShowPassword({ ...showPassword, [name]: !showPassword[name] });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((currVal) => ({ ...currVal, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setError(validateResetPassword(form));

    if (Object.keys(validateResetPassword(form)).length === 0) {
      setLoading(true);

      axios
        .post(`${process.env.REACT_APP_URL}/auth/forgot-password`, {
          userId: searchParams.get("id"),
          token: searchParams.get("token"),
          password: form?.password,
        })
        .then((res) => {
          setForm(res);
          toast.success(res?.data?.message);
          NavigateTo("/login");
        });
    }
  };

  return (
    <>
      {" "}
      <div className="container mx-auto">
        <div className="mx-auto mt-10 px-12 sm:px-24 md:px-48 lg:px-12 lg:mt-16 xl:px-24 xl:max-w-2xl">
          <h2
            className="text-center text-4xl text-indigo-900 font-display font-semibold lg:text-left xl:text-5xl
                xl:text-bold"
          >
            Reset-password
          </h2>
          <div className="mt-12">
            <form onSubmit={handleSubmit}>
              <div className="mt-8">
                <div className="flex  justify-between items-center">
                  <div className="text-sm font-bold text-gray-700 tracking-wide">
                    Password
                  </div>
                </div>
                <div className="relative">
                  <input
                    type={`${showPassword.password ? "text" : "password"}`}
                    className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                    name="password"
                    id="password"
                    placeholder="Enter your password"
                    value={form?.password}
                    onChange={handleChange}
                  />
                  <div
                    className="absolute right-4 top-3 cursor-pointer"
                    onClick={() => handleShowPassword("password")}
                  >
                    {showPassword.password ? (
                      <AiOutlineEyeInvisible className="text-xl text-slate-600" />
                    ) : (
                      <AiOutlineEye className="text-xl text-slate-600" />
                    )}
                  </div>
                </div>
                {error.password && (
                  <p className="text-sm mt-3 text-red-500">{error.password}</p>
                )}
              </div>
              <div className="mt-8">
                <div className="flex  justify-between items-center">
                  <div className="text-sm font-bold text-gray-700 tracking-wide">
                    Reset Password
                  </div>
                </div>
                <div className="relative">
                  <input
                    type={`${
                      showPassword.confirmPassword ? "text" : "password"
                    }`}
                    className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                    name="confirmPassword"
                    id="confirmPassword"
                    placeholder="Enter your password"
                    value={form?.confirmPassword}
                    onChange={handleChange}
                  />
                  <div
                    className="absolute right-4 top-3 cursor-pointer"
                    onClick={() => handleShowPassword("confirmPassword")}
                  >
                    {showPassword.confirmPassword ? (
                      <AiOutlineEyeInvisible className="text-xl text-slate-600" />
                    ) : (
                      <AiOutlineEye className="text-xl text-slate-600" />
                    )}
                  </div>
                </div>
                {error.confirmPassword && (
                  <p className="text-sm mt-3 text-red-500">
                    {error.confirmPassword}
                  </p>
                )}
              </div>
              <div className="mt-10">
                <button
                  className="bg-indigo-500 text-gray-100 p-4 w-full rounded-full tracking-wide
                            font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-indigo-600
                            shadow-lg"
                >
                  reset-password
                </button>
              </div>
            </form>
            <div className="mt-12 text-sm font-display font-semibold text-gray-700 text-center">
              Already have an account ?
              <Link
                to="/login"
                className="cursor-pointer text-indigo-600 hover:text-indigo-800"
              >
                Sign in
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
