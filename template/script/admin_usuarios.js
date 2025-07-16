let usuarios = [];
document.addEventListener('DOMContentLoaded', () => {

  fetch('data/all_user.json')
    .then(res => res.json())
    .then(data => {
      usuarios = data;
      renderizarTabla(usuarios);
    })
    .catch(err => console.error('Error al cargar usuarios:', err));
  
    document.getElementById('input-busqueda').addEventListener('input', function () {
    const filtro = this.value.toLowerCase();
    const filas = document.querySelectorAll('#tabla-body tr');

    filas.forEach(fila => {
      const textoFila = fila.innerText.toLowerCase();
      fila.style.display = textoFila.includes(filtro) ? '' : 'none';
    });
  });
});

function renderizarTabla(usuarios) {
  const tbody = document.getElementById('tabla-body');
  tbody.innerHTML = ''; // Limpiar contenido anterior

  usuarios.forEach((item, index) => {
    const fila = document.createElement('tr');
    fila.className = index % 2 === 0 ? 'fila-negra' : 'fila-blanca';
    const estado_usuario = item.estado ? 'Activo' : 'Bloqueado';
    const colorPunto = item.estado ? 'verde' : 'rojo';
    fila.innerHTML = `
      <td>${item.id_usuario}</td>
      <td>${item.nombre}</td>
      <td>${item.correo}</td>
      <td>
        <span class="estado_tabla ${colorPunto}" data-id="${item.id_usuario}" data-estado="${item.estado}">
          ● ${estado_usuario}
        </span>
      </td>
      <td><button class="btn-historial" data-id="${item.id_usuario}" data-nombre="${item.nombre}"><i class="fa-regular fa-clock"></i></button></td>
      <td><button class="btn-eliminar"><i class="fa-regular fa-trash-can"></i></button></td>
      `;

    tbody.appendChild(fila);

    //boton ver
    document.querySelectorAll('.btn-historial').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        const nombre = btn.getAttribute('data-nombre');

        // Guardar en localStorage (alternativa: pasar en URL)
        localStorage.setItem('usuario_id', id);
        localStorage.setItem('usuario_nombre', nombre);

        // Redirigir a la nueva página
        window.location.href = 'admin_histo_user.html';
      });
    });
  });
  agregarListenersCambioEstado()
}

function agregarListenersCambioEstado() {
  const estados = document.querySelectorAll('.estado_tabla');

  estados.forEach(estado => {
    estado.addEventListener('click', () => {
      const activo = estado.getAttribute('data-estado') === 'true';
      const nuevoEstado = !activo;

      estado.setAttribute('data-estado', nuevoEstado);
      estado.classList.toggle('verde', nuevoEstado);
      estado.classList.toggle('rojo', !nuevoEstado);
      estado.innerHTML = `● ${nuevoEstado ? 'Activo' : 'Bloqueado'}`;
    });
  });
}
