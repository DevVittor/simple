import { Helmet, HelmetProvider } from "react-helmet-async";

export default function About() {
  return (
    <HelmetProvider>
      <Helmet>
        <title>About</title>
        <meta name="description" content="Page About" />
      </Helmet>
      <main className="flex flex-grow justify-center items-center">
        <section>
          <div>
            <h1 className="text-4xl font-bold">About</h1>
          </div>
        </section>
      </main>
    </HelmetProvider>
  );
}
