document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const idArticulo = params.get('id');

  if (!idArticulo) {
    document.body.innerHTML = '<p>Error: ID del artículo no proporcionado.</p>';
    return;
  }

  fetch('data/articulos_admin.json')
    .then(res => res.json())
    .then(data => {
      const articulo = data.find(item => item.id === idArticulo);
      if (!articulo) {
        document.body.innerHTML = '<p>Artículo no encontrado.</p>';
        return;
      }

      // Reemplaza contenido en el HTML con los datos del artículo
      document.querySelector('#imagen-articulo').src = articulo.imagen || 'img/no-disponible.png';
      document.querySelector('#imagen-articulo').alt = articulo.nombre;

      document.querySelector('#nombre-articulo').textContent = articulo.nombre;
      document.querySelector('#descripcion-articulo').textContent = articulo.descripcion;
      document.querySelector('#categoria-articulo').textContent = articulo.categoria;
      document.querySelector('#estado-articulo').textContent = articulo.estado;
      document.querySelector('#codigo-articulo').textContent = articulo.id;
      document.querySelector('#disponibilidad-articulo').textContent = articulo.disponibilidad ? "Disponible" : "No disponible";
      document.querySelector('#prestamo-articulo').textContent = `${articulo.prestamo} días`;
      document.querySelector('#plazo-articulo').textContent = `${articulo.plazo} días`;
      document.querySelector('#ubicacion-articulo').textContent = articulo.ubicacion;
      document.querySelector('#horario-articulo').textContent = articulo.horario;
      
      const btnReservar = document.getElementById('btn-reservar');
      const btnCarrito = document.getElementById('btn-carrito');
      const contenedorBotones = document.getElementById('botones-articulo');

      if (!articulo.disponibilidad) {
        // Oculta los botones normales
        btnReservar.style.display = 'none';
        btnCarrito.style.display = 'none';

        // Crea el botón de "Lista de espera"
        const btnListaEspera = document.createElement('button');
        btnListaEspera.textContent = 'Unirse a lista de espera';
        btnListaEspera.className = 'btn btn-lista-espera';
        contenedorBotones.appendChild(btnListaEspera);
      }
    })
    .catch(err => {
      console.error('Error cargando el artículo:', err);
      document.body.innerHTML = '<p>Error cargando la información del artículo.</p>';
    });
});
