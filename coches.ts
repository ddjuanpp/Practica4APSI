import mongoose from "npm:mongoose@7.6.3"; //npmjs.com/package/mongoose
import { Coches } from "./types.ts";

const Schema = mongoose.Schema;

const cocheSchema = new Schema(
  {
    tipo: { type: String, required: true },
    color: { type: String, required: true },
    precio: { type: Number, required: true },
    matricula: { type: String, required: true, unique: true},
  },
  { timestamps: true }//para saber cuando se ha creado y cuando actualizado
);

export type CocheModelType = mongoose.Document & Omit<Coches, "id">;

export default mongoose.model<CocheModelType>("Coches", cocheSchema);