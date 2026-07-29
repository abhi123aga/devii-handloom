"use client";

import React from "react";

export default function WhatsAppButton() {
  const whatsappNumber = "919380735763";
  const customMessage = "Hi Devii Handlooms! I am visiting your website and would love to explore your beautiful saree collections and discuss custom orders.";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(customMessage)}`;

  return (
    <div className="fixed bottom-6 right-6 z-50 group">
      {/* Glow pulse animation behind button */}
      <span className="absolute -inset-1.5 rounded-full bg-emerald-500/20 group-hover:bg-emerald-500/40 animate-ping opacity-75 transition-all duration-500 pointer-events-none" />
      
      {/* Desktop Tooltip */}
      <div className="absolute right-16 bottom-2.5 bg-obsidian-950 border border-gold-600/30 text-gold-300 text-[10px] tracking-widest uppercase font-bold px-4 py-2 rounded-sm whitespace-nowrap opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 ease-out shadow-[0_8px_30px_rgba(0,0,0,0.4)] hidden md:block">
        Chat with Designer Team
      </div>

      {/* Floating Action Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="relative h-14 w-14 bg-emerald-500 hover:bg-emerald-400 border border-emerald-400/20 text-white rounded-full flex items-center justify-center shadow-[0_8px_30px_rgba(16,185,129,0.3)] hover:shadow-[0_8px_35px_rgba(16,185,129,0.5)] transform hover:-translate-y-1 active:translate-y-0 transition-all duration-300 cursor-pointer"
        aria-label="Contact us on WhatsApp"
      >
        <svg
          viewBox="0 0 24 24"
          className="h-7 w-7 fill-current"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.717-1.458L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.968C16.688 2.002 14.218.97 11.637.97 6.204.97 1.782 5.34 1.779 10.77c-.001 1.67.439 3.3 1.272 4.757l-.997 3.642 3.734-.975zm11.367-7.443c-.345-.172-2.039-1.002-2.35-1.113-.312-.113-.538-.17-.765.172-.227.34-.878 1.114-1.077 1.342-.199.228-.399.256-.743.084-.345-.172-1.457-.537-2.775-1.709-1.025-.912-1.717-2.04-1.917-2.384-.2-.344-.021-.53.151-.702.155-.154.345-.401.517-.6.172-.2.23-.343.345-.571.115-.23.057-.429-.028-.6-.086-.172-.765-1.838-1.047-2.527-.278-.669-.56-.578-.765-.589-.199-.011-.427-.013-.655-.013-.227 0-.598.085-.911.428-.313.344-1.196 1.171-1.196 2.858 0 1.687 1.229 3.32 1.4 3.55.172.229 2.42 3.69 5.861 5.172.818.353 1.458.563 1.956.721.823.261 1.57.224 2.162.137.66-.097 2.038-.832 2.324-1.638.286-.804.286-1.493.201-1.638-.085-.145-.312-.23-.656-.402z" />
        </svg>
      </a>
    </div>
  );
}
