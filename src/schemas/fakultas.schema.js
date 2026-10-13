import z from "zod";

export const storeFakultasSchema = z.object({
    name : z.string().trim().min(3, "Nama Fakultas wajib 3 karkter")
  
})
export const updateFakultasSchema = z.object({
    name : z.string().trim().min(3, "Nama Fakultas wajib 3 karkter")
})