//@ts-ignore //
import { Request, Response } from "npm:express@4.18.2";
import  CocheModel  from "../coches.ts";
import  ConcesionarioModel  from "../concesionario.ts";

const deleteCocheConcesionario = async (req: Request, res: Response) => {
    try{
        const { matricula, name } = req.params;
        const coche = await CocheModel.findOne({ matricula }).exec(); //Busco si existe un coche con esa matricula
        if(!coche){
            res.status(404).send({
                code: "error de coche",
                message: "Coche no existe"
            });
            return;
        }
        const concesionario = await ConcesionarioModel.findOne({ name }).exec(); //Busco si existe un concesionario con ese nombre
        if(!concesionario){
            res.status(404).send({
                code: "error de concesionario",
                message: "Concesionario no existe"
            });
            return;
        }

        const cocheExist = concesionario.coches.find((e)=> e.matricula === matricula); //con esto vemos si esta en el concesionario
        if(!cocheExist){
            res.status(404).send({
                code: "Dato sin usar",
                message: "El coche no estaba en ningun concesionario"
              });
            return;
        }
        
        const coches = concesionario.coches.filter((e)=> e.matricula !== matricula);

        await ConcesionarioModel.updateOne(
            {name},
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
export default deleteCocheConcesionario;