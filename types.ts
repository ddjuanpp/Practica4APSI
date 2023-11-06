export type Coches = {
    tipo: string,
    color: string,
    matricula: string,
    precio: number,
    id: string,
};

export type Concesionario = {
    name: string,
    permiso: boolean,
    coches: Coches[],
    id: string,
}

export type Cliente = {
    name: string,
    money: number,
    dni: string,
    coches: Coches[],
    id: string,
}