//@ts-ignore//
import { Request, Response } from "npm:express@4.18.2";
import ConcesionarioModel from "../concesionario.ts";

const crearConcesionario = async (req: Request, res: Response) => {
  try {
    const { name, permiso } = req.body;
    if (!name) {
      res.status(400).send({
        code: "faltan datos",
        message: "Nombre tiene que crearse"
      });
      return;
    }

    const newConcesionario = new ConcesionarioModel({ name, permiso });
    await newConcesionario.save();

    res.status(200).send({
        name: newConcesionario.name, //Esta dando error de tipo, pero funciona bien
    });
  } catch (error) {
    res.status(500).send({
      code: "error",
      message: error.message
    });
    return;
  }
};

export default crearConcesionario;