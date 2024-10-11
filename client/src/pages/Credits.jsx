import { Helmet, HelmetProvider } from "react-helmet-async";

export default function Credits() {
  return (
    <HelmetProvider>
      <Helmet>
        <title>Credits</title>
        <meta name="description" content="Page Credits" />
      </Helmet>
      <main className="flex flex-grow justify-center items-center">
        <section>
          <div className="flex justify-center items-center">
            <div className="p-3 flex flex-col gap-2 rounded-md border border-zinc-200">
              <h2 className="text-xl font-semibold">Add Credits</h2>
              <form className="flex flex-col gap-2">
                <label className="flex flex-col gap-1.5">
                  <span className="font-semibold">R$ 00,00</span>
                  <input type="range" name="" id="" />
                </label>
                <input
                  className="px-3 py-1 bg-black text-zinc-100 font-bold rounded-md hover:cursor-pointer"
                  type="submit"
                  value="Add"
                />
              </form>
            </div>
          </div>
        </section>
      </main>
    </HelmetProvider>
  );
}
