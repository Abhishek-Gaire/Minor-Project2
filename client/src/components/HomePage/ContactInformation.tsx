import {Mail, MapPin, Phone} from "lucide-react";

const ContactInformation = () => {
    return(
        <div>
            <h2 className="text-2xl font-semibold mb-6">
                Contact Information
            </h2>
            <div className="space-y-6">
                <div className="flex items-start">
                    <Mail className="h-6 w-6 text-indigo-600 mr-4" />
                    <div>
                        <h3 className="font-medium">Email</h3>
                        <p className="text-gray-600">info@educonnect.com</p>
                    </div>
                </div>
                <div className="flex items-start">
                    <Phone className="h-6 w-6 text-indigo-600 mr-4" />
                    <div>
                        <h3 className="font-medium">Phone</h3>
                        <p className="text-gray-600">(+977) 98400000</p>
                    </div>
                </div>
                <div className="flex items-start">
                    <MapPin className="h-6 w-6 text-indigo-600 mr-4" />
                    <div>
                        <h3 className="font-medium">Address</h3>
                        <p className="text-gray-600">
                            Lamachaur
                            <br />
                            Pokhara, Gandaki
                            <br />
                            Nepal
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ContactInformation;