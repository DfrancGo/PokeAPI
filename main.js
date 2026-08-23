//elementos del HTML
const imagen = document.querySelector(".random-image");
const botonRecarga = document.querySelector("#reload-btn");
const botonGuardar = document.querySelector("#save-btn");
const listaPokemon = document.querySelector("#pokemon-list");
const main = document.querySelector("main");
const contenedorNombre = document.querySelector("#name-container")

//Array donde guardo los pokemones
let misPokemones = [];
//Variables para guardar nombre y foto del pokemon que se muestra
let nombreActual = "";
let fotoActual = "";

function cargarPokemon() {
    //Número aleatorio:
    const random = Math.floor(Math.random() * 151) + 1;
    fetch(`https://pokeapi.co/api/v2/pokemon/${random}`)
        .then((res) => res.json())
        .then((pokemon) => {
            imagen.src = pokemon.sprites.other.dream_world.front_default;
            imagen.alt = pokemon.name;
            nombreActual = pokemon.name.toUpperCase();
            fotoActual = pokemon.sprites.other.dream_world.front_default;

            // Buscamos si ya existe un h2 con el nombre y lo actualizamos que si no se me pone uno encima del otro cuando se carga otro pokemon xd
            let titulo = main.querySelector("h2");
            if (!titulo) {
                titulo = document.createElement("h2");
                contenedorNombre.appendChild(titulo);
            }
            titulo.textContent = nombreActual;
        });
}

//Cargar al abrir la página por lo tanto cada vez que se actualice la pagina mostrará un pokemon distinto
cargarPokemon();

//Botón recarga pide otro pokemon llamando a la función de arriba
botonRecarga.addEventListener("click", () => {
    cargarPokemon();
});

//Botón guardar: añade el pokemon actual y carga otro
botonGuardar.addEventListener("click", () => {
    // Si ya está en el array, no lo duplicamos
    if (misPokemones.some((p) => p.nombre === nombreActual)) {
        alert(`${nombreActual} ya está en tu lista`);
        return;
    }

    // Capturamos el pokemon actual (nombre y foto) en un objeto
    const pokemonAGuardar = { nombre: nombreActual, foto: fotoActual };

    // Si ya hay 6, avisamos antes de borrar
    if (misPokemones.length >= 6) {
        const continuar = confirm(
            "Ya tienes 6 pokemones. Si continúas, perderás los actuales. ¿Quieres seguir?"
        );
        if (!continuar) return;

        // Limpiamos la lista pero conservamos el pokemon que se quiso guardar
        misPokemones = [];
        listaPokemon.innerHTML = "";
        misPokemones.push(pokemonAGuardar);
        renderPokemon(pokemonAGuardar, misPokemones.length);

        //Después de guardar, mostramos otro pokemon
        cargarPokemon();
        return;
    }

    // Si no hay límite, seguimos el flujo normal
    misPokemones.push(pokemonAGuardar);
    renderPokemon(pokemonAGuardar, misPokemones.length);

    //Después de guardar, mostramos otro pokemon
    cargarPokemon();
});

// Función para pintar un pokemon en la lista
function renderPokemon(pokemon, indice) {
    const li = document.createElement("li");

    const h4 = document.createElement("h4");
    h4.textContent = `${indice}. ${pokemon.nombre}`;
    li.appendChild(h4);

    // Clonamos la imagen del main para que no se vea afectada por
    // los siguientes cambios de `imagen.src` al recargar pokémon
    const imgLista = document.createElement("img");
    imgLista.src = pokemon.foto;
    imgLista.alt = pokemon.nombre;
    imgLista.classList.add("pokemon-list-img");
    li.appendChild(imgLista);

    listaPokemon.appendChild(li);
}

