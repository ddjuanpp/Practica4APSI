//@ts-ignore //
import { Request, Response } from "npm:express@4.18.2";
import  CocheModel  from "../coches.ts";
import  ConcesionarioModel  from "../concesionario.ts";

const cochealconcesionario = async (req: Request, res: Response) => {
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
        const tamaño = concesionario.coches.length; //Miro cuantos coches tiene el concesionario para no meter mas
        if(tamaño>=10){
            res.status(404).send({
                code: "capacidad llena",
                message: "Concesionario lleno no se ha podido meter"
              });
            return;
        }

        const cocheExist = concesionario.coches.find((e)=> e.matricula === matricula); //con esto vemos si ya estaba en el concesionario
        if(cocheExist){
            res.status(404).send({
                code: "Dato ya usado",
                message: "El coche ya estaba en el concesionario"
              });
            return;
        }
        const concesionarios = await ConcesionarioModel.findOne().exec();
        const cocheExist2 = concesionarios?.coches.find((e)=> e.matricula === matricula); //con esto vemos si ya esta en otro concesionario
        if(cocheExist2){
            res.status(404).send({
                code: "Dato ya usado",
                message: "El coche pertenece ya a un concesionario"
              });
            return;
        }
        
        const coches = concesionario.coches; 
        coches.push(coche); // añado el nuevo coche a los que ya habia

        await ConcesionarioModel.updateOne(
            {name},
            {coches: coches}, //le paso todos los coches que tenia mas el nuevo
            {new: true }
        ).exec();
        res.status(200).send("Guardado con exito");
    }catch(error){
        res.status(500).send({
            code: "error",
            message: error.message
          });
        return;
    }
}
export default cochealconcesionario;