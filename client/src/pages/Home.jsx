//import axios from "axios";
import { useState } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import Search from "../components/Search";

export default function Home() {
  const [post, setPost] = useState([]);
  console.log("Post: ", post);
  /*useEffect(() => {
    handleDataPost();
  }, []);

  const handleDataPost = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/v1/post/list"
      );
      console.log(response.data);
      setPost(response.data.post);
    } catch (error) {
      console.error("Error:", error.response.data.error);
    }
  };*/

  const handleSearchResults = (searchResults) => {
    console.log("Veio: ", searchResults);
    setPost(searchResults); // Atualiza o estado dos posts com o resultado da busca
  };

  return (
    <HelmetProvider>
      <Helmet>
        <title>Home</title>
        <meta name="description" content="Page Home" />
      </Helmet>
      <main>
        <section>
          <div className="p-2 flex flex-col gap-2">
            <div className="">
              <Search
                onChangeSearch={handleSearchResults} // Passa a função para atualizar o estado
                currentSearch=""
              />
            </div>
            <div className="md:columns-5 columns-1 gap-1 ">
              {Array.isArray(post) && post.length > 0 ? (
                post.map((item, index) => (
                  <div
                    className="p-3 rounded-md border border-zinc-100 flex flex-col gap-1.5 break-inside-avoid mb-1"
                    key={index}
                  >
                    <div className="flex justify-between items-center w-full">
                      <span className="text-sm font-light text-zinc-800">
                        Criado por: {item.author}
                      </span>
                      <span className="text-sm font-light text-zinc-800">
                        Postado:
                        {item.createdAt
                          ? new Date(item.createdAt).toLocaleDateString("pt-BR")
                          : "Não informado"}
                      </span>
                    </div>
                    <h2
                      className="text-2xl font-bold leading-6 line-clamp-2"
                      title={item.title}
                    >
                      {item.title}
                    </h2>
                    <p
                      className="text-sm text-zinc-700 font-light line-clamp-4"
                      title={item.details}
                    >
                      {item.details}
                    </p>
                  </div>
                ))
              ) : (
                <span>Nenhum post Encontrado</span>
              )}
            </div>
          </div>
        </section>
      </main>
    </HelmetProvider>
  );
}
