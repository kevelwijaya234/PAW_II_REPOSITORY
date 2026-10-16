import z from "zod";

export const storeFakultasSchema = z.object({
  kode: z.string().trim().min(2, "Kode Fakultas minimal 2 karakter"),
  nama_fakultas: z.string().trim().min(3, "Nama Fakultas minimal 3 karakter"),
});

export const updateFakultasSchema = z.object({
  kode: z.string().trim().min(2, "Kode Fakultas minimal 2 karakter").optional(),
  nama_fakultas: z.string().trim().min(3, "Nama Fakultas minimal 3 karakter").optional(),
});