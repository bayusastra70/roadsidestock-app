// app/login/page.tsx
import { loginAksi } from "../actions/auth-actions";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-white p-8 flex flex-col justify-center font-sans text-black">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-black text-blue-600 italic">Roadside Stock</h1>
        <p className="text-gray-400 font-bold text-sm uppercase">Masuk ke Warung Bli</p>
      </div>

      <form action={loginAksi} className="space-y-6">
        <div className="space-y-2">
          <label className="text-xs font-black uppercase text-gray-400 ml-2">Email</label>
          <input name="email" type="email" required placeholder="email@toko.com" className="w-full p-4 bg-gray-50 border border-gray-100 rounded-3xl outline-none focus:border-blue-600 transition-all text-sm font-bold" />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-black uppercase text-gray-400 ml-2">Password</label>
          <input name="password" type="password" required placeholder="••••••••" className="w-full p-4 bg-gray-50 border border-gray-100 rounded-3xl outline-none focus:border-blue-600 transition-all text-sm font-bold" />
        </div>

        <button type="submit" className="w-full bg-blue-600 text-white p-5 rounded-[30px] font-black shadow-xl shadow-blue-100 active:scale-95 transition-all">
          MASUK SEKARANG
        </button>

        <p className="text-center text-xs font-bold text-gray-400">
          Belum punya akun? <Link href="/register" className="text-blue-600 underline">Daftar Warung</Link>
        </p>
      </form>
    </div>
  );
}