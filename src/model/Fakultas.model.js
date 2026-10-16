import mongoose from "mongoose";

const FakultasSchema = new mongoose.Schema(
  {
    kode: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    nama_fakultas: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const FakultasModel =
  mongoose.models.Fakultas || mongoose.model("Fakultas", FakultasSchema);

export default FakultasModel;