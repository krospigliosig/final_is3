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
fetch(USUARIO_JSON_URL)
  .then(response => response.json())
  .then(usuario => {
    const nombreUsuario = document.getElementById('nombre-usuario');
    const estadoUsuario = document.getElementById('estado-usuario');
    const navCategorias = document.querySelector('.nav-categorias');

    nombreUsuario.textContent = usuario.nombre;

    if (usuario.rol.toLowerCase() === 'admin') {
      estadoUsuario.textContent = 'Admin';
      estadoUsuario.classList.add('estado-admin');

      // Crear enlaces de administración
      const linkUsuarios = document.createElement('a');
      linkUsuarios.href = 'admin_usuarios.html';
      linkUsuarios.textContent = 'Usuarios';
      linkUsuarios.classList.add('admin-link');

      const linkArticulos = document.createElement('a');
      linkArticulos.href = 'admin_articulos.html';
      linkArticulos.textContent = 'Artículos';
      linkArticulos.classList.add('admin-link');

      navCategorias.insertBefore(linkUsuarios, navCategorias.children[0]);
      navCategorias.insertBefore(linkArticulos, navCategorias.children[1]);

    } else if (usuario.estado.toLowerCase() === 'activo') {
        estadoUsuario.textContent = '● Activo';
        estadoUsuario.classList.add('estado-activo');
      } else {
        estadoUsuario.textContent = '● Bloqueado';
        estadoUsuario.classList.add('estado-bloqueado');
        fetch(PRESTAMO_JSON_URL) 
          .then(res => res.json())
          .then(prestamo => {
            const fechaReserva = new Date(prestamo.fecha_reserva);
            const diasMaximo = parseInt(prestamo.prestamo_maximo);
            const fechaLimite = new Date(fechaReserva);
            fechaLimite.setDate(fechaReserva.getDate() + diasMaximo);
            const hoy = new Date();
            const diasRetraso = Math.max(
              Math.ceil((hoy - fechaLimite) / (1000 * 60 * 60 * 24)),
              0
            );

            // Mostrar en el modal
            document.getElementById('nombre-usuario-bloqueado').textContent = `Estimado/a ${usuario.nombre},`;
            document.getElementById('nombre-articulo').textContent = `${prestamo.nombre_articulo} – Cód. ${prestamo.id_articulo}`;
            document.getElementById('fecha-reserva').textContent = prestamo.fecha_reserva;
            document.getElementById('fecha-limite').textContent = fechaLimite.toLocaleDateString();
            document.getElementById('dias-retraso').textContent = diasRetraso;

            document.getElementById('modal-bloqueado').style.display = 'flex';
          });
      }
    }
  )
  .catch(error => {
    console.error('Error al cargar datos del usuario:', error);
  });

const cerrarSesionBtn = document.getElementById('cerrar-sesion');

cerrarSesionBtn.addEventListener('click', function (e) {
  e.preventDefault();

  // Elimina cualquier info guardada si fuera necesario
  localStorage.clear();
  sessionStorage.clear();

  // Puedes también eliminar cookies aquí si las usas

  // Redirige a login.html
  window.location.href = 'login.html';
});

});
