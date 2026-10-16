import FakultasModel from "../model/Fakultas.model.js";
import { storeFakultasSchema, updateFakultasSchema } from "../schemas/fakultas.schema.js";
import { apiResponse, apiResponseValidation } from "../utils/response.js";

class FakultasController {
  // GET /api/fakultas
  static async index(req, res) {
    try {
      const listFakultas = await FakultasModel.find();
      return apiResponse({
        res,
        status: 200,
        message: "List Fakultas",
        data: listFakultas,
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

  // GET /api/fakultas/:id
  static async show(req, res) {
    try {
      const { id } = req.params;
      const fakultas = await FakultasModel.findById(id);

      if (!fakultas) {
        return apiResponse({
          res,
          status: 404,
          message: "Fakultas tidak ditemukan",
          data: null,
        });
      }

      return apiResponse({
        res,
        status: 200,
        message: "Detail Fakultas",
        data: fakultas,
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

  // POST /api/fakultas
  static async store(req, res) {
    try {
      const result = storeFakultasSchema.safeParse(req.body);

      if (!result.success) {
        return apiResponseValidation({ res, errors: result.error });
      }

      const { kode, nama_fakultas } = result.data;

      const newFakultas = await FakultasModel.create({
        kode,
        nama_fakultas,
      });

      return apiResponse({
        res,
        status: 201,
        message: "Fakultas berhasil dibuat",
        data: newFakultas,
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

  // PUT/PATCH /api/fakultas/:id
  static async update(req, res) {
    try {
      const { id } = req.params;
      const result = updateFakultasSchema.safeParse(req.body);

      if (!result.success) {
        return apiResponseValidation({ res, errors: result.error });
      }

      const updatedFakultas = await FakultasModel.findByIdAndUpdate(
        id,
        result.data,
        { new: true }
      );

      if (!updatedFakultas) {
        return apiResponse({
          res,
          status: 404,
          message: "Fakultas tidak ditemukan",
          data: null,
        });
      }

      return apiResponse({
        res,
        status: 200,
        message: "Fakultas berhasil diperbarui",
        data: updatedFakultas,
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

  // DELETE /api/fakultas/:id
  static async delete(req, res) {
    try {
      const { id } = req.params;
      const deletedFakultas = await FakultasModel.findByIdAndDelete(id);

      if (!deletedFakultas) {
        return apiResponse({
          res,
          status: 404,
          message: "Fakultas tidak ditemukan",
          data: null,
        });
      }

      return apiResponse({
        res,
        status: 200,
        message: "Fakultas berhasil dihapus",
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

export default FakultasController;