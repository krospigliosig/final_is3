document.addEventListener('DOMContentLoaded', () => {
  fetch('data/carrito.json')
    .then(response => response.json())
    .then(data => {
      renderizarTabla(data);
    })
    .catch(error => console.error('Error al cargar el carrito:', error));
});

function renderizarTabla(articulos) {
  const tbody = document.getElementById('tabla-carrito-body');
  tbody.innerHTML = ''; // Limpiar contenido anterior

  articulos.forEach((item, index) => {
    const fila = document.createElement('tr');
    fila.className = index % 2 === 0 ? 'fila-negra' : 'fila-blanca';

    fila.innerHTML = `
      <td>${item.id}</td>
      <td>${item.nombre}</td>
      <td>${item.categoria}</td>
      <td><button class="btn-eliminar">Eliminar</button></td>
    `;

    tbody.appendChild(fila);
  });
}
