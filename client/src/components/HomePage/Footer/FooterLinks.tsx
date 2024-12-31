import { Link } from "react-router-dom";

export default function FooterLink() {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
      <ul className="space-y-2">
        <li>
          <Link to="/features" className="hover:text-white">
            Features
          </Link>
        </li>
        <li>
          <Link to="/about" className="hover:text-white">
            About
          </Link>
        </li>
        <li>
          <Link to="/contact" className="hover:text-white">
            Contact
          </Link>
        </li>
        <li>
          <Link to="/login" className="hover:text-white">
            Login
          </Link>
        </li>
      </ul>
    </div>
  );
}
