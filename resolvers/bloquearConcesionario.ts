//@ts-ignore //
import { Request, Response } from "npm:express@4.18.2";
import  ConcesionarioModel  from "../concesionario.ts";

const bloquearConcesionario = async (req: Request, res: Response) => {
    try{
        const { name } = req.params;
        const concesionario = await ConcesionarioModel.findOne({ name }).exec(); //Busco si existe un concesionario con ese nombre
        if(!concesionario){
            res.status(404).send({
                code: "error de concesionario",
                message: "Concesionario no existe"
            });
            return;
        }
        if(concesionario.permiso===false){
            res.status(404).send({
                code: "error de bloqueo",
                message: "El concesionario ya estaba bloqueado"
            });
            return;
        }

        await ConcesionarioModel.updateOne(
            {name},
            {permiso: false}, 
            {new: true }
        ).exec();
        res.status(200).send("Bloqueado con exito");
    }catch(error){
        res.status(500).send({
            code: "error",
            message: error.message
          });
        return;
    }
}
export default bloquearConcesionario;