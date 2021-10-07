let listaTareas = document.querySelector("#lista");
let tareas = [];

const cargaInicial = () => {
  tareas = JSON.parse(localStorage.getItem("tareas")) || [];

  if (tareas.length > 0) {
    tareas.forEach((tarea) => {
      crearLista(tarea);
    });
  }

  document.querySelector("#textTarea").focus();
};

const crearLista = (texto) => {
  let contenedor = document.createElement("div");

  let cardTareas = `
    <div class="card mt-2 card-list shadow">
    <div class="card-body d-flex justify-content-between align-items-center">
     📌${texto.toUpperCase()}
    <button type="button" class="btn btn-outline-danger p-3 close" id="close"><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
  </svg></button>
            
    </div>
    </div>`;

  contenedor.innerHTML = cardTareas;

  listaTareas.appendChild(contenedor);
  document.querySelector("#textTarea").value = "";
};

const addItemList = (e) => {
  if (e.keyCode === 13) {
    e.preventDefault();
    let texto = document.querySelector("#textTarea").value;

    tareas.push(texto);
    localStorage.setItem("tareas", JSON.stringify(tareas));
    crearLista(texto);
  }
};

listaTareas.addEventListener("keyup", addItemList);

cargaInicial();

// Al hacer Click en cada close button elimina items de la lista de tareas
let close = document.getElementsByClassName("close");

console.log(close);
for (let i = 0; i < close.length; i++) {
  close[i].addEventListener("click", (e) => {
    let item = e.target.parentElement;
    let card = document.getElementsByClassName("card");

    card[i].removeChild(item);
  });
}

// Agrega un simbolo "checked" (realizada) al clickear en cada item de la lista de tareas
let list = document.getElementsByClassName("card-body");
for (let i =0; i < list.length; i++) {
  
  list[i].addEventListener(
    "click",
    function (ev) {
      if (ev.target.className === "card-body d-flex justify-content-between align-items-center") {
        ev.target.classList.toggle("checked");
      }
    },
    false
  );
}
