document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const idArticulo = params.get('id');

  if (!idArticulo) {
    document.body.innerHTML = '<p>Error: ID del artículo no proporcionado.</p>';
    return;
  }

  fetch(`http://127.0.0.1:8000/articulos/${idArticulo}`)
    .then(res => res.json())
    .then(articulo => {
      if (!articulo || !articulo.nombre_art) {
        document.body.innerHTML = '<p>Artículo no encontrado.</p>';
        return;
      }

      // Reemplaza contenido en el HTML con los datos del artículo
      document.querySelector('#imagen-articulo').src = articulo.imagen || 'img/no-disponible.png';
      document.querySelector('#imagen-articulo').alt = articulo.nombre_art;

      document.querySelector('#nombre-articulo').textContent = articulo.nombre_art;
      document.querySelector('#descripcion-articulo').textContent = articulo.descripcion;
      document.querySelector('#categoria-articulo').textContent = articulo.categoria;
      document.querySelector('#estado-articulo').textContent = articulo.estado_art;
      document.querySelector('#codigo-articulo').textContent = articulo.id_art;
      document.querySelector('#disponibilidad-articulo').textContent = articulo.disponible ? "Disponible" : "No disponible";
      document.querySelector('#prestamo-articulo').textContent = `${articulo.dias_prestamo} días`;
      document.querySelector('#plazo-articulo').textContent = `${articulo.dias_plazo} días`;
      document.querySelector('#ubicacion-articulo').textContent = articulo.ubicacion;
      document.querySelector('#horario-articulo').textContent = articulo.horario;

      const btnReservar = document.getElementById('btn-reservar');
      const btnCarrito = document.getElementById('btn-carrito');
      const contenedorBotones = document.getElementById('botones-articulo');

      btnReservar.addEventListener('click', () => {
        alert('Artículo reservado');
      });

      btnCarrito.addEventListener('click', () => {
        alert('Artículo agregado al carrito');
      });

      if (!articulo.disponible) {
        btnReservar.style.display = 'none';
        btnCarrito.style.display = 'none';

        const btnListaEspera = document.createElement('button');
        btnListaEspera.textContent = 'Unirse a lista de espera';
        btnListaEspera.className = 'btn btn-lista-espera';
        contenedorBotones.appendChild(btnListaEspera);

        btnListaEspera.addEventListener('click', () => {
          fetch('data/lista_espera.json') // O una futura API real
            .then(res => res.json())
            .then(listas => {
              const listaArticulo = listas.find(entry => entry.id_articulo == idArticulo);
              const usuariosEnCola = listaArticulo ? listaArticulo.cola_usuarios.length : 0;

              const numeroEspera = usuariosEnCola + 1;
              const diasEstimados = parseInt(articulo.dias_prestamo) * usuariosEnCola;
              const hoy = new Date();
              hoy.setDate(hoy.getDate() + diasEstimados);
              const fechaEstimada = hoy.toLocaleDateString('es-ES');

              document.getElementById('numero-espera').textContent = `#${numeroEspera}`;
              document.getElementById('fecha-estimada').textContent = `Fecha estimada: ${fechaEstimada}`;
              document.getElementById('modal-espera').style.display = 'block';
            })
            .catch(err => {
              console.error('Error al cargar lista de espera:', err);
              alert('No se pudo acceder a la lista de espera');
            });
        });

        // Cerrar modal al hacer clic fuera
        window.addEventListener('click', function (e) {
          const modal = document.getElementById('modal-espera');
          if (e.target === modal) {
            modal.style.display = 'none';
          }
        });

        // Confirmar lista de espera
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
