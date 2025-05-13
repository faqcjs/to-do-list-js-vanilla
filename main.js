const botonAgregar = document.querySelector(".input-btn")
const campoTarea = document.querySelector(".campo")
const botonesFiltrar = document.querySelectorAll(".item-btn")
const tareaPendiente = document.querySelector(".tarea-pendiente")
const tareaCompletada = document.querySelector(".tarea-completa")
const tareaEliminada = document.querySelector(".tarea-eliminar")
const contenedorTareas = document.getElementById("tareas");

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
    }
    campoTarea.value=""
    campoTarea.focus()   
});

botonesFiltrar.forEach(boton =>{
    boton.addEventListener("click", ()=>{
        
        botonesFiltrar.forEach(boton =>{
            if(boton.classList[1] === "active"){
            boton.classList.remove("active")
            }
        })
        boton.classList.toggle("active")
    })

})

contenedorTareas.addEventListener("click", (e) => {
    const elemento = e.target;
    
    if (elemento.closest(".tarea-pendiente")) {
        console.log("Se marcó como pendiente");
        const e = elemento.closest(".tarea")
        e.classList.forEach(clase => {
            if (clase === "completada") {
                e.classList.remove("completada")
            }else{
                e.classList.toggle("pendiente")
            }

        });
    }

    if (elemento.closest(".tarea-completa")) {
        console.log("Se marcó como completada");
        const e = elemento.closest(".tarea")
        e.classList.forEach(clase => {
            if (clase === "pendiente") {
                e.classList.remove("pendiente")
            }else{
                e.classList.toggle("completada")
            }

        });

    }

    if (elemento.closest(".tarea-eliminar")) {
        const tarea = elemento.closest(".tarea");
        tarea.remove();
        console.log("Tarea eliminada");
    }
    
    
});
