//@ts-ignore //
import { Request, Response } from "npm:express@4.18.2";
import  CocheModel  from "../coches.ts";
import  ClienteModel  from "../cliente.ts";

const traspasoCoches = async (req: Request, res: Response) => {
    try{
        const { matricula, dni1, dni2 } = req.params;
        const coche = await CocheModel.findOne({ matricula }).exec(); //Busco si existe un coche con esa matricula
        if(!coche){
            res.status(404).send({
                code: "error de coche",
                message: "Coche no existe"
            });
            return;
        }
        const cliente1 = await ClienteModel.findOne({ dni: dni1 }).exec(); //Busco si existe un cliente con ese dni
        if(!cliente1){
            res.status(404).send({
                code: "error de cliente",
                message: "Cliente1 no existe"
            });
            return;
        }
        const cliente2 = await ClienteModel.findOne({ dni: dni2 }).exec(); //Busco si existe un cliente con ese dni
        if(!cliente2){
            res.status(404).send({
                code: "error de cliente",
                message: "Cliente2 no existe"
            });
            return;
        }

        const cocheExist = cliente1.coches.find((e)=> e.matricula === matricula); //con esto vemos si esta en el cliente
        if(!cocheExist){
            res.status(404).send({
                code: "Dato sin usar",
                message: "El coche no esta en el cliente1"
              });
            return;
        }
        
        const precio = coche.precio;
        if(cliente2.money<precio){
            res.status(404).send({
                code: "error dinero cliente",
                message: "El cliente2 no tiene suficiente dinero para comprar el coche al cliente1"
            });
            return;
        }

        const dinero1 = cliente1.money + precio;
        const dinero2 = cliente2.money - precio;

        const coches1 = cliente1.coches.filter((e)=> e.matricula !== matricula);//le quito el coche al cliente1
        const coches2 = cliente2.coches; 
        coches2.push(coche); // añado el nuevo coche a los que ya habia

        await ClienteModel.updateOne(
            {dni: dni1},
            {coches: coches1,
             money: dinero1}, //le paso todos los coches que tenia menos el pedido
            {new: true }
        ).exec();
        await ClienteModel.updateOne(
            {dni: dni2},
            {coches: coches2,
             money: dinero2}, //le paso todos los coches que tenia menos el pedido
            {new: true }
        ).exec();
        res.status(200).send("Traspaso con exito");
    }catch(error){
        res.status(500).send({
            code: "error",
            message: error.message
          });
        return;
    }
}
export default traspasoCoches;