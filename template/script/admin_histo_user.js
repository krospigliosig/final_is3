document.addEventListener('DOMContentLoaded', () => {
  const id = localStorage.getItem('usuario_id');
  const nombre = localStorage.getItem('usuario_nombre');

  const titulo = document.getElementById('titulo-historial');
  titulo.textContent = `Historial de ${nombre} (ID: ${id})`;

  fetch('data/historial_user.json')
    .then(res => res.json())
    .then(data => {
      //const historial = data.filter(item => item.id_articulo === id);

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

function renderizarTabla(registros) {
  const tbody = document.getElementById('tabla-body');
  tbody.innerHTML = ''; // Limpiar contenido anterior

  registros.forEach((item, index) => {
    const fila = document.createElement('tr');
    fila.className = index % 2 === 0 ? 'fila-negra' : 'fila-blanca';

    const fechaDevuelta = item.fecha_devuelta ? item.fecha_devuelta : '--/--/--';

    // Mostrar botones solo si la fecha de devolución es null
    const botonesAcciones = item.fecha_devuelta === null
      ? `
        <td><button class="btn-reportar"><i class="fa-solid fa-triangle-exclamation"></i></button></td>
        <td><button class="btn-bloquear"><i class="fa-solid fa-ban"></i></button></td>
        <td><button class="btn-confirmar"><i class="fa-solid fa-check"></i></button></td>
      `
      : `<td colspan="3"></td>`; // deja columnas vacías si ya se devolvió

    fila.innerHTML = `
      <td>${item.id}</td>
      <td>${item.nombre}</td>
      <td>${item.categoria}</td>
      <td>${item.fecha_reserva}</td>
      <td>${fechaDevuelta}</td>
      ${botonesAcciones}
    `;

    tbody.appendChild(fila);
  });
}
