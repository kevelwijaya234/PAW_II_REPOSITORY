import mongoose from "mongoose";
import FakultasModel from "../model/Fakultas.model.js";
import ProdiModel from "../model/Prodi.model.js";
import { StoreProdiSchema, UpdateProdiSchema } from "../schemas/prodi.schema.js";
import { apiResponse, apiResponseValidation } from "../utils/response.js";

class ProdiController {
  // GET /api/prodi
  static async index(req, res) {
    try {
      const filter = {};
      const {
        search,
        sortBy = "createdAt",
        sort = "desc",
        page = 1,
        limit = 10,
      } = req.query;

      const currentPage = Math.max(1, parseInt(page, 10) || 1);
      const perPage = Math.max(1, parseInt(limit, 10) || 10);
      const skip = (currentPage - 1) * perPage;

      // Field pengurutan disesuaikan dengan schema Prodi
      const allowSortFields = ["kode", "nama_prodi", "createdAt", "updatedAt"];
      const sortByField = allowSortFields.includes(sortBy) ? sortBy : "createdAt";

      const sortOption = {
        [sortByField]: sort === "desc" ? -1 : 1,
      };

      // Filter pencarian berdasarkan kode atau nama_prodi
      if (search) {
        filter.nama_prodi = { 
          $regex: search, 
          $options: "i" };
      }

      const [listProdi, totalData] = await Promise.all([
        ProdiModel.find(filter)
          .select({
            _id: 1,
            kode: 1,
            nama_prodi: 1,
            fakultas: 1,
            createdAt: 1,
            updatedAt: 1,
          })
          .sort(sortOption)
          .skip(skip)
          .limit(perPage)
          .populate("fakultas"),

        ProdiModel.countDocuments(filter),
      ]);

      const totalPages = Math.ceil(totalData / perPage);

      return apiResponse({
        res,
        status: 200,
        message: "List prodi",
        data: {
          item: listProdi,
          pagination: {
            totalData,
            totalPages,
            currentPage,
            perPage,
            hasNextPage: currentPage < totalPages,
            hasPrevPage: currentPage > 1,
          },
        },
      });
    } catch (error) {
      return apiResponse({
        res,
        status: 500,
        message: error.message,
        data: null,
      });
    }
  }

  // GET /api/prodi/:id
  static async show(req, res) {
    try {
      const prodiId = req.params.id;

      if (!mongoose.isValidObjectId(prodiId)) {
        return apiResponse({ res, status: 400, message: "ID Prodi tidak valid", data: null });
      }

      const prodi = await ProdiModel.findById(prodiId).populate("fakultas", "kode nama_fakultas");

      if (!prodi) {
        return apiResponse({ res, status: 404, message: "Prodi tidak ditemukan", data: null });
      }

      return apiResponse({ res, status: 200, message: "Detail prodi", data: prodi });
    } catch (error) {
      return apiResponse({
        res,
        status: 500,
        message: error.message,
        data: null,
      });
    }
  }

  // POST /api/prodi
  static async store(req, res) {
    try {
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
        return apiResponse({ res, status: 404, message: "Fakultas tidak ditemukan", data: null });
      }

      const newProdi = await ProdiModel.create({
        kode,
        nama_prodi,
        fakultas: fakultas_id,
      });

      return apiResponse({ res, status: 201, message: "Prodi berhasil dibuat", data: newProdi });
    } catch (error) {
      return apiResponse({
        res,
        status: 500,
        message: error.message,
        data: null,
      });
    }
  }

  // PUT/PATCH /api/prodi/:id
  static async update(req, res) {
    try {
      const prodiId = req.params.id;

      if (!mongoose.isValidObjectId(prodiId)) {
        return apiResponse({ res, status: 400, message: "ID Prodi tidak valid", data: null });
      }

      const result = UpdateProdiSchema.safeParse(req.body);

      if (!result.success) {
        return apiResponseValidation({ res, errors: result.error });
      }

      const { kode, nama_prodi, fakultas_id } = result.data;

      if (fakultas_id) {
        if (!mongoose.isValidObjectId(fakultas_id)) {
          return apiResponse({ res, status: 400, message: "ID Fakultas tidak valid", data: null });
        }

        const isExists = await FakultasModel.exists({ _id: fakultas_id });

        if (!isExists) {
          return apiResponse({ res, status: 404, message: "Fakultas tidak ditemukan", data: null });
        }
      }

      const updatedProdi = await ProdiModel.findByIdAndUpdate(
        prodiId,
        { kode, nama_prodi, fakultas: fakultas_id },
        { new: true }
      ).populate("fakultas", "kode nama_fakultas");

      if (!updatedProdi) {
        return apiResponse({ res, status: 404, message: "Prodi tidak ditemukan", data: null });
      }

      return apiResponse({
        res,
        status: 200,
        message: "Data berhasil diperbarui",
        data: updatedProdi,
      });
    } catch (error) {
      return apiResponse({
        res,
        status: 500,
        message: error.message,
        data: null,
      });
    }
  }

  // DELETE /api/prodi/:id
  static async delete(req, res) {
    try {
      const prodiId = req.params.id;

      if (!mongoose.isValidObjectId(prodiId)) {
        return apiResponse({ res, status: 400, message: "ID Prodi tidak valid", data: null });
      }

      const deletedProdi = await ProdiModel.findByIdAndDelete(prodiId);

      if (!deletedProdi) {
        return apiResponse({ res, status: 404, message: "Prodi tidak ditemukan", data: null });
      }

      return apiResponse({
        res,
        status: 200,
        message: "Prodi berhasil dihapus",
        data: null,
      });
    } catch (error) {
      return apiResponse({
        res,
        status: 500,
        message: error.message,
        data: null,
      });
    }
  }
}

export default ProdiController;