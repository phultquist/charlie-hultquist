import NavBar from "../components/NavBar";

export default function () {
  return (
    <div>
      <NavBar />
      <div className="max-w-screen-lg mx-auto p-4">
        <div className="flex flex-row justify-start py-10 space-x-8">
          <div>
            <h1 className="text-3xl font-bold">404</h1>

            <p>Sorry, the page you are looking for does not exist.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
