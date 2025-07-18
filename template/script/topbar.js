// header.js
document.addEventListener('DOMContentLoaded', function () {
  // Menú de usuario
  const profileIcon = document.getElementById('profile-icon');
  const dropdownContent = document.querySelector('.dropdown-content');

  profileIcon.addEventListener('click', function (e) {
    e.stopPropagation();
    e.preventDefault();
    dropdownContent.classList.toggle('show-dropdown');
  });

  document.addEventListener('click', function (e) {
    if (!dropdownContent.contains(e.target) && e.target !== profileIcon) {
      dropdownContent.classList.remove('show-dropdown');
    }
  });

  dropdownContent.addEventListener('click', function (e) {
    e.stopPropagation();
  });

  // Filtro de categorías y redirección
  const enlacesFiltro = document.querySelectorAll('.filtro-categoria');
  enlacesFiltro.forEach(enlace => {
    enlace.addEventListener('click', e => {
      const categoriaSeleccionada = enlace.getAttribute('data-categoria');
      const esHome = window.location.pathname.includes('home.html');

      if (esHome) {
        e.preventDefault();
        renderizarArticulos(categoriaSeleccionada); // ← definida en cards.js
      } else {
        e.preventDefault();
        window.location.href = `home.html?categoria=${encodeURIComponent(categoriaSeleccionada)}`;
      }
    });
  });

  // Menú desplegable "Más artículos"
  const dropdownToggle = document.getElementById('dropdownToggle');
  const dropdown = document.querySelector('.dropdown-categoria');

  dropdownToggle.addEventListener('click', e => {
    e.preventDefault();
    dropdown.classList.toggle('open');
  });

  document.addEventListener('click', e => {
    if (!dropdown.contains(e.target)) {
      dropdown.classList.remove('open');
    }
  });

  // Usuario info
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
