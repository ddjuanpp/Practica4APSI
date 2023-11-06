//@ts-ignore //
import { Request, Response } from "npm:express@4.18.2";
import  ClienteModel  from "../cliente.ts";

const traspasoCoches = async (req: Request, res: Response) => {
    try{
        const { dni, cantidad } = req.params;
 
        const cliente = await ClienteModel.findOne({ dni }).exec(); //Busco si existe un cliente con ese dni
        if(!cliente){
            res.status(404).send({
                code: "error de cliente",
                message: "Cliente no existe"
            });
            return;
        }
        if(cantidad<0){
            res.status(404).send({
                code: "error de dinero",
                message: "No puedes quitar dinero solo sumar"
            });
            return;
        }
        const dinero = cliente.money + cantidad;

        await ClienteModel.updateOne(
            {dni},
            {money: dinero}, //le paso todos los coches que tenia menos el pedido
            {new: true }
        ).exec();
        res.status(200).send("Dinero añadido");
    }catch(error){
        res.status(500).send({
            code: "error",
            message: error.message
          });
        return;
    }
}
export default traspasoCoches;