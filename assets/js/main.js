let dataTipos = []
let tipo = document.querySelector('.farmacia') ? 'Medicamento' : 'Juguete'
let endPoint = `https://apipetshop.herokuapp.com/api/articulos`

let arregloProductos = []
let cardElement = document.querySelector('#container-productos')
fetch(endPoint)
  .then((res) => res.json())
  .then((data) => {
    dataTipos = data.response;
    arregloProductos = dataTipos.map(elem => {
        let procesado = {
          id: elem._id,
          nombre: elem.nombre,
          precio: elem.precio,
        }
        return procesado
    })
    dataTipos.forEach((elem) => {
      if (elem.tipo == tipo) {
        cardElement.innerHTML += `<div class="col-4 p-2">
          <div class="card w-100 p-6 d-flex align-items-center justify-content-evenly flex-column card-border border-2 card-size">
              <img class="lazyloaded img-producto"
                  src="${elem.imagen}"
                  alt="${elem.nombre}">
              <div class="d-flex flex-column justify-content-evenly">
                  <h5 class="card-title fw-bold text-center pt-3 nombre">${elem.nombre}</h5>
                  <p class="card-text text-center precio fw-bold">$ ${elem.precio}</p>
                  <div class="text-center pb-3">
                      <label for="price" class="cantidad">Cantidad: </label>
                      <input id="cantidad-${elem._id}" class="text-center" type="number" name="cantidad-id"
                          min="1" max="${elem.stock}" step="1" value="1">
                  </div>
                  <div class="d-flex align-items-center justify-content-center">
                    <a id="${elem._id}" class="boton-comprar btn btn-primary bg-custom mb-3">Agregar al carrito</a>
                  </div>
              </div>
          </div>
      </div>`;
      }
    });
  })
  .catch((err) => console.error(err));

function guardaDatos(id) {
  let arrayData = []
  let nombre_producto
  let precio_producto
  arregloProductos.forEach(elem => {
    if(elem.id === id){
      nombre_producto = elem.nombre
      precio_producto = elem.precio
    }
  })
  let str = 'cantidad-'+id
  let data = [{
        cantidad: document.getElementById(str).value,
        nombre: nombre_producto,
        precio: precio_producto
      }]
      let datosGuardados = localStorage.getItem('datosGuardados')
      if(datosGuardados === null){
        localStorage.setItem('datosGuardados', JSON.stringify(data));
      }else{
        // let newData = []
        let newData= JSON.parse(datosGuardados)
        newData.push(data)
        guardaLocalStorage(newData) 
      }
}

cardElement.addEventListener("click", agregarAlCarrito);

function agregarAlCarrito(e) {
  if (e.target.classList.contains("boton-comprar")) {
    guardaDatos(e.target.id)
  }
}

function guardaLocalStorage(key){
  localStorage.setItem('datosGuardados', JSON.stringify(key));
}