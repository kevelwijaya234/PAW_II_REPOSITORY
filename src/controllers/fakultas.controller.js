import FakultasModel from "../model/Fakultas.model.js";
import { storeFakultasSchema, updateFakultasSchema } from "../schemas/fakultas.schema.js";
import { apiResponse, apiResponseValidation } from "../utils/response.js";

class FakultasController {
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

  const allowSortFields = ["kode", "nama_fakultas", "createdAt", "updatedAt"];
  const sortByField = allowSortFields.includes(sortBy) ? sortBy : "createdAt";

  const sortOption = {
    [sortByField]: sort === "desc" ? -1 : 1
  };

    if (search) {
      filter.$or = [
        { nama_fakultas: { $regex: search, $options: "i" } },
        { kode: { $regex: search, $options: "i" } }
      ];
    }

    const [listFakultas, totalData] = await Promise.all([
    FakultasModel.find(filter)
    .select({
      _id: 1,
      kode: 1,
      nama_fakultas: 1,
    })
    .sort(sortOption)
    .skip(skip)
    .limit(perPage),

    FakultasModel.countDocuments(filter)
  ]);

  const totalPages = Math.ceil(totalData / perPage);

    return apiResponse({
      res,
      status: 200,
      data: {
        item: listFakultas,
        pagination: {
          totalData,
          totalPages,
          currentPage,
          perPage,
          hasNextPage: currentPage < totalPages,
          hasPrevPage: currentPage > 1
        }
      }
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