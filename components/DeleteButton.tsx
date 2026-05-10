"use client";

import { useState } from "react";
import { hapusBarangAksi } from "@/app/actions/delete-product";

export default function DeleteButton({ id, namaBarang }: { id: string; namaBarang: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault(); // Mencegah bubbling di iOS
    setIsDeleting(true);
    try {
      await hapusBarangAksi(id);
      setIsOpen(false);
    } catch (error) {
      alert("Gagal menghapus barang, coba lagi nggih!");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <button 
        type="button"
        onClick={() => setIsOpen(true)}
        className="p-3 bg-red-50 text-red-500 rounded-2xl active:bg-red-500 active:text-white transition-all cursor-pointer"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/>
        </svg>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-6">
          {/* Backdrop - iOS butuh opacity yang jelas */}
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm" 
            onClick={() => !isDeleting && setIsOpen(false)}
          ></div>
          
          <div className="relative bg-white w-full max-w-xs rounded-[35px] p-8 shadow-2xl text-center transform transition-all scale-100">
            <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
            </div>

            <h3 className="text-xl font-black text-gray-800 mb-2">Hapus Barang?</h3>
            <p className="text-gray-500 text-xs mb-8 leading-relaxed">
              Bli yakin ingin menghapus <span className="font-bold text-red-600 italic">"{namaBarang}"</span>?
            </p>

            <div className="flex flex-col gap-3">
              <button 
                type="button"
                onClick={handleDelete}
                disabled={isDeleting}
                className="w-full py-4 bg-red-500 text-white rounded-2xl font-black shadow-lg shadow-red-100 active:scale-95 disabled:opacity-50"
              >
                {isDeleting ? "SABAR..." : "YA, HAPUS!"}
              </button>
              <button 
                type="button"
                onClick={() => setIsOpen(false)}
                disabled={isDeleting}
                className="w-full py-4 bg-gray-100 text-gray-500 rounded-2xl font-black active:scale-95"
              >
                BATAL
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}