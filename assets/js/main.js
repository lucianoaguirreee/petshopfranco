let dataTipos = []
let tipo = document.querySelector('.farmacia') ? 'Medicamento' : 'Juguete'
let endPoint = `https://apipetshop.herokuapp.com/api/articulos`


let cardElement = document.querySelector('#card_elementos')
fetch(endPoint)
.then(res => res.json())
.then(data => {
    dataTipos = data.response
    dataTipos.forEach(elem => {
        if(elem.tipo == tipo){
          cardElement.innerHTML += `<div class="col-2">
                                      <div class="card card-border">
                                          <img src="${elem.imagen}" class="img-product img" alt="card-1">
                                      <div>
                                          <h5 class="card-title fw-bold text-center pt-3 nombre">${elem.nombre}</h5>
                                          <p class="card-text text-center">$ ${elem.precio}</p>
                                          <p class="card-text text-center">Stock ${elem.stock}</p>
                                          <button class="btn btn-primary bg-custom" id="btnEnviar">Agregar al carrito</button>
                                      </div>
                                    </div>`
        }
    });
})
.catch(err => console.error(err.message)) 



function guardaDatos(){

  let data = {
    id: '',
    cantidad: 2,
    nombre: ''
  } 
  localStorage.setItem("Nombre", JSON.stringify(data))
}
