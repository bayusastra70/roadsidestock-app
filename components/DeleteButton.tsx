"use client";

import { hapusBarangAksi } from "@/app/actions/delete-product";

export default function DeleteButton({ id }: { id: string }) {
  const handleStoreDelete = async () => {
    const confirmDelete = confirm("Bli yakin ingin menghapus barang ini? Data tidak bisa dikembalikan.");
    
    if (confirmDelete) {
      await hapusBarangAksi(id);
    }
  };

  return (
    <button 
      onClick={handleStoreDelete}
      className="p-3 bg-red-50 text-red-500 rounded-2xl hover:bg-red-500 hover:text-white transition-all active:scale-90"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/>
      </svg>
    </button>
  );
}