const form = document.getElementById("formulario");
const inputTarea = document.getElementById("input-tarea");
const estadoTarea = document.getElementById("estado-tarea");
const filtrarTarea = document.getElementById("filtrar-tarea");
const eliminarFiltro = document.getElementById("eliminar-filtro");
const listaDeTareas = document.getElementById("lista-de-tareas");

let arregloDeTareas = [];

if (localStorage.getItem("tareas")) {
  arregloDeTareas = JSON.parse(localStorage.getItem("tareas"));
  renderizarTarea();
}

function guardarTareas() {
  localStorage.setItem("tareas", JSON.stringify(arregloDeTareas));
}

function eliminarTarea(tarea) {
  arregloDeTareas = arregloDeTareas.filter((t) => t.tarea !== tarea);
  renderizarTarea();
  guardarTareas();
}

function filtrarPorEstado(estado) {
  if (estado === "") {
    renderizarTarea();
  } else {
    const tareasFiltradas = arregloDeTareas.filter((t) => t.estadoDeLaTarea === estado);
    renderizarTarea(tareasFiltradas);
  }
}
eliminarFiltro.addEventListener("click", () => {
    filtrarTarea.value = ""; 
    filtrarPorEstado(""); 
  });
  

function renderizarTarea(tareas = arregloDeTareas) {
  listaDeTareas.innerHTML = "";

  tareas.forEach((tarea) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <p>Tarea: ${tarea.tarea}</p>
      <p>Estado de la tarea: ${tarea.estadoDeLaTarea}</p>
      <button onclick="eliminarTarea('${tarea.tarea}')">Eliminar tarea</button>
    `;
    listaDeTareas.appendChild(li);
  });
}

form.addEventListener("submit", (evento) => {
  evento.preventDefault();

  const tarea = inputTarea.value.trim(); 
  const estado = estadoTarea.value;

  if (tarea === "") {
    swal.fire({ title: 'Ingrese una tarea valida ',
                icon: 'error',
                
                                                     }); 
    
    return; 
  }

  const nuevaTarea = {
    tarea: inputTarea.value,
    estadoDeLaTarea: estadoTarea.value
  };

  arregloDeTareas.push(nuevaTarea);

  renderizarTarea();
  guardarTareas();

  form.reset();
});

filtrarTarea.addEventListener("change", (evento) => {
  const estadoSeleccionado = evento.target.value;
  filtrarPorEstado(estadoSeleccionado);
});


var myIndex = 0;
carousel();

function carousel() {
  var i;
  var x = document.getElementsByClassName("mySlides-fade");
    for (i = 0; i < x.length; i++) {
      x[i].style.display = "none";
    }
  myIndex++;
    if (myIndex > x.length) {myIndex = 1}
    x[myIndex-1].style.display = "block";
    setTimeout(carousel, 9000);
}
