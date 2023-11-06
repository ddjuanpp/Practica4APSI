//@ts-ignore //
import { Request, Response } from "npm:express@4.18.2";
import  CocheModel  from "../coches.ts";
import  ClienteModel  from "../cliente.ts";

const deleteCocheCliente = async (req: Request, res: Response) => {
    try{
        const { matricula, dni } = req.params;
        const coche = await CocheModel.findOne({ matricula }).exec(); //Busco si existe un coche con esa matricula
        if(!coche){
            res.status(404).send({
                code: "error de coche",
                message: "Coche no existe"
            });
            return;
        }
        const cliente = await ClienteModel.findOne({ dni }).exec(); //Busco si existe un cliente con ese dni
        if(!cliente){
            res.status(404).send({
                code: "error de cliente",
                message: "Cliente no existe"
            });
            return;
        }

        const cocheExist = cliente.coches.find((e)=> e.matricula === matricula); //con esto vemos si esta en el cliente
        if(!cocheExist){
            res.status(404).send({
                code: "Dato sin usar",
                message: "El coche no estaba en ningun cliente"
              });
            return;
        }
        
        const coches = cliente.coches.filter((e)=> e.matricula !== matricula);

        await ClienteModel.updateOne(
            {dni},
            {coches: coches}, //le paso todos los coches que tenia menos el pedido
            {new: true }
        ).exec();
        res.status(200).send("Borrado con exito");
    }catch(error){
        res.status(500).send({
            code: "error",
            message: error.message
          });
        return;
    }
}
export default deleteCocheCliente;