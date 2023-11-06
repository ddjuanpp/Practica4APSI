//@ts-ignore //
import { Request, Response } from "npm:express@4.18.2";
import  CocheModel  from "../coches.ts";
import  ConcesionarioModel  from "../concesionario.ts";
import  ClienteModel from "../cliente.ts";

const venderCoche = async (req: Request, res: Response) => {
    try{
        const { dni, matricula } = req.params;
        const coche = await CocheModel.findOne({ matricula }).exec(); //Busco si existe un coche con esa matricula
        if(!coche){
            res.status(404).send({
                code: "error coche",
                message: "Coche no existe"
              });
            return;
        }
        const cliente = await ClienteModel.findOne({ dni }).exec(); //Busco si existe un cliente con ese dni
        if(!cliente){
            res.status(404).send({
                code: "error cliente",
                message: "cliente no existe"
              });
            return;
        }

        const concesionarios = await ConcesionarioModel.find().exec(); //Busco en todos los concesionarios no solo uno
        const concesionario = concesionarios.find((concesionario) => concesionario.coches.some((e) => e.matricula === matricula));
        if (!concesionario) {
            return res.status(404).send({
                code: "error concesionario",
                message: "El coche no está en ningún concesionario"
            });
        }
        if(concesionario.permiso===false){//Vemos si tiene permiso de venta
            return res.status(404).send({
                code: "error concesionario",
                message: "El concesionario donde se encuentra el coche no puede vender"
            });
        }


        const clientess = await ClienteModel.findOne().exec();
        const cocheExist2 = clientess?.coches.find((e)=> e.matricula === matricula); //con esto vemos si lo tiene otro cliente
        if(cocheExist2){
            res.status(404).send({
                code: "Dato ya usado",
                message: "El coche pertenece ya a un cliente"
              });
            return;
        }

        const precio = coche.precio;
        if(cliente.money<precio){
            res.status(404).send({
                code: "error dinero cliente",
                message: "El cliente no tiene suficiente dinero para comprar el coche"
            });
            return;
        }
        

        const cochesConcesionario = concesionario.coches.filter((e)=> e.matricula !== matricula);//Borro el coche del concesionario
        const cochesCliente = cliente.coches; 
        cochesCliente.push(coche); // añado el nuevo coche a los que ya habia
        
        const dinero = cliente.money - coche.precio;
        
        await ClienteModel.updateOne( // añado los coches y le resto el dinero
            {dni},
            {coches: cochesCliente,
             money: dinero },
            {new: true}
        ).exec();
        await ConcesionarioModel.updateOne( // añado los coches y le resto el dinero
            {name: concesionario.name},
            {coches: cochesConcesionario},
            {new: true}
        ).exec();

        res.status(200).send("Vendido con exito");

    }catch(error){
        res.status(500).send({
            code: "error",
            message: error.message
        });
        return;
    }
}
export default venderCoche;