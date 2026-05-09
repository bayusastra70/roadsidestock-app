"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function tambahAksi(formData: FormData) {
  const name = formData.get("nama") as string;
  const priceSell = Number(formData.get("harga"));
  const stock = Number(formData.get("stok")) || 0;
  const category = formData.get("category") as string;

  let warung = await prisma.warung.findFirst();
  if (!warung) {
    const userDefault = await prisma.user.create({
      data: {
        nama: "Owner Roadside",
        email: `owner-${Date.now()}@roadsidestock.com`,
        password: "password123",
        warung: { create: { nama: "Warung Utama", alamat: "Tabanan" } }
      },
      include: { warung: true }
    });
    warung = userDefault.warung!;
  }

  await prisma.product.create({
    data: {
      name,
      stock,
      priceSell,
      priceBuy: priceSell * 0.8,
      category,
      warungId: warung.id,
    }
  });

  revalidatePath("/");
  redirect("/");
}

export async function editBarangAksi(formData: FormData) {
  const id = formData.get("id") as string;
  const name = formData.get("name") as string;
  const stock = parseInt(formData.get("stock") as string);
  const priceSell = parseInt(formData.get("priceSell") as string);
  const category = formData.get("category") as string;

  await prisma.product.update({
    where: { id },
    data: { name, stock, priceSell, category },
  });

  revalidatePath("/");
  redirect("/");
}

// FITUR BARU: JUAL CEPAT
export async function jualAksi(formData: FormData) {
  const productId = formData.get("productId") as string;
  const qty = Number(formData.get("qty"));

  const product = await prisma.product.findUnique({ where: { id: productId } });
  if (!product || product.stock < qty) return;

  await prisma.$transaction([
    prisma.product.update({
      where: { id: productId },
      data: { stock: { decrement: qty } }
    }),
    prisma.transaction.create({
      data: {
        productId,
        quantity: qty,
        totalPrice: product.priceSell * qty
      }
    })
  ]);

  revalidatePath("/");
}