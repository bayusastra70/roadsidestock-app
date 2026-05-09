"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function BottomNav() {
  const pathname = usePathname();

  const navs = [
    { name: "Beranda", href: "/", icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
    )},
    { name: "Laporan", href: "/laporan", icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="20" x2="12" y2="10"/><line x1="18" y1="20" x2="18" y2="4"/><line x1="6" y1="20" x2="6" y2="16"/></svg>
    )},
  ];

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-md bg-white/80 backdrop-blur-xl border border-gray-100 rounded-[35px] shadow-2xl p-2 z-50 flex justify-around items-center">
      {navs.map((nav) => {
        const isActive = pathname === nav.href;
        return (
          <Link 
            key={nav.href} 
            href={nav.href} 
            className={`flex flex-col items-center gap-1 px-8 py-3 rounded-[25px] transition-all ${isActive ? "bg-blue-600 text-white shadow-lg shadow-blue-200" : "text-gray-400"}`}
          >
            {nav.icon}
            <span className="text-[10px] font-black uppercase tracking-tighter">{nav.name}</span>
          </Link>
        );
      })}
    </div>
  );
}