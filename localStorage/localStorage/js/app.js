const tarea = document.getElementById("tarea");
const save = document.getElementById("save");
const lista = document.getElementById("lista");
const limpiar = document.getElementById("limpiar");

let contador = 0;

function cargarTareas() {
    const tareasGuardadas = localStorage.getItem("tareas");
    const contadorGuardado = localStorage.getItem("contador");

    if (contadorGuardado) contador = parseInt(contadorGuardado);

    if (tareasGuardadas) {
        const tareas = tareasGuardadas.split("|");
        tareas.forEach(t => {
            if (t.trim() !== "") agregarTarea(t, false);
        });
    }
}

function guardarTareas() {
    const tareas = [];
    const elementos = lista.querySelectorAll("li");
    elementos.forEach(li => {
        let texto = li.textContent;
        if (li.classList.contains("completada")) texto += "(ok)";
        tareas.push(texto);
    });
    localStorage.setItem("tareas", tareas.join("|"));
    localStorage.setItem("contador", contador);
}

function agregarTarea(texto, esNueva = true) {
    const li = document.createElement("li");
    li.textContent = texto.replace("(ok)", "");

    if (texto.endsWith("(ok)")) li.classList.add("completada");

    li.addEventListener("click", () => {
        li.classList.toggle("completada");
        guardarTareas();
    });

    lista.appendChild(li);

    if (esNueva) {
        guardarTareas();
    }
}

save.addEventListener("click", () => {
    const texto = tarea.value.trim();
    if (texto) {
        contador++;
        const textoConNumero = `Tarea ${contador}: ${texto}`;
        agregarTarea(textoConNumero);
        tarea.value = "";
        guardarTareas();
    }
});

limpiar.addEventListener("click", () => {

    localStorage.clear();
    
});

window.addEventListener("load", cargarTareas);
