import { Mail, Phone, MapPin } from "lucide-react";

export default function FooterContact() {
  return (
    <div>
      <h3 className="mb-5 text-lg font-semibold text-white">Contact</h3>

      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <Mail className="h-5 w-5 text-violet-400" />
          <span>support@rentsathinepal.com</span>
        </div>

        <div className="flex items-center gap-3">
          <Phone className="h-5 w-5 text-violet-400" />
          <span>+977-9825748325</span>
        </div>

        <div className="flex items-center gap-3">
          <MapPin className="h-5 w-5 text-violet-400" />
          <span>Kathmandu, Nepal</span>
        </div>
      </div>
    </div>
  );
}
