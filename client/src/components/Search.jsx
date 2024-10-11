import axios from "axios";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";

export default function Search({ onChangeSearch, currentSearch }) {
  const [search, setSearch] = useState(currentSearch || "");

  useEffect(() => {
    sendData();
  }, []);

  const sendData = async (event) => {
    if (event) {
      event.preventDefault(); // Só previne o comportamento padrão se o evento estiver definido
    }
    try {
      const response = await axios.get(
        `http://localhost:3000/api/v1/post?search=${search}`
      );
      console.log("Resultado da busca: ", response.data.post);
      onChangeSearch(response.data.post);
    } catch (error) {
      console.error("Error: ", error.response.data.error);
    }
  };

  const handleData = (event) => {
    setSearch(event.target.value);
    onChangeSearch(event.target.value);
  };

  return (
    <form
      className="flex items-center"
      onSubmit={(event) => {
        event.preventDefault();
        sendData();
      }}
    >
      <input
        className="px-3 py-1 outline-none border border-zinc-200 font-medium"
        type="search"
        name="search"
        value={search}
        placeholder="Search Posts"
        onChange={handleData}
      />
      <input
        className="px-3 py-1 bg-black text-zinc-100 font-medium hover:cursor-pointer"
        type="submit"
        value="Search"
      />
    </form>
  );
}
Search.propTypes = {
  onChangeSearch: PropTypes.func,
  currentSearch: PropTypes.string,
};
