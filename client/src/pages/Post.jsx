import { HelmetProvider, Helmet } from "react-helmet-async";
import axios from "axios";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
export default function Post() {
  const [userId, setUserId] = useState("");
  const [formData, setFormData] = useState({
    author: "",
    title: "",
    details: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decode = jwtDecode(token);
      setUserId(decode._id);
    }
  }, [userId]);

  const sendData = async (event) => {
    event.preventDefault();
    try {
      if (userId) {
        const response = await axios.post(
          `http://localhost:3000/api/v1/post/create?userId=${userId}`,
          formData
        );
        console.log(response.data);
        setTimeout(() => {
          window.location.href = "/";
        }, 3000);
      }
    } catch (error) {
      console.error("Error: ", error.response.data.error);
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
        <title>Create Post</title>
        <meta name="description" content="Page Post" />
      </Helmet>
      <main className="flex flex-grow justify-center items-center">
        <section>
          <div className="flex justify-center items-center">
            <div className="p-3 border border-zinc-200 rounded-md flex flex-col gap-2">
              <h2 className="text-xl font-semibold">Create new Post</h2>
              <form className="flex flex-col gap-2" onSubmit={sendData}>
                <label className="flex flex-col gap-1.5">
                  <span className="font-medium">Author:</span>
                  <input
                    className="px-3 py-1 outline-none border border-zinc-200 rounded-sm font-medium"
                    type="text"
                    name="author"
                    required
                    value={formData.author}
                    placeholder="Author"
                    onChange={handleData}
                  />
                </label>
                <label className="flex flex-col gap-1.5">
                  <span className="font-medium">Title:</span>
                  <input
                    className="px-3 py-1 outline-none border border-zinc-200 rounded-sm font-medium"
                    type="text"
                    name="title"
                    required
                    value={formData.title}
                    placeholder="Title"
                    onChange={handleData}
                  />
                </label>
                <label className="flex flex-col gap-1.5">
                  <span className="font-medium">Details:</span>
                  <textarea
                    className="p-3 rounded-md outline-none bg-zinc-50 border border-zinc-200 font-medium resize-none"
                    name="details"
                    required
                    value={formData.details}
                    placeholder="More Details"
                    onChange={handleData}
                  ></textarea>
                </label>
                <input
                  className="px-3 py-1 bg-black text-zinc-100 font-bold text-xl rounded-md hover:cursor-pointer"
                  type="submit"
                  value="Create"
                />
              </form>
            </div>
          </div>
        </section>
      </main>
    </HelmetProvider>
  );
}
