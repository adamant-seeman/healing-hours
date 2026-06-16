import { FaWhatsapp } from "react-icons/fa";

const message = "Hi, I would like to know more about The Healing Hour.";
const whatsappUrl = `https://wa.me/919910857707?text=${encodeURIComponent(message)}`;

export default function WhatsAppButton() {
  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with The Healing Hour on WhatsApp"
      className="focus-ring fixed bottom-5 right-5 z-[60] grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-[0_14px_34px_rgba(37,211,102,0.34)] transition duration-200 hover:scale-105 hover:shadow-[0_18px_46px_rgba(37,211,102,0.44)] sm:bottom-7 sm:right-7 sm:h-16 sm:w-16"
    >
      <FaWhatsapp className="h-8 w-8 sm:h-9 sm:w-9" aria-hidden="true" />
    </a>
  );
}
