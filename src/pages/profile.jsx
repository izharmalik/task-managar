import axios from "axios";
import { useEffect, useState } from "react";
import { useAppContext } from "../Store/store";
import naruto from "../Assets/Naruto.jpg";
import { toast } from "react-hot-toast";

export const ProfilePage = () => {
  const { authContext, setAuthContext, userUpdated, setUserUpdated } =
    useAppContext();
  const [file, setFile] = useState();
  const [image, setImage] = useState();

  const [form, setForm] = useState({
    name: "",
    email: "",
    gender: "",
    oldPassword: "",
    newPassword: "",
    avatar: "",
  });

  useEffect(() => {
    axios
      .post(`${process.env.REACT_APP_URL}/app/dashboard/user`, {
        userId: authContext.userId,
        token: authContext.token,
      })
      .then((res) => {
        setForm(res?.data);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleImageChange = (e) => {
    setFile(URL.createObjectURL(e.target.files[0]));
    setImage(e.target.files[0]);
  };

  function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append("userId", authContext?.userId);
    formData.append("token", authContext?.token);
    formData.append("name", form?.name);
    formData.append("email", form?.email);
    formData.append("oldPassword", form?.oldPassword);
    formData.append("newPassword", form?.newPassword);
    formData.append("gender", form?.gender);
    formData.append("avatar", image);

    axios
      .post(`${process.env.REACT_APP_URL}/app/dashboard/edit-user`, formData)
      .then((res) => {
        setForm(res?.data);
        setUserUpdated({
          ...res?.data,
        });
        localStorage.setItem(
          "userAuth",
          JSON.stringify({
            ...res.data,
          })
        );
        toast.success(res?.data?.message);
      });
  }

  console.log(userUpdated, ">>>>>>>>>");
  return (
    <>
      <div className="h-full">
        <form onSubmit={handleSubmit}>
          <div className="border-b-2 block md:flex">
            <div className="w-full md:w-2/5 p-4 sm:p-6 lg:p-8 bg-white shadow-md">
              <div className="w-full p-8 mx-2 flex justify-center">
                <label
                  htmlFor="UploadPicture"
                  className="absolute  rounded-full text-center   border shadow-lg text-sm  active:shadow-lg transition duration-300 ease-in-out   cursor-pointer font-medium bg-white"
                >
                  <div className="bg-white w-96  relative b-10">
                    <img
                      src={form.avatar.url ? form.avatar.url : naruto}
                      className="h-96 w-full rounded-full"
                    />
                  </div>
                  <input
                    type="file"
                    id="UploadPicture"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                </label>
              </div>
            </div>

            <div className="w-full md:w-3/5 p-8 bg-white lg:ml-4 shadow-md">
              <div className="rounded  shadow p-6">
                <div className="pb-6">
                  <label
                    htmlFor="name"
                    className="font-semibold text-gray-700 block pb-1"
                  >
                    Name
                  </label>
                  <div className="flex">
                    <input
                      id="name"
                      className="border-1  rounded-r px-4 py-2 w-full"
                      name="name"
                      type="text"
                      value={form?.name}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="pb-4">
                  <label
                    htmlFor="email"
                    className="font-semibold text-gray-700 block pb-1"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    className="border-1  rounded-r px-4 py-2 w-full"
                    type="text"
                    name="email"
                    value={form?.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="pb-4">
                  <label
                    htmlFor="old-password"
                    className="font-semibold text-gray-700 block pb-1"
                  >
                    Old Password
                  </label>
                  <input
                    id="old-password"
                    className="border-1  rounded-r px-4 py-2 w-full"
                    type="text"
                    name="oldPassword"
                    value={form?.oldPassword}
                    onChange={handleChange}
                  />
                </div>
                <div className="pb-4">
                  <label
                    htmlFor="newPassword"
                    className="font-semibold text-gray-700 block pb-1"
                  >
                    New Password
                  </label>
                  <input
                    id="new-password"
                    className="border-1  rounded-r px-4 py-2 w-full"
                    type="text"
                    name="newPassword"
                    value={form?.newPassword}
                    onChange={handleChange}
                  />
                </div>
                <div className="pb-4">
                  <label
                    htmlFor="gender"
                    className="font-semibold text-gray-700 block pb-1"
                  >
                    Gender
                  </label>
                  <input
                    id="gender"
                    className="border-1  rounded-r px-4 py-2 w-full"
                    type="text"
                    name="gender"
                    value={form?.gender}
                    onChange={handleChange}
                  />
                </div>
                <button
                  type="submit"
                  className="border-2 px-4 py-2 rounded-full bg-blue-500 text-white font-semibold  hover:bg-blue-800"
                >
                  Edit profile
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};
