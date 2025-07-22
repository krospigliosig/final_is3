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

        // Evento click en el botón de lista de espera
        btnListaEspera.addEventListener('click', () => {
          fetch('data/lista_espera.json')
            .then(res => res.json())
            .then(listas => {
              const listaArticulo = listas.find(entry => entry.id_articulo === idArticulo);
              const usuariosEnCola = listaArticulo ? listaArticulo.cola_usuarios.length : 0;

              const numeroEspera = usuariosEnCola + 1;

              // Calcular fecha estimada
              const diasEstimados = parseInt(articulo.prestamo) * usuariosEnCola;
              const hoy = new Date();
              hoy.setDate(hoy.getDate() + diasEstimados);
              const fechaEstimada = hoy.toLocaleDateString('es-ES');

              // Mostrar popup con datos
              document.getElementById('numero-espera').textContent = `#${numeroEspera}`;
              document.getElementById('fecha-estimada').textContent = `Fecha estimada: ${fechaEstimada}`;
              
              document.getElementById('modal-espera').style.display = 'block';
            })
            .catch(err => {
              console.error('Error al cargar lista de espera:', err);
              alert('No se pudo acceder a la lista de espera');
            });
        });
        // También cerrar si se hace clic fuera del modal
        window.addEventListener('click', function(e) {
          const modal = document.getElementById('modal-espera');
          if (e.target === modal) {
            modal.style.display = 'none';
          }
        });

        // Botón de confirmar espera
        document.getElementById('confirmar-espera').addEventListener('click', () => {
          document.getElementById('modal-espera').style.display = 'none';
          alert('Tu solicitud ha sido registrada.');
        });
      }
    })
    .catch(err => {
      console.error('Error cargando el artículo:', err);
      document.body.innerHTML = '<p>Error cargando la información del artículo.</p>';
    });
});
