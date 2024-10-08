import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-zinc-200">
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
          </ol>
        </div>
      </div>
    </header>
  );
}
