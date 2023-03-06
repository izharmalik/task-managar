import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Loader } from "../../App/Common/UI/Loader";
import { useAppContext } from "../../Store/store";
import { validateForgot } from "../../App/authe/forgot";
import { toast } from "react-hot-toast";

export const ForgotPassword = () => {
  const { setAuthContext, authContext } = useAppContext();
  const NavigateTo = useNavigate();
  const [form, setForm] = useState({
    email: "",
  });
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    form?.success && NavigateTo("/login");
  }, [form]);

  useEffect(() => {
    authContext?.isAuthenticated && NavigateTo("/dashboard");
  }, [authContext]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((currVal) => ({ ...currVal, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setError(validateForgot(form));

    if (Object.keys(validateForgot(form)).length === 0) {
      setLoading(true);

      axios
        .post(`${process.env.REACT_APP_BASEURL}/auth/forgot-password`, {
          email: form?.email,
        })
        .then((res) => {
          console.log(res?.data);
          setForm(res?.data);
          setLoading(false);
          setAuthContext({
            ...form?.user,
            isAuthenticated: form?.isAuthenticated,
          });
          localStorage.setItem(
            "userAuth",
            JSON.stringify({
              ...form?.user,
              isAuthenticated: form?.isAuthenticated,
            })
          );
          toast.success("check link on your email");
        })
        .catch((error) => {
          setLoading(false);
          toast.error("Please enter registered email");
        });
    }
  };

  return (
    <>
      <div className="font-mono bg-gray-400 py-10">
        <div className="container mx-auto">
          <div className="flex justify-center px-6 my-12">
            <div className="w-full lg:w-1/2 bg-white p-5 rounded-lg  justify-center">
              <div className="px-8 mb-4 text-center">
                <h3 className="pt-4 mb-2 text-2xl">Forgot Your Password?</h3>
                <p className="mb-4 text-sm text-gray-700">
                  We get it, stuff happens. Just enter your email address below
                  and we'll send you a link to reset your password!
                </p>
              </div>
              <form
                className="px-8 pt-6 pb-8 mb-4 bg-white rounded "
                onSubmit={handleSubmit}
              >
                <div className="mb-4">
                  <label
                    className="block mb-2 text-sm font-bold text-gray-700"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <input
                    className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    type="email"
                    label="Email"
                    name="email"
                    id="email"
                    placeholder="Enter your email"
                    value={form?.email}
                    onChange={handleChange}
                  />
                  {error.email && (
                    <p className="text-sm mt-3 text-red-500">{error.email}</p>
                  )}
                </div>
                <div className="mb-6 text-center">
                  {loading ? (
                    <Loader />
                  ) : (
                    <button
                      className="w-full px-4 py-2 font-bold text-white bg-red-500 rounded-full hover:bg-red-700 focus:outline-none focus:shadow-outline"
                      type="submit"
                    >
                      Reset Password
                    </button>
                  )}
                </div>
                <hr className="mb-6 border-t" />
                <div className="text-center">
                  <Link
                    to="/register"
                    className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
                    href="./register.html"
                  >
                    Create an Account!
                  </Link>
                </div>
                <div className="text-center">
                  <Link
                    to="/login"
                    className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
                    href="./index.html"
                  >
                    Already have an account? Login!
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
