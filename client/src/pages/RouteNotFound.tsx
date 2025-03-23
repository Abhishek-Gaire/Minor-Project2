import Layout from "../components/Layout.tsx";
// import { pageNotFoundImage } from "../../public/pageNotFound.webp";
const RouteNotFound = () => {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center bg-gray-100">
        <h1 className="text-6xl font-bold text-gray-800">404</h1>
        <p className="text-xl text-gray-600 mt-4">Page Not Found</p>
        <img
          src="/pageNotFound.webp"
          alt="Page Not Found"
          className="max-w-md mb-6 mt-6"
        />
      </div>
    </Layout>
  );
};

export default RouteNotFound;
