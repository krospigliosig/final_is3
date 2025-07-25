// cards.js
let articulosGlobal = [];

document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const categoria = params.get('categoria');

  fetch('/articulo/api/articulos/')
    .then(response => response.json())
    .then(data => {
      articulosGlobal = data;
      renderizarArticulos(categoria || 'Todos');
      renderizarNuevosArticulos();
    })
    .catch(error => console.error('Error al cargar los artículos:', error));
});

function renderizarArticulos(categoria) {
  const container = document.getElementById('cards-container');
  if (!container) return;

  container.innerHTML = '';

  const filtrados = categoria === 'Todos'
    ? articulosGlobal
    : articulosGlobal.filter(item => item.categoria.toLowerCase() === categoria.toLowerCase());

  if (filtrados.length === 0) {
    container.innerHTML = `<p>No hay artículos disponibles para esta categoría.</p>`;
    return;
  }

  filtrados.forEach(item => {
    const card = document.createElement('a');
    card.className = 'card';
    card.href = `descripcion.html?id=${encodeURIComponent(item.id)}`;
    const claseDisponibilidad = item.disponibilidad.toLowerCase() === 'disponible'
      ? 'disponible'
      : 'no-disponible';

    card.innerHTML = `
      <img src="${item.imagen}" alt="${item.nombre_articulo}">
      <h3>${item.nombre_articulo}</h3>
      <div class="card-content">
        <div class="info-line">
          <span class="info-icon">🏷️</span>
          <span>Categoría: ${item.categoria}</span>
          <span class="disponibilidad ${claseDisponibilidad}">${item.disponibilidad}</span>
        </div>
        <div class="info-line">
          <span class="info-icon">🔄</span>
          <span>Estado: ${item.estado}</span>
        </div>
        <div class="info-line">
          <span class="info-icon">📍</span>
          <span>Lugar: ${item.lugar}</span>
        </div>
        <div class="info-line">
          <span class="info-icon">⏱</span>
          <span>Tiempo máximo: ${item.tiempo_maximo}</span>
        </div>
      </div>
    `;
    container.appendChild(card);
  });
}

function renderizarNuevosArticulos() {
  const contenedor = document.getElementById('nuevos-articulos');
  if (!contenedor) return;

  // Ordenar por fecha de subida (de más reciente a más antiguo)
  const recientes = [...articulosGlobal]
    .sort((a, b) => new Date(b.fecha_subida) - new Date(a.fecha_subida))
    .slice(0, 6); // Tomar los 5 primeros

  recientes.forEach(item => {
    const claseDisponibilidad = item.disponibilidad.toLowerCase() === 'disponible'
      ? 'disponible'
      : 'no-disponible';

    const card = document.createElement('a');
    card.className = 'small-card';
    card.href = `descripcion.html?id=${encodeURIComponent(item.id)}`;

    card.innerHTML = `
      <img src="${item.imagen}" alt="${item.nombre_articulo}">
      <h4>${item.nombre_articulo}</h4>
      <div class="small-card-content">
        <div class="info-line">
          <span class="info-icon">🏷️</span>
          <span>Categoría: ${item.categoria}</span>
          <span class="disponibilidad ${claseDisponibilidad}">${item.disponibilidad}</span>
        </div>
        <div class="info-line">
          <span class="info-icon">🔄</span>
          <span>Estado: ${item.estado}</span>
        </div>
        <div class="info-line">
          <span class="info-icon">📍</span>
          <span>Lugar: ${item.lugar}</span>
        </div>
        <div class="info-line">
          <span class="info-icon">⏱</span>
          <span>Tiempo máximo: ${item.tiempo_maximo}</span>
        </div>
      </div>
    `;
    contenedor.appendChild(card);
  });
}
