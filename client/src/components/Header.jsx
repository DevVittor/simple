import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
export default function Header() {
  const [logado, setLogado] = useState(false);
  const [limit, setLimit] = useState(0);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setLogado(true);
      const decode = jwtDecode(token);
      setUserId(decode._id);
      userLimit();
    } else {
      setLogado(false);
    }
  }, []);

  const userLimit = async () => {
    try {
      if (userId) {
        const response = await axios.get(
          `http://localhost:3000/api/v1/user/details?userId=${userId}`
        );
        console.log(response.data.user);
        setLimit(response.data.user);
      }
    } catch (error) {
      console.error("Error: ", error.response.data.error);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-zinc-100">
      <div className="flex md:justify-between justify-center items-center md:flex-row flex-col gap-1 flex-wrap md:px-5 md:py-1 p-2">
        <div className="">
          <Link to="/">
            <h1 className="text-4xl font-bold">Simple</h1>
          </Link>
        </div>
        <div className="">
          <ol className="flex items-center gap-1.5">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            {!logado ? (
              <>
                <li>
                  <Link to="/login">Login</Link>
                </li>
                <li>
                  <Link to="/register">Register</Link>
                </li>
              </>
            ) : (
              <li>
                <Link
                  className="px-3 py-1 rounded-full border border-zinc-200"
                  to={`${limit > 0 ? "/post" : "/credits"}`}
                >
                  Create Post | {`${limit > 0 ? limit : 0}`}
                </Link>
              </li>
            )}
          </ol>
        </div>
      </div>
    </header>
  );
}
