import { Mail, Phone, MapPin } from "lucide-react";
export default function FooterContact() {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
      <ul className="space-y-2">
        <li className="flex items-center">
          <Mail className="h-5 w-5 mr-2" />
          info@educonnect.com
        </li>
        <li className="flex items-center">
          <Phone className="h-5 w-5 mr-2" />
          (+977) 9840000000
        </li>
        <li className="flex items-center">
          <MapPin className="h-5 w-5 mr-2" />
          Pokhara,Nepal
        </li>
      </ul>
    </div>
  );
}
