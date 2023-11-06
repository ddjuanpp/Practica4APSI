# Practica4APSI

.post("/crear/coche", crearCoche);
  En CrearCoche se crea un coche pasando como datos tipo, color, matricula y precio. Se comprueba que se hayan pasado las 4 cosas necesarias
  Es post porque paso datos
  
.post("/crear/concesionario", crearConcesionario)
  En crearConcesionario se crea un concesionario pasando como datos name. Se comprueba que se haya pasado el name necesario
  Es post porque paso datos
  
.post("/crear/cliente", crearCliente)
  En crearCliente se crea un cliente pasando como datos dni, name, dinero. Se comprueba que se hayan pasado las 3 cosas necesarias
  Es post porque paso datos
  
.put("/conce/coche/:name/:matricula", cochealconcesionario)
  Se pasa name y matricula, se comprueba que existan tanto el concesionario como el coche, tambien que el concesionario tenga espacio para otro coche, si ya estaba anteriormente, y si esta el coche en otro concesionario,
  en caso de que todo sea correcto, se añade el coche a los que ya tenia el concesionario, y se hace un updateOne con la nueva lista de coches.
  Es put porque actualizo datos
  
.get("/conce/:name", getCochesConcesionario)
  Se pasa el nombre del concesionario, se comprueba que exista, se comprueba que no esté vacio. Despues de todos se muestran el tipo, color, matricula y precio de cada uno de los coches del concesionario.
  Es get porque muestra datos
  
.put("/cliente/:dni/coche/:matricula", venderCoche)
  Se pasa el dni y la matricula, se comprueba que ambos existan, se comprueba que el coche este en un concesionario, se comprueba que el concesionario pueda vender coches, se comprueba que no lo tenga ningun cliente el coche, 
  se comprueba que se tenga dinero para comprar el coche. Se borra de la lista de coches del concesionario el coche en cuestión y se actualiza el concesionario sin este coche, se hace una resta al dinero del cliente y 
  se añade el coche nuevo a su lista de coches, se actualiza el cliente con el nuevo dinero y los nuevos coches.
  Es put porque actualizo tanto el concesionario como el cliente.
  
.get("/cliente/:dni", getCochesCliente)
  Se pasa el dni del cliente, se comprueba que exista, se comprueba que no sin coches. Despues de todos se muestran el tipo, color, matricula y precio de cada uno de los coches del cliente.
  Es get porque muestra datos
  
.put("/concesionario/:name/delete/:matricula", deleteCocheConcesionario)
  Se pasa nombre y matricula, se comprueba la existencia del coche y del concesionario, se comprueba que el coche este en el concesionario, se hace una lista de los coches menos el que se quiere borrar, y se hace un 
  UpdateOne para el concesionario pasandole la nueva lista de coches que tiene sin el borrado.
  Es put porque se actualizan datos.

.put("/cliente/:dni/delete/:matricula", deleteCocheCliente)
  Se pasa dni y matricula, se comprueba la existencia del coche y del cliente, se comprueba que el coche este en el cliente, se hace una lista de los coches menos el que se quiere borrar, y se hace un 
  UpdateOne para el cliente pasandole la nueva lista de coches que tiene sin el borrado.
  Es put porque se actualizan datos.

.put("/coche/:matricula/cliente1/:dni1/cliente2/:dni2", traspasoCoches)
  Se pasa matricula y dos dni, se comprueba que existan coche y ambos clientes, se comprueba que el cliente1 posea el coche, se comprueba que el cliente dos tenga dinero suficiente. Se suma dinero al cliente1, se resta al 
  cliente2, se quita el coche de los coches del cliente1, se añade el coche al cliente2, ya con ello se actualizan ambos clientes con su nuevo dinero y sus nuevos coches
  Es put porque se actualizan datos

.put("/dinero/:dni/:cantidad", darDinero)
  Se pasa dni y cantidad de dinero, se comprueba que exista el cliente, se comprueba que la cantidad de dinero sea positiva para sumar, se actualiza el cliente con el nuevo dinero sumado.
  Es put porque se actualizan datos

.put("/bloqueo/concesionario/:name", bloquearConcesionario)
  Se pasa name, se comprueba que exista concesionario, se comprueba que no estuviese ya bloqueado, se actualizan los permisos y se pone false por lo que se bloquea.
  Es put porque se actualizan datos


El coche tiene tipo, color, matricula y precio. La matricula es unica por lo que no se puede crear otra igual, el tipo y color son string, y el precio int.

El cliente tiene dni, name, dinero, y coches. El dni es unico por lo que no se puede crear otro igual, el name y dinero son string e int, y coches es de tipo array de objetos en este caso coches.

El concesionario tiene name, permisos, y coches. El name es unico no se puede crear otro igual, los permisos son booleano, y coches es de tipo array de objetos en este caso coches.
