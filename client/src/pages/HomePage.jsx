import { useState } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Link } from "react-router-dom";
export default function HomePage() {
  const [categorieSelected, setCategorieSelected] = useState("Todos");
  const categories = [
    "Website",
    "Mobile",
    "Ux/Ui",
    "Copyright",
    "Seo",
    "Gestão de Projeto",
    "Arquitetura de Projetos",
    "Automação",
    "Tradução",
    "Edição de Vídeo",
    "Edição de Fotos",
    "Contabilidade",
    "Gerenciamento de Projetos",
  ];

  return (
    <HelmetProvider>
      <Helmet>
        <title>Home Page</title>
        <meta name="description" content="Home Page" />
      </Helmet>
      <main>
        <section>
          <div className="flex justify-center items-center flex-col gap-2 p-5">
            <div className="flex flex-col justify-end gap-3 h-[600px] w-full rounded-lg p-5 bg-[url('https://images.pexels.com/photos/273209/pexels-photo-273209.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')] bg-repeat bg-cover bg-top bg-fixed">
              <div className="bg-black/60 backdrop-blur-md p-3 rounded-lg w-[700px] h-auto flex flex-col gap-2">
                <h1 className="text-4xl leading-10 font-bold text-pretty  text-white">
                  Ganhe Experiência participando de projetos reais e trabalhando
                  em diversos grupos
                </h1>
                <p className="font-light text-lg leading-5 text-pretty text-zinc-300">
                  Toda pessoa que está querendo começar em uma área ou trabalhar
                  em determinada empresa está perdendo a vaga por falta de
                  experiência em trabalhar em projetos reais ou em grupo, então
                  essa plataforma foi feita para solucionar esse problema porque
                  ela faz você entrar em projetos reais se relacionando com
                  diversas pessoas e criando networks que vão te ajudar ao
                  decorrer da sua carreira, porque nada contrata mais no mundo
                  que a indicação de quem já te conhece ou quem já trabalha com
                  você e sabe das suas capacidades de trabalhar em grupo, porque
                  é isso que a empresa espera na hora de contratar um
                  funcionário, se ele sabe desempenhar aquela tarefa e se
                  trabalha bem com outras pessoas.
                </p>
              </div>
              <div className="flex justify-start items-center">
                <Link
                  className="px-3 py-1 bg-black text-zinc-100 font-medium text-lg rounded-md hover:cursor-pointer"
                  to="/#"
                >
                  Criar conta Gratuitamente
                </Link>
              </div>
            </div>
          </div>
        </section>
        <section>
          <div className="flex justify-end w-full px-5">
            <div className="flex items-center gap-2">
              <input
                className="px-3 py-1 rounded-sm border border-zinc-200 font-medium outline-none"
                type="search"
                name=""
                id=""
                placeholder="Search"
              />
              <select
                className="outline-none border border-zinc-200 rounded-sm bg-white px-3 py-1"
                name=""
                id=""
              >
                <option value="">Destaque</option>
                <option value="">Novidades</option>
                <option value="">Popular</option>
              </select>
            </div>
          </div>
        </section>
        <section>
          <div className="flex flex-grow gap-2 px-5 pb-5 pt-2">
            <div className="flex flex-col gap-2 flex-shrink-0 w-[300px]">
              <ol className="flex flex-col gap-2">
                <li
                  className={`${
                    categorieSelected === "Todos"
                      ? "bg-black text-zinc-100 border border-black"
                      : "bg-white border border-zinc-200 "
                  } px-3 py-1 rounded-md truncate hover:cursor-pointer`}
                  title="Todos"
                  onClick={() => setCategorieSelected("Todos")}
                >
                  Todos
                </li>
                {categories.map((item, index) => (
                  <li
                    key={index}
                    className={`${
                      categorieSelected === item
                        ? "bg-black text-zinc-100 border border-black"
                        : "bg-white border border-zinc-200 "
                    } px-3 py-1 rounded-md truncate hover:cursor-pointer`}
                    title={item}
                    onClick={() => setCategorieSelected(item)}
                  >
                    {item}
                  </li>
                ))}
              </ol>
            </div>
            <div className="grid grid-cols-4 flex-wrap gap-2 w-full">
              {Array.from({ length: 40 }).map((_, index) => (
                <div
                  key={index}
                  className="p-2 rounded-md border border-zinc-200 h-[200px]"
                ></div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </HelmetProvider>
  );
}
