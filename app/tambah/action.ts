"use server"; // Menandakan ini kode rahasia server

import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function tambahAksi(formData: FormData) {
  const nama = formData.get("nama") as string;
  const harga = Number(formData.get("harga"));
  const stokAwal = Number(formData.get("stok")) || 0;

  let warung = await prisma.warung.findFirst();

  if (!warung) {
    const userBaru = await prisma.user.create({
      data: {
        nama: "Owner Roadside",
        email: `owner-${Date.now()}@roadsidestock.com`,
        password: "password123",
        warung: { create: { nama: "Warung Utama UMKM", alamat: "Tabanan, Bali" } }
      },
      include: { warung: true }
    });
    warung = userBaru.warung!;
  }

  await prisma.product.create({
    data: {
      name: nama,
      stock: stokAwal,
      minStock: 2,
      priceBuy: harga * 0.8,
      priceSell: harga,
      warungId: warung.id,
    }
  });

  revalidatePath("/");
  redirect("/");
}