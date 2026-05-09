"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";

export default function SearchInput({ defaultValue }: { defaultValue?: string }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function handleSearch(term: string) {
    const params = new URLSearchParams(window.location.search);
    if (term) {
      params.set("q", term);
    } else {
      params.delete("q");
    }

    startTransition(() => {
      // replace agar tidak memenuhi riwayat browser (back button)
      router.replace(`/?${params.toString()}`);
    });
  }

  return (
    <div className="relative group">
      {/* Icon Search */}
      <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-blue-500 transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
      </div>
      
      {/* Input Field */}
      <input
        type="text"
        placeholder="Cari barang..."
        defaultValue={defaultValue}
        onChange={(e) => handleSearch(e.target.value)}
        className="w-full pl-11 pr-10 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-100 focus:bg-white focus:border-blue-300 outline-none transition-all font-semibold text-xs shadow-inner"
      />

      {/* Loading Spinner */}
      {isPending && (
        <div className="absolute inset-y-0 right-4 flex items-center">
          <div className="w-3 h-3 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
}