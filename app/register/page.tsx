"use client";

import { registerAksi } from "../actions/auth-actions";
import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

export default function RegisterPage() {
  // Gunakan useActionState untuk menangkap state dari server
  const [state, formAction, isPending] = useActionState(registerAksi, null);
  const router = useRouter();

  useEffect(() => {
    if (state?.error) {
      Swal.fire({
        icon: "error",
        title: "Gagal Daftar",
        text: state.error,
        confirmButtonColor: "#2563eb"
      });
    }
    if (state?.success) {
      Swal.fire({
        icon: "success",
        title: "Mantap Bli!",
        text: "Warung sudah terdaftar, siap jualan!",
        timer: 2000,
        showConfirmButton: false
      }).then(() => {
        router.push("/");
        router.refresh();
      });
    }
  }, [state, router]);

  return (
    <div className="min-h-screen bg-white p-8 flex flex-col justify-center font-sans text-black">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-black text-blue-600 italic tracking-tighter">Roadside Stock</h1>
        <p className="text-gray-400 font-bold text-[10px] uppercase tracking-widest">Daftar Akun Pedagang</p>
      </div>

      <form action={formAction} className="space-y-4 max-w-md mx-auto w-full">
        <div className="space-y-1">
          <label className="text-[10px] font-black uppercase text-gray-400 ml-4">Nama Pemilik</label>
          <input name="nama" type="text" required placeholder="Bli Made" className="w-full p-4 bg-gray-50 border border-gray-100 rounded-[22px] outline-none focus:border-blue-600 transition-all font-bold text-sm" />
        </div>

        <div className="space-y-1">
          <label className="text-[10px] font-black uppercase text-gray-400 ml-4">Nama Warung</label>
          <input name="namaWarung" type="text" required placeholder="Warung Berkah" className="w-full p-4 bg-gray-50 border border-gray-100 rounded-[22px] outline-none focus:border-blue-600 transition-all font-bold text-sm" />
        </div>

        <div className="space-y-1">
          <label className="text-[10px] font-black uppercase text-gray-400 ml-4">Email</label>
          <input name="email" type="email" required placeholder="email@toko.com" className="w-full p-4 bg-gray-50 border border-gray-100 rounded-[22px] outline-none focus:border-blue-600 transition-all font-bold text-sm" />
        </div>

        <div className="space-y-1">
          <label className="text-[10px] font-black uppercase text-gray-400 ml-4">Password</label>
          <input name="password" type="password" required placeholder="••••••••" className="w-full p-4 bg-gray-50 border border-gray-100 rounded-[22px] outline-none focus:border-blue-600 transition-all font-bold text-sm" />
        </div>

        <button 
          disabled={isPending}
          type="submit" 
          className="w-full bg-blue-600 text-white p-5 rounded-[25px] font-black shadow-xl shadow-blue-100 active:scale-95 disabled:bg-gray-300 transition-all mt-4"
        >
          {isPending ? "MEMBUAT AKUN..." : "BUAT AKUN SEKARANG"}
        </button>
      </form>
    </div>
  );
}