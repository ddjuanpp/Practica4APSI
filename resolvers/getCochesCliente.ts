//@ts-ignore //
import { Request, Response } from "npm:express@4.18.2";
import  ClienteModel  from "../cliente.ts";

const getCochesCliente = async (req: Request, res: Response) => {
    try{
        const { dni } = req.params;
        const cliente = await ClienteModel.findOne({ dni }).exec(); // para buscar el concesionario con el nombre
        
        if(!cliente){  //compruebo si existe
            res.status(404).send({
                code: "error concesionario",
                message: "Cliente no existe"
              });
            return;
        }
        if(cliente.coches.length === 0){ //compruebo si tiene coches que mostrar
            res.status(404).send({
                code: "error concesionario",
                message: "Cliente sin coches"
              });
            return;
        }
        res.status(200).send(cliente.coches.map((coche) => ({ 
            tipo: coche.tipo, 
            color: coche.color,
            precio: coche.precio,
            matricula: coche.matricula,
        })));

    }catch(error){
        res.status(500).send({
            code: "error",
            message: error.message
          });
        return;
    }
}
export default getCochesCliente;