const AdminHeader: React.FC<{ toggleSidebar: () => void }> = ({
  toggleSidebar,
}) => {
  return (
    <header className="bg-white shadow p-4 flex justify-between items-center">
      <button onClick={toggleSidebar} className="md:hidden">
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16m-7 6h7"
          />
        </svg>
      </button>
      <h1 className="text-xl font-semibold">Admin Panel</h1>
      <div>{/* User profile or logout button here */}</div>
    </header>
  );
};

export default AdminHeader;
