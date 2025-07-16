document.addEventListener('DOMContentLoaded', () => {
  fetch('data/historial_user.json')
    .then(response => response.json())
    .then(data => {
      renderizarTabla(data);
    })
    .catch(error => console.error('Error al cargar el historial:', error));
});

function renderizarTabla(articulos) {
  const tbody = document.getElementById('tabla-body');
  tbody.innerHTML = ''; // Limpiar contenido anterior

  articulos.forEach((item, index) => {
    const fila = document.createElement('tr');
    fila.className = index % 2 === 0 ? 'fila-negra' : 'fila-blanca';

    fila.innerHTML = `
      <td>${item.id}</td>
      <td>${item.nombre}</td>
      <td>${item.categoria}</td>
      <td>${item.fecha_reserva}</td>
      <td>${item.fecha_devuelta}</td>
    `;

    tbody.appendChild(fila);
  });
}
