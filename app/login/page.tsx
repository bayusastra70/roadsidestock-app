"use client";

import { loginAksi } from "../actions/auth-actions";
import Link from "next/link";
import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

export default function LoginPage() {
  // Gunakan loginAksi yang sudah diperbaiki
  const [state, formAction, isPending] = useActionState(loginAksi, null);
  const router = useRouter();

  useEffect(() => {
    // Jika ada error dari server
    if (state?.error) {
      Swal.fire({
        icon: "error",
        title: "Waduh Bli!",
        text: state.error,
        confirmButtonColor: "#2563eb",
      });
    }
    // Jika sukses
    if (state?.success) {
      router.push("/");
      router.refresh();
    }
  }, [state, router]);

  return (
    <div className="min-h-screen bg-white p-8 flex flex-col justify-center font-sans text-black">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-black text-blue-600 italic tracking-tighter">Roadside Stock</h1>
        <p className="text-gray-400 font-bold text-xs uppercase tracking-widest mt-2">Masuk ke Warung Bli</p>
      </div>

      <form action={formAction} className="space-y-5 max-w-md mx-auto w-full">
        <div className="space-y-1">
          <label className="text-[10px] font-black uppercase text-gray-400 ml-4">Email Address</label>
          <input 
            name="email" type="email" required 
            placeholder="bli@warung.com" 
            className="w-full p-4 bg-gray-50 border border-gray-100 rounded-[25px] outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all font-bold text-sm" 
          />
        </div>

        <div className="space-y-1">
          <label className="text-[10px] font-black uppercase text-gray-400 ml-4">Password</label>
          <input 
            name="password" type="password" required 
            placeholder="••••••••" 
            className="w-full p-4 bg-gray-50 border border-gray-100 rounded-[25px] outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all font-bold text-sm" 
          />
        </div>

        <button 
          disabled={isPending}
          type="submit" 
          className="w-full bg-blue-600 text-white p-5 rounded-[25px] font-black shadow-xl shadow-blue-100 active:scale-95 disabled:bg-gray-300 transition-all mt-4"
        >
          {isPending ? "MENGECEK..." : "MASUK SEKARANG"}
        </button>

        <p className="text-center text-[11px] font-bold text-gray-400 mt-6">
          Belum punya akun? <Link href="/register" className="text-blue-600 underline">Daftar Warung</Link>
        </p>
      </form>
    </div>
  );
}