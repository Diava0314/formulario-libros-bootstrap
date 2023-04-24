import "./main.css";

type Libro = {
  autor: string;
  tema: string;
  publicacion: number;
};

let libro: Libro = {
  autor: "",
  tema: "",
  publicacion: 0,
};

document.querySelector<HTMLDivElement>("#app")!.innerHTML = /*html*/ `
<main>
<header>
  <nav class="navbar bg-success p-3">
    <p class="text-light mb-0">Literatura</p>
  </nav>
</header>
<div class="container-fluid py-2">
  <div class="row">
    <div class="col-12">
    <div id="mensaje"></div>
      <h3>Libros</h3>
    <div>
  </div>
  <div class="row">
    <div class="col-12" >
      <form class="row gy-3" id="formulario-libros">
        <div class="col-md-3">
          <label for="autor" class="form-label">Autor</label>
          <input name="autor" id="autor" class="form-control" />
        </div>
        <div class="col-md-3">
          <label for="tema" class="form-label">Tema</label>
          <input name="tema" id="tema" class="form-control" />
        </div>
        <div class="col-md-3">
          <label for="publicacion" class="form-label">Publicaciòn</label>
          <input name="publicacion" id="publicacion" class="form-control" />
        </div>
        <div class="col-md-6">
        <button class="btn btn-outline-success">Buscar</button>
        </div>
      </form>
     </div>
       <div class="col-12">
    <div class="row gy-3" id="lista-libros" ></div>
     </div>
    </div>
</div>
</main>
`;

const autor = document.querySelector<HTMLInputElement>('[name="autor"]')!;
const tema = document.querySelector<HTMLInputElement>('[name="tema"]')!;
const publicacion = document.querySelector<HTMLInputElement>(
  '[name="publicacion"]'
)!;
const formularioLibros = document.getElementById(
  "formulario-libros"
)! as HTMLFormElement;
const listaLibros = document.getElementById("lista-libros")! as HTMLDivElement;
const mensaje = document.getElementById("mensaje")! as HTMLDivElement;

autor.addEventListener("input", (event) => {
  libro.autor = (event.target as HTMLInputElement).value;
});
tema.addEventListener("input", (event) => {
  libro.tema = (event.target as HTMLInputElement).value;
});
publicacion.addEventListener("input", (event) => {
  libro.publicacion = Number((event.target as HTMLInputElement).value);
});

function formularioEsValido() {
  if (libro.autor === "") return false;
  if (libro.tema === "") return false;
  if (libro.publicacion <= 0) return false;
  return true;
}

formularioLibros.addEventListener("submit", (event) => {
  event.preventDefault();
  const esValido = formularioEsValido();
  if (esValido) {
    CrearLibro();
    reset();
    mensaje.innerHTML = /*html*/ `
    <div class="alert alert-success alert-dismissible" role="alert" >
    Los datos se han enviadode manera exitosa.
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
    `;
  } else {
    mensaje.innerHTML = /*html*/ `
    <div class="alert alert-danger alert-dismissible" role="alert">
    Tu datos no se encuentran en la base de datos
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
    `;
  }

  const close = document.querySelector<HTMLButtonElement>(
    '[aria-label="Close"]'
  )!;
  close.addEventListener("click", () => {
    mensaje.innerHTML = "";
  });
});

function reset() {
  libro = {
    autor: "",
    tema: "",
    publicacion: 0,
  };
  formularioLibros.reset();
}

function CrearLibro() {
  const div = document.createElement("div");
  div.classList.add("col-md-4");
  div.innerHTML = /*html*/ `
 <div class="card">
 <div class="card-body">
  <p class="card-text"><b>Autor:</b>${libro.autor}</p>
  <p class="card-text"><b>Tema:</b>${libro.tema}</p>
  <p class="card-text"><b>Publicaciòn:</b>${libro.publicacion}</p>
 </div>
</div>

`;
  listaLibros.appendChild(div);
}
