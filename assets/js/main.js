let dataTipos = [];
let tipo = document.querySelector(".farmacia") ? "Medicamento" : "Juguete";
let endPoint = `https://apipetshop.herokuapp.com/api/articulos`;

let cardElement = document.querySelector("#container-productos");

fetch(endPoint)
  .then((res) => res.json())
  .then((data) => {
    dataTipos = data.response;
    dataTipos.forEach((elem) => {
      if (elem.tipo == tipo) {
        cardElement.innerHTML += `<div class="col-4 p-2">
          <div class="card w-100 p-6 d-flex align-items-center card-border border-2">
              <img class="lazyloaded"
                  src="${elem.imagen}"
                  alt="Gaucho Goods Tribal Leather Dog Collar">
              <div>
                  <h5 class="card-title fw-bold text-center pt-3 nombre">${elem.nombre}</h5>
                  <p class="card-text text-center precio fw-bold">$ 5000</p>
                  <div class="text-center pb-3">
                      <label for="price" class="cantidad">Cantidad: </label>
                      <input id="cantidad-${elem._id}" class="text-center" type="number" name="cantidad-id"
                          min="1" max="${elem.stock}" step="1" value="1">
                  </div>
                  <a id="${elem._id}" class="boton-comprar btn btn-primary bg-custom mb-3">Agregar al carrito</a>
              </div>
          </div>
      </div>`;
      }
    });
  })
  .catch((err) => console.error(err));

function guardaDatos() {
  let data = {
    id: "",
    cantidad: 2,
    nombre: "",
  };
  localStorage.setItem("Nombre", JSON.stringify(data));
}

cardElement.addEventListener("click", agregarAlCarrito);

function agregarAlCarrito(e) {
  if (e.target.classList.contains("boton-comprar")) {
    console.log("estas comprando");
  }
}
