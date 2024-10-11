import { useState } from "react";
import { HelmetProvider, Helmet } from "react-helmet-async";
import axios from "axios";
export default function Register() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const sendData = async (event) => {
    console.log("FormData: ", formData);
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/user/register",
        formData,
        { withCredentials: true }
      );
      console.log("FormData: ", formData);
      console.log(response.data);
      const token = response.data.token;
      if (token) {
        localStorage.setItem("token", token);
        setTimeout(() => {
          window.location.href = "/";
        }, 3000);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleData = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <HelmetProvider>
      <Helmet>
        <title>Register</title>
        <meta name="description" content="Page Register" />
      </Helmet>
      <main className="flex flex-grow justify-center items-center">
        <section>
          <div className="flex justify-center items-center">
            <div className="p-3 border border-zinc-200 rounded-md flex flex-col gap-2">
              <h2 className="text-xl font-semibold">Register User</h2>
              <form className="flex flex-col gap-2" onSubmit={sendData}>
                <label className="flex flex-col gap-1.5">
                  <span className="font-medium">Email:</span>
                  <input
                    className="px-3 py-1 outline-none border border-zinc-200 rounded-sm font-medium"
                    type="email"
                    required
                    name="email"
                    value={formData.email}
                    placeholder="Email"
                    onChange={handleData}
                  />
                </label>
                <label className="flex flex-col gap-1.5">
                  <span className="font-medium">Password:</span>
                  <input
                    className="px-3 py-1 outline-none border border-zinc-200 rounded-sm font-medium"
                    type="password"
                    required
                    name="password"
                    value={formData.password}
                    placeholder="****"
                    onChange={handleData}
                  />
                </label>
                <input
                  className="px-3 py-1 rounded-sm bg-black text-zinc-100 font-bold hover:cursor-pointer"
                  type="submit"
                  value="Register"
                />
              </form>
            </div>
          </div>
        </section>
      </main>
    </HelmetProvider>
  );
}
