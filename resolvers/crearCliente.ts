//@ts-ignore //
import { Request, Response } from "npm:express@4.18.2";
import ClienteModel from "../cliente.ts";

const crearCliente = async (req: Request, res: Response) => {
  try {
    const { name, money, dni } = req.body;
    if (!name || !money || !dni) {
      res.status(400).send({
        code: "sin datos",
        message: "Name, money, dni tienen que crearse"
      });
      return;
    }

    const newCliente = new ClienteModel({ name, money, dni });
    await newCliente.save();

    res.status(200).send({
      name: newCliente.name, //Esta dando error de tipo, pero funciona bien 
      money: newCliente.money, //Esta dando error de tipo, pero funciona bien 
      dni: newCliente.dni, //Esta dando error de tipo, pero funciona bien 
      coches: [],
      id: newCliente._id.toString,
    });
  } catch (error) {
    res.status(500).send({
      code: "error",
      message: error.message
    });
    return;
  }
};

export default crearCliente;