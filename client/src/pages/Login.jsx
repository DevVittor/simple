import { useState } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import axios from "axios";
export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const sendData = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/user/login",
        formData,
        { withCredentials: true }
      );
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
        <title>Login</title>
        <meta name="description" content="Page Login" />
      </Helmet>
      <main className="flex flex-grow justify-center items-center">
        <section>
          <div className="flex justify-center items-center">
            <div className="p-3 border border-zinc-200 rounded-md flex flex-col gap-2">
              <h2 className="text-xl font-semibold">Login User</h2>
              <form onSubmit={sendData} className="flex flex-col gap-2">
                <label className="flex flex-col gap-1.5">
                  <span className="font-medium">Email:</span>
                  <input
                    className="px-3 py-1 rounded-sm border border-zinc-200 outline-none font-medium"
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    placeholder="Email"
                    onChange={handleData}
                  />
                </label>
                <label className="flex flex-col gap-1.5">
                  <span className="font-medium">Password:</span>
                  <input
                    className="px-3 py-1 rounded-sm border border-zinc-200 outline-none font-medium"
                    type="password"
                    name="password"
                    required
                    value={formData.password}
                    placeholder="******"
                    onChange={handleData}
                  />
                </label>
                <input
                  className="px-3 py-1 rounded-sm bg-black text-zinc-100 font-bold hover:cursor-pointer"
                  type="submit"
                  value="Login"
                />
              </form>
            </div>
          </div>
        </section>
      </main>
    </HelmetProvider>
  );
}
