const botonAgregar = document.querySelector(".input-btn")
const campoTarea = document.querySelector(".campo")
const botonesFiltrar = document.querySelectorAll(".item-btn")
const contenedorTareas = document.getElementById("tareas");
const botonTodos = document.querySelector(".todo");
const botonPendiente = document.querySelector(".pendientes")
const botonCompletas = document.querySelector(".completa")

campoTarea.addEventListener("keydown" ,(e) =>{
    if(e.key === 'Enter'){
        botonAgregar.click()
    }
})


botonAgregar.addEventListener("click", ()=>{
    if(campoTarea.value === ""){
        alert("Por favor ingresar tarea")
    }else{
        console.log(campoTarea.value)
        const div = document.createElement("div");
        div.classList.add("tarea")
        
        div.innerHTML= `<div class="tarea-deracha">
                        <p class="tarea-texto">${campoTarea.value}</p>
                    </div>
                    <div class="tarea-izquierda">
                        <span class="tarea-pendiente"><i class="bi bi-exclamation-circle"></i></span>
                        <span class="tarea-completa"><i class="bi bi-check2"></i></span>
                        <span class="tarea-eliminar"><i class="bi bi-trash2-fill"></i></span>
                    </div>`;
        document.getElementById("tareas").appendChild(div)
        guardarTareas();
    }
    campoTarea.value=""
    campoTarea.focus()   
});


contenedorTareas.addEventListener("click", (e) => {
    const elemento = e.target;
    
    if (elemento.closest(".tarea-pendiente")) {
        const tarea = elemento.closest(".tarea");
        tarea.classList.remove("completada");
        tarea.classList.toggle("pendiente");
        guardarTareas();
    }

    if (elemento.closest(".tarea-completa")) {
        const tarea = elemento.closest(".tarea");
        tarea.classList.remove("pendiente");
        tarea.classList.toggle("completada");
        guardarTareas();
    }

    if (elemento.closest(".tarea-eliminar")) {
        const tarea = elemento.closest(".tarea");
        tarea.remove();
        console.log("Tarea eliminada");
        guardarTareas();

    }
    
    
});

function filtrarTareas(estado) {
    const tareas = document.querySelectorAll(".tarea");
    
    tareas.forEach(tarea => {
        tarea.style.display = "flex"; 

        if (estado === "pendiente" && !tarea.classList.contains("pendiente")) {
            tarea.style.display = "none";
        }

        if (estado === "completada" && !tarea.classList.contains("completada")) {
            tarea.style.display = "none";
        }
    });
}

botonTodos.addEventListener("click", () => filtrarTareas("todas"));
botonPendiente.addEventListener("click", () => filtrarTareas("pendiente"));
botonCompletas.addEventListener("click", () => filtrarTareas("completada"));


// LocalStorage

function guardarTareas() {
    const tareas = [];

    document.querySelectorAll(".tarea").forEach(tarea => {
        tareas.push({
            texto: tarea.querySelector(".tarea-texto").textContent,
            pendiente: tarea.classList.contains("pendiente"),
            completada: tarea.classList.contains("completada")
        });
    });

    localStorage.setItem("tareas", JSON.stringify(tareas));
}

function cargarTareas() {
    const tareas = JSON.parse(localStorage.getItem("tareas")) || [];

    tareas.forEach(t => {
        const div = document.createElement("div");
        div.classList.add("tarea");
        if (t.pendiente) div.classList.add("pendiente");
        if (t.completada) div.classList.add("completada");

        div.innerHTML = `
            <div class="tarea-deracha">
                <p class="tarea-texto">${t.texto}</p>
            </div>
            <div class="tarea-izquierda">
                <span class="tarea-pendiente"><i class="bi bi-exclamation-circle"></i></span>
                <span class="tarea-completa"><i class="bi bi-check2"></i></span>
                <span class="tarea-eliminar"><i class="bi bi-trash2-fill"></i></span>
            </div>`;
        document.getElementById("tareas").appendChild(div);
    });
}

cargarTareas();


