"use client";

import { useState } from "react";
import { hapusBarangAksi } from "@/app/actions/delete-product";

export default function DeleteButton({ id, namaBarang }: { id: string; namaBarang: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation(); // Stop iOS dari klik elemen di bawahnya
    setIsDeleting(true);
    try {
      await hapusBarangAksi(id);
      setIsOpen(false);
    } catch (error) {
      alert("Gagal menghapus nggih!");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <button 
        type="button"
        // Gunakan onClick tapi pastikan styling pointer ada
        onClick={(e) => {
           e.preventDefault();
           setIsOpen(true);
        }}
        className="relative z-0 p-3 bg-red-50 text-red-500 rounded-2xl active:bg-red-500 active:text-white transition-all cursor-pointer touch-manipulation"
        style={{ WebkitTapHighlightColor: 'transparent' }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="pointer-events-none">
          <path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/>
        </svg>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-6 outline-none">
          {/* Overlay - Pakai onClick langsung */}
          <div 
            className="fixed inset-0 bg-black/70 backdrop-blur-md" 
            onClick={() => !isDeleting && setIsOpen(false)}
          ></div>
          
          <div className="relative bg-white w-full max-w-xs rounded-[40px] p-8 shadow-2xl text-center transform transition-transform animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
            </div>

            <h3 className="text-xl font-black text-gray-800 mb-2 italic">Hapus, Bli?</h3>
            <p className="text-gray-500 text-xs mb-8 leading-relaxed font-bold">
               "{namaBarang}" akan diarsipkan dari daftar stok.
            </p>

            <div className="flex flex-col gap-3">
              <button 
                type="button"
                onClick={handleDelete}
                disabled={isDeleting}
                className="w-full py-4 bg-red-600 text-white rounded-2xl font-black shadow-lg shadow-red-200 active:scale-95 disabled:opacity-50 cursor-pointer"
              >
                {isDeleting ? "SABAR..." : "YA, HAPUS!"}
              </button>
              <button 
                type="button"
                onClick={() => setIsOpen(false)}
                disabled={isDeleting}
                className="w-full py-4 bg-gray-100 text-gray-500 rounded-2xl font-black active:scale-95 cursor-pointer"
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