//@ts-ignore //
import { Request, Response } from "npm:express@4.18.2";
import  ConcesionarioModel  from "../concesionario.ts";

const getCochesConcesionario = async (req: Request, res: Response) => {
    try{
        const {  name } = req.params;
        const concesionario = await ConcesionarioModel.findOne({ name }).exec(); // para buscar el concesionario con el nombre
        
        if(!concesionario){  //compruebo si existe
            res.status(404).send({
                code: "error concesionario",
                message: "Concesionario no existe"
              });
            return;
        }
        if(concesionario.coches.length === 0){ //compruebo si tiene coches que mostrar
            res.status(404).send({
                code: "error concesionario",
                message: "Concesionario vacio"
              });
            return;
        }
        res.status(200).send(concesionario.coches.map((coche) => ({ 
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
export default getCochesConcesionario;