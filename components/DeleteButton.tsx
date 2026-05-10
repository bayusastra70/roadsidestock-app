// components/DeleteButton.tsx
"use client";

import { useState } from "react";
import { hapusBarangAksi } from "@/app/actions/delete-product";

export default function DeleteButton({ id, namaBarang }: { id: string; namaBarang: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // iOS butuh fungsi yang dipicu secara eksplisit
  const toggleModal = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  const handleConfirm = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDeleting(true);
    try {
      await hapusBarangAksi(id);
      setIsOpen(false);
    } catch (err) {
      alert("Gagal hapus, Bli!");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="relative">
      <button 
        type="button"
        onClick={toggleModal}
        className="p-3 bg-red-50 text-red-500 rounded-2xl active:bg-red-500 active:text-white cursor-pointer touch-manipulation"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-6">
          {/* Backdrop gelap pekat agar Safari fokus */}
          <div className="fixed inset-0 bg-black/80 backdrop-blur-md" onClick={() => setIsOpen(false)} />
          
          <div className="relative bg-white w-full max-w-xs rounded-[35px] p-8 text-center shadow-2xl overflow-hidden">
            <h3 className="font-black text-lg mb-2">Hapus {namaBarang}?</h3>
            <div className="flex flex-col gap-3 mt-6">
              <button 
                onClick={handleConfirm}
                disabled={isDeleting}
                className="bg-red-500 text-white p-4 rounded-2xl font-black active:scale-95 disabled:opacity-50"
              >
                {isDeleting ? "PROSES..." : "YA, HAPUS"}
              </button>
              <button 
                onClick={() => setIsOpen(false)}
                className="bg-gray-100 text-gray-500 p-4 rounded-2xl font-black active:scale-95"
              >
                BATAL
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}