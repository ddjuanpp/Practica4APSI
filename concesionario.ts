import mongoose from "npm:mongoose@7.6.3"; //npmjs.com/package/mongoose
import { Concesionario } from "./types.ts";
const Schema = mongoose.Schema;

const concesionarioSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    permiso: { type: Boolean, required: true},
    coches:[ { type: Object } ]
  },
  { timestamps: true }//para saber cuando se ha creado y cuando actualizado
);

export type ConcesionarioModelType = mongoose.Document & Omit<Concesionario, "id">;

export default mongoose.model<ConcesionarioModelType>("Concesionario", concesionarioSchema);