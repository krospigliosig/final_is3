document.addEventListener('DOMContentLoaded', () => {
  const id = parseInt(localStorage.getItem('articulo_id'));
  const nombre = localStorage.getItem('articulo_nombre');

  const titulo = document.getElementById('titulo-historial');
  titulo.textContent = `Historial de ${nombre} (ID: ${id})`;

  fetch(`http://127.0.0.1:8000/historial/articulo/${id}`)
    .then(res => res.json())
    .then(data => {
      renderizarTabla(data);
    })
    .catch(err => console.error('Error al cargar historial:', err));

  document.getElementById('input-busqueda').addEventListener('input', function () {
    const filtro = this.value.toLowerCase();
    const filas = document.querySelectorAll('#tabla-body tr');

    filas.forEach(fila => {
      const textoFila = fila.innerText.toLowerCase();
      fila.style.display = textoFila.includes(filtro) ? '' : 'none';
    });
  });
});

function formatearFecha(fechaISO) {
  if (!fechaISO) return '--/--/--';
  const fecha = new Date(fechaISO);
  return fecha.toLocaleDateString('es-PE');
}

function renderizarTabla(registros) {
  const tbody = document.getElementById('tabla-body');
  tbody.innerHTML = ''; // Limpiar contenido anterior

  registros.forEach((item, index) => {
    const fila = document.createElement('tr');
    fila.className = index % 2 === 0 ? 'fila-negra' : 'fila-blanca';

    const fechaReserva = formatearFecha(item.fecha_reserva);
    const fechaDevuelta = formatearFecha(item.fecha_devuelta);

    const botonesAcciones = item.fecha_devuelta === null
      ? `
        <td><button class="btn-reportar"><i class="fa-solid fa-triangle-exclamation"></i></button></td>
        <td><button class="btn-bloquear"><i class="fa-solid fa-ban"></i></button></td>
        <td><button class="btn-confirmar"><i class="fa-solid fa-check"></i></button></td>
      `
      : `<td colspan="3"></td>`; // deja columnas vacías si ya se devolvió

    fila.innerHTML = `
      <td>${item.id_usuario}</td>
      <td>${item.nombre_usuario}</td>
      <td>${item.correo}</td>
      <td>${fechaReserva}</td>
      <td>${fechaDevuelta}</td>
      ${botonesAcciones}
    `;

    tbody.appendChild(fila);
  });
}
