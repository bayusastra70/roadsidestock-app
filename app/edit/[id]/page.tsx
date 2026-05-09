// Simpan di: app/edit/[id]/page.tsx
import prisma from "@/lib/prisma";
import { editBarangAksi } from "@/app/actions/product-actions";
import Link from "next/link";

export default async function EditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = await prisma.product.findUnique({ where: { id } });
  const categories = ["Sembako", "Minuman", "Makanan", "Rokok", "Alat Mandi", "Lainnya"];

  if (!product) return <div className="p-10 text-center">Barang Hilang!</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-6 text-black">
      <div className="max-w-md mx-auto">
        <h1 className="text-xl font-black mb-8">Edit: {product.name}</h1>
        <form action={editBarangAksi} className="space-y-5">
          <input type="hidden" name="id" value={product.id} />
          
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-gray-400 uppercase ml-4">Nama Produk</label>
            <input name="name" defaultValue={product.name} className="w-full p-5 bg-white rounded-[25px] border border-gray-100 font-bold" />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold text-gray-400 uppercase ml-4">Kategori</label>
            <select name="category" defaultValue={product.category} className="w-full p-5 bg-white rounded-[25px] border border-gray-100 font-bold appearance-none">
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <input name="stock" type="number" defaultValue={product.stock} className="w-full p-5 bg-white rounded-[25px] border border-gray-100 font-bold text-center" />
            <input name="priceSell" type="number" defaultValue={product.priceSell} className="w-full p-5 bg-white rounded-[25px] border border-gray-100 font-bold text-center" />
          </div>

          <button type="submit" className="w-full py-5 bg-blue-600 text-white rounded-[25px] font-extrabold shadow-xl shadow-blue-100">Update Data</button>
        </form>
      </div>
    </div>
  );
}