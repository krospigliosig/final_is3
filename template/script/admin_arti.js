let articulos = []; // variable global para acceder al artículo seleccionado
let articuloEditando = null;

document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('modal-articulo');
  const cerrar = document.getElementById('cerrar-modal');
  const btnAbrir = document.getElementById('btn-anadir');
  const form = document.getElementById('form-articulo');

  // Cargar JSON
  fetch('data/articulos_admin.json')
    .then(response => response.json())
    .then(data => {
      articulos = data; // almacenar en variable global
      renderizarTabla(articulos);
    })
    .catch(error => console.error('Error al cargar los artículos:', error));

  // Mostrar modal para añadir nuevo
  btnAbrir.addEventListener('click', () => {
    form.reset();
    articuloEditando = null;
    document.getElementById('titulo-modal').textContent = 'Añadir Nuevo Artículo';
    document.getElementById('btn-submit-articulo').textContent = 'Añadir +';
    modal.style.display = 'block';
  });

  // Cerrar modal
  cerrar.addEventListener('click', () => modal.style.display = 'none');
  window.addEventListener('click', e => {
    if (e.target === modal) modal.style.display = 'none';
  });

  // Guardar nuevo o editado
  form.addEventListener('submit', e => {
    e.preventDefault();
    const datos = Object.fromEntries(new FormData(form));

    if (articuloEditando) {
      // Editar existente
      Object.assign(articuloEditando, {
        nombre: datos.nombre,
        categoria: datos.categoria,
        disponibilidad: datos.estado === 'Disponible',
        prestamo: datos.prestamo_dias,
        plazo: datos.plazo_max,
        ubicacion: datos.ubicacion,
        horario: datos.horario,
        descripcion: datos.descripcion
      });
    } else {
      // Añadir nuevo (asignar ID automático como ejemplo)
      const nuevo = {
        id: String(Date.now()),
        nombre: datos.nombre,
        categoria: datos.categoria,
        disponibilidad: datos.estado === 'Disponible',
        prestamo: datos.prestamo_dias,
        plazo: datos.plazo_max,
        ubicacion: datos.ubicacion,
        horario: datos.horario,
        descripcion: datos.descripcion
      };
      articulos.push(nuevo);
    }

    renderizarTabla(articulos);
    modal.style.display = 'none';
    form.reset();
  });

  // Buscador
  document.getElementById('input-busqueda').addEventListener('input', function () {
    const filtro = this.value.toLowerCase();
    const filas = document.querySelectorAll('#tabla-body tr');

    filas.forEach(fila => {
      const textoFila = fila.innerText.toLowerCase();
      fila.style.display = textoFila.includes(filtro) ? '' : 'none';
    });
  });
});

function renderizarTabla(articulos) {
  const tbody = document.getElementById('tabla-body');
  tbody.innerHTML = '';

  articulos.forEach((item, index) => {
    const fila = document.createElement('tr');
    fila.className = index % 2 === 0 ? 'fila-negra' : 'fila-blanca';

    const disponibleTexto = item.disponibilidad ? 'Disponible' : 'No disponible';
    const colorPunto = item.disponibilidad ? 'azul' : 'rojo';

    fila.innerHTML = `
      <td>${item.id}</td>
      <td>${item.nombre}</td>
      <td>${item.categoria}</td>
      <td>
        <span class="estado-disponibilidad ${colorPunto}" data-id="${item.id}" data-estado="${item.disponibilidad}">
          ● ${disponibleTexto}
        </span>
      </td>
      <td><button class="btn-historial"><i class="fa-regular fa-clock"></i></button></td>
      <td><button class="btn-editar"><i class="fa-regular fa-pen-to-square"></i></button></td>
      <td><button class="btn-eliminar"><i class="fa-regular fa-trash-can"></i></button></td>
    `;

    // Botón editar
    fila.querySelector('.btn-editar').addEventListener('click', () => {
      abrirModalEdicion(item);
    });

    tbody.appendChild(fila);
  });

  agregarListenersCambioDisponibilidad();
}

function agregarListenersCambioDisponibilidad() {
  const estados = document.querySelectorAll('.estado-disponibilidad');

  estados.forEach(estado => {
    estado.addEventListener('click', () => {
      const disponible = estado.getAttribute('data-estado') === 'true';
      const nuevoDisponible = !disponible;

      estado.setAttribute('data-estado', nuevoDisponible);
      estado.classList.toggle('azul', nuevoDisponible);
      estado.classList.toggle('rojo', !nuevoDisponible);
      estado.innerHTML = `● ${nuevoDisponible ? 'Disponible' : 'No disponible'}`;
    });
  });
}

function abrirModalEdicion(item) {
  const modal = document.getElementById('modal-articulo');
  const form = document.getElementById('form-articulo');

  form.nombre.value = item.nombre;
  form.categoria.value = item.categoria;
  form.estado.value = item.disponibilidad ? 'Disponible' : 'No disponible';
  form.prestamo_dias.value = item.prestamo;
  form.plazo_max.value = item.plazo;
  form.ubicacion.value = item.ubicacion;
  form.horario.value = item.horario;
  form.descripcion.value = item.descripcion;

  articuloEditando = item;
  document.getElementById('titulo-modal').textContent = 'Editar Artículo';
  document.getElementById('btn-submit-articulo').textContent = 'Editar Artículo';
  modal.style.display = 'block';
}
