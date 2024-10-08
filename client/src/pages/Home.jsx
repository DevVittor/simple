import axios from "axios";
import { useEffect, useState } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";

export default function Home() {
  const [post, setPost] = useState([]);
  console.log(post);
  useEffect(() => {
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
      console.error(error.message);
    }
  };

  return (
    <HelmetProvider>
      <Helmet>
        <title>Home</title>
        <meta name="description" content="Page Home" />
      </Helmet>
      <main>
        <section>
          <div className="flex flex-col gap-2 md:p-3 p-2">
            <div>
              <h1 className="text-4xl font-bold">List Posts</h1>
            </div>
            <div className="md:columns-5 columns-1 gap-1 ">
              {post ? (
                post.map((item, index) => (
                  <div
                    className="p-3 rounded-md border border-zinc-100 flex flex-col gap-1 break-inside-avoid mb-1"
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
                    <h2 className="text-2xl font-bold">{item.title}</h2>
                    <p className="text-sm text-zinc-700 font-light">
                      {item.details}
                    </p>
                  </div>
                ))
              ) : (
                <span>Nnehum post Encontrado</span>
              )}
            </div>
          </div>
        </section>
      </main>
    </HelmetProvider>
  );
}
