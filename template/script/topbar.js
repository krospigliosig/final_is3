document.addEventListener('DOMContentLoaded', function() {
      const profileIcon = document.getElementById('profile-icon');
      const dropdownContent = document.querySelector('.dropdown-content');

      profileIcon.addEventListener('click', function(e) {
        e.stopPropagation();
        e.preventDefault();
        dropdownContent.classList.toggle('show-dropdown');
      });

      document.addEventListener('click', function(e) {
        if (!dropdownContent.contains(e.target) && e.target !== profileIcon) {
          dropdownContent.classList.remove('show-dropdown');
        }
      });
      dropdownContent.addEventListener('click', function(e) {
        e.stopPropagation();
      });
    });
  
  document.addEventListener('DOMContentLoaded', () => {
  // ... ya estaba configurado fetch y renderizarArticulos()

  const enlacesFiltro = document.querySelectorAll('.filtro-categoria');
  enlacesFiltro.forEach(enlace => {
    enlace.addEventListener('click', e => {
      e.preventDefault();
      const categoriaSeleccionada = enlace.getAttribute('data-categoria');
      renderizarArticulos(categoriaSeleccionada);
    });
  });

  // Mostrar/ocultar el dropdown
  const dropdownToggle = document.getElementById('dropdownToggle');
  const dropdown = document.querySelector('.dropdown-categoria');

  dropdownToggle.addEventListener('click', e => {
    e.preventDefault();
    dropdown.classList.toggle('open');
  });

  // Cerrar dropdown si haces clic afuera
  document.addEventListener('click', e => {
    if (!dropdown.contains(e.target)) {
      dropdown.classList.remove('open');
    }
  });
});

  let articulosGlobal = []; // Guardamos los artículos cargados del JSON

  document.addEventListener('DOMContentLoaded', () => {
    fetch('data/articulos.json')
      .then(response => response.json())
      .then(data => {
        articulosGlobal = data; // Guardamos la data global
        renderizarArticulos('Todos'); // Mostramos todos al inicio
      })
      .catch(error => console.error('Error al cargar los artículos:', error));

    // Configurar los filtros de categoría
    const enlacesFiltro = document.querySelectorAll('.filtro-categoria');
    enlacesFiltro.forEach(enlace => {
      enlace.addEventListener('click', e => {
        e.preventDefault();
        const categoriaSeleccionada = enlace.getAttribute('data-categoria');
        renderizarArticulos(categoriaSeleccionada);
      });
    });
  });

  function renderizarArticulos(categoria) {
    const container = document.getElementById('cards-container');
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
      card.href = 'descripcion.html';
      const claseDisponibilidad = item.disponibilidad.toLowerCase() === 'disponible'
      ? 'disponible'
      : 'no-disponible';
      card.innerHTML = `
        <img src="${item.imagen}" alt="${item.nombre_articulo}">
        <h3>${item.nombre_articulo}</h3>
        <div class="card-content">
          <div class="info-line">
            <span class="info-icon">🏷️</span>
            <span>Categoría: ${item.categoria}</span> <span class="disponibilidad ${claseDisponibilidad}">${item.disponibilidad}</span>
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

  document.addEventListener('DOMContentLoaded', () => {
  fetch('data/usuario.json')
    .then(response => response.json())
    .then(usuario => {
      const nombreUsuario = document.getElementById('nombre-usuario');
      const estadoUsuario = document.getElementById('estado-usuario');

      nombreUsuario.textContent = usuario.nombre;

      if (usuario.estado.toLowerCase() === 'activo') {
        estadoUsuario.textContent = '● Activo';
        estadoUsuario.classList.add('estado-activo');
      } else {
        estadoUsuario.textContent = '● Bloqueado';
        estadoUsuario.classList.add('estado-bloqueado');
      }
    })
    .catch(error => {
      console.error('Error al cargar datos del usuario:', error);
    });
});
