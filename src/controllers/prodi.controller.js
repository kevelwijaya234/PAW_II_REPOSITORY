import mongoose from "mongoose";
// Pastikan nama file ini sesuai dengan nama file fisik di folder models/
import FakultasModel from "../model/Fakultas.model.js"; // atau "../models/Fakultas.model.js"
import ProdiModel from "../model/Prodi.model.js";
import { StoreProdiSchema, UpdateProdiSchema } from "../schemas/prodi.schema.js";
import { apiResponse, apiResponseValidation } from "../utils/response.js";

class ProdiController {
  static async store(req, res) {
    const result = StoreProdiSchema.safeParse(req.body);

    if (!result.success) {
      return apiResponseValidation({ res, errors: result.error });
    }

    const { kode, nama_prodi, fakultas_id } = result.data;

    if (!mongoose.isValidObjectId(fakultas_id)) {
      return apiResponse({ res, status: 400, message: "ID Fakultas tidak valid", data: null });
    }

    const isExists = await FakultasModel.exists({ _id: fakultas_id });

    if (!isExists) {
      return apiResponse({ res, status: 404, message: "Fakultas tidak ada", data: null });
    }

    const newProdi = await ProdiModel.create({
      kode,
      nama_prodi,
      fakultas: fakultas_id,
    });

    return apiResponse({ res, status: 201, message: "Prodi berhasil dibuat", data: newProdi });
  }

  static async index(req, res) {
    const listProdi = await ProdiModel.find().populate("fakultas");

    return apiResponse({
      res,
      status: 200,
      message: "List prodi",
      data: listProdi,
    });
  }

  static async show(req, res) {
    const prodiId = req.params.id;

    if (!mongoose.isValidObjectId(prodiId)) {
      return apiResponse({ res, status: 400, message: "ID Prodi tidak valid", data: null });
    }

    const prodi = await ProdiModel.findById(prodiId).populate("fakultas");

    if (!prodi) {
      return apiResponse({ res, status: 404, message: "Prodi tidak ada", data: null });
    }

    return apiResponse({ res, status: 200, message: "Detail prodi", data: prodi });
  }

  static async update(req, res) {
    const prodiId = req.params.id;

    if (!mongoose.isValidObjectId(prodiId)) {
      return apiResponse({ res, status: 400, message: "ID Prodi tidak valid", data: null });
    }

    const result = UpdateProdiSchema.safeParse(req.body);

    if (!result.success) {
      return apiResponseValidation({ res, errors: result.error });
    }

    const prodi = await ProdiModel.findById(prodiId);
    if (!prodi) {
      return apiResponse({ res, status: 404, message: "Prodi tidak ada", data: null });
    }

    const { kode, nama_prodi, fakultas_id } = result.data;

    if (fakultas_id) {
      if (!mongoose.isValidObjectId(fakultas_id)) {
        return apiResponse({ res, status: 400, message: "ID Fakultas tidak valid", data: null });
      }

      const isExists = await FakultasModel.exists({ _id: fakultas_id });

      if (!isExists) {
        return apiResponse({ res, status: 404, message: "Fakultas tidak ada", data: null });
      }
    }

    const updatedProdi = await ProdiModel.findByIdAndUpdate(
      prodiId,
      { kode, nama_prodi, fakultas: fakultas_id },
      { new: true }
    ).populate("fakultas");

    return apiResponse({ 
      res, 
      status: 200, 
      message: "Data berhasil diperbarui", 
      data: updatedProdi 
    });
  }

  static async delete(req, res) {
    const prodiId = req.params.id;

    if (!mongoose.isValidObjectId(prodiId)) {
      return apiResponse({ res, status: 400, message: "ID Prodi tidak valid", data: null });
    }

    const deletedProdi = await ProdiModel.findByIdAndDelete(prodiId);

    if (!deletedProdi) {
      return apiResponse({ res, status: 404, message: "Prodi tidak ada", data: null });
    }

    return apiResponse({
      res,
      status: 200,
      message: "Prodi berhasil dihapus",
      data: null,
    });
  }
}

export default ProdiController;