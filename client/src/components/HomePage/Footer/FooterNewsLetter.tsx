export default function FooterNewsLetter() {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
      <p className="text-sm mb-4">
        Stay updated with our latest news, articles and resources.
      </p>
      <form action="#" className="space-y-2">
        <input
          type="email"
          placeholder="Enter Your Email"
          className="w-full mb-3 px-3 py-2 bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-500 mt-5"
        >
          Subscribe
        </button>
      </form>
    </div>
  );
}
