import express from "npm:express@4.18.2";
import mongoose from "npm:mongoose@7.6.3";

import {load} from "https://deno.land/std@0.204.0/dotenv/mod.ts"

import crearCoche from "./resolvers/crearCoche.ts";
import crearCliente from "./resolvers/crearCliente.ts";
import crearConcesionario from "./resolvers/crearConcesionario.ts";
import cochealconcesionario from "./resolvers/cochealconcesionario.ts";
import getCochesConcesionario from "./resolvers/getCochesConcesionario.ts";
import venderCoche from "./resolvers/venderCoche.ts";
import getCochesCliente from "./resolvers/getCochesCliente.ts";
import deleteCocheConcesionario from "./resolvers/deleteCocheConcesionario.ts";
import deleteCocheCliente from "./resolvers/deleteCocheCliente.ts";
import traspasoCoches from "./resolvers/traspasoCoches.ts";
import darDinero from "./resolvers/darDinero.ts";
import bloquearConcesionario from "./resolvers/bloquearConcesionario.ts";


const env = await load();
const URL_MONGO = env.MONGO_URL || Deno.env.get("MONGO_URL"); //si no existe el MI_MONGO_URL en el archivo env, leo las variables del S.O

if (!URL_MONGO) {
  console.log("No mongo URL found");
  Deno.exit(1);
}

await mongoose.connect(URL_MONGO);
const app = express();
app.use(express.json());
app
  .post("/crear/coche", crearCoche)
  .post("/crear/concesionario", crearConcesionario)
  .post("/crear/cliente", crearCliente)
  .put("/conce/coche/:name/:matricula", cochealconcesionario)
  .get("/conce/:name", getCochesConcesionario)
  .put("/cliente/:dni/coche/:matricula", venderCoche)
  .get("/cliente/:dni", getCochesCliente)
  .put("/concesionario/:name/delete/:matricula", deleteCocheConcesionario)
  .put("/cliente/:dni/delete/:matricula", deleteCocheCliente)
  .put("/coche/:matricula/cliente1/:dni1/cliente2/:dni2", traspasoCoches)
  .put("/dinero/:dni/:cantidad", darDinero)
  .put("/bloqueo/concesionario/:name", bloquearConcesionario)

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});