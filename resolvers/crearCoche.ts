//@ts-ignore //
import { Request, Response } from "npm:express@4.18.2";
import CocheModel from "../coches.ts";

const crearCoche = async (req: Request, res: Response) => {
  try {
    const { tipo, color, precio, matricula } = req.body;
    if (!tipo || !color || !precio || !matricula) {
      res.status(400).send({
        code: "faltan datos",
        message: "Tipo, color, precio o matricula tienen que crearse"
      });
      return;
    }

    const newCoche = new CocheModel({ tipo, color, precio, matricula });
    await newCoche.save();

    res.status(200).send({
      tipo: newCoche.tipo, //Esta dando error de tipo, pero funciona bien 
      color: newCoche.color, //Esta dando error de tipo, pero funciona bien 
      precio: newCoche.precio, //Esta dando error de tipo, pero funciona bien 
      matricula: newCoche.matricula, //Esta dando error de tipo, pero funciona bien 
      id: newCoche._id.toString,
    });
  } catch (error) {
    res.status(500).send({
      code: "error",
      message: error.message
    });
    return;
  }
};

export default crearCoche;