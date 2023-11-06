import mongoose from "npm:mongoose@7.6.3"; //npmjs.com/package/mongoose
import { Cliente } from "./types.ts";
const Schema = mongoose.Schema;

const clienteSchema = new Schema(
  {
    name: { type: String, required: true },
    money: { type: Number, required: true },
    dni: { type: String, required: true, unique: true },
    coches:[ { type: Object } ]
  },
  { timestamps: true }//para saber cuando se ha creado y cuando actualizado
);

export type ClienteModelType = mongoose.Document & Omit<Cliente, "id">;

export default mongoose.model<ClienteModelType>("Cliente", clienteSchema);
