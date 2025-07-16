document.getElementById('input-busqueda').addEventListener('input', function () {
  const filtro = this.value.toLowerCase();
  const filas = document.querySelectorAll('#tabla-body tr');

  filas.forEach(fila => {
    const textoFila = fila.innerText.toLowerCase();
    fila.style.display = textoFila.includes(filtro) ? '' : 'none';
  });
});

document.addEventListener('DOMContentLoaded', () => {
  fetch('data/articulos_admin.json')
    .then(response => response.json())
    .then(data => {
      renderizarTabla(data);
    })
    .catch(error => console.error('Error al cargar el carrito:', error));
});
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

    tbody.appendChild(fila);
  });

  // Activar toggles de estado luego de renderizar
  agregarListenersCambioDisponibilidad();
}

document.addEventListener('DOMContentLoaded', () => {
  const btnAbrir = document.getElementById('btn-anadir');
  const modal = document.getElementById('modal-articulo');
  const cerrar = document.getElementById('cerrar-modal');

  btnAbrir.addEventListener('click', () => {
    modal.style.display = 'block';
  });

  cerrar.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  window.addEventListener('click', e => {
    if (e.target === modal) modal.style.display = 'none';
  });

  // Guardar (puedes reemplazar esta lógica con guardar en BD)
  document.getElementById('form-articulo').addEventListener('submit', e => {
    e.preventDefault();
    alert('Artículo guardado (simulado). Aquí podrías hacer un POST a tu backend.');
    modal.style.display = 'none';
    e.target.reset();
  });
});
