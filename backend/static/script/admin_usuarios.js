let usuarios = [];
document.addEventListener('DOMContentLoaded', () => {

  fetch('http://127.0.0.1:8000/usuarios/')
    .then(res => res.json())
    .then(data => {
      usuarios = data.map(u => ({
        id_usuario: u.id_usuario,
        nombre: u.nombre_usuario,
        correo: u.correo,
        estado: u.estado,
        rol: u.rol
      }));

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
      <td><button class="btn-eliminar" data-id="${item.id_usuario}"><i class="fa-regular fa-trash-can"></i></button></td>

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
  CambioEstado()
  EliminarUsuario();
}

function CambioEstado() {
  const estados = document.querySelectorAll('.estado_tabla');

  estados.forEach(estado => {
    estado.addEventListener('click', () => {
      const activo = estado.getAttribute('data-estado') === 'true';
      const nuevoEstado = !activo;
      const userId = estado.getAttribute('data-id');

      // Actualizar visualmente
      estado.setAttribute('data-estado', nuevoEstado);
      estado.classList.toggle('verde', nuevoEstado);
      estado.classList.toggle('rojo', !nuevoEstado);
      estado.innerHTML = `● ${nuevoEstado ? 'Activo' : 'Bloqueado'}`;

      // Llamar API para actualizar estado en backend
      fetch(`http://127.0.0.1:8000/usuarios/${userId}/toggle-estado`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(res => {
        if (!res.ok) throw new Error('Error al actualizar estado');
        return res.json();
      })
      .then(data => {
        console.log(`Estado actualizado para usuario ${userId}`);
      })
      .catch(err => {
        console.error('Error en toggle estado:', err);
        alert('No se pudo cambiar el estado en el servidor.');
      });
    });
  });
}

function EliminarUsuario() {
  const botonesEliminar = document.querySelectorAll('.btn-eliminar');

  botonesEliminar.forEach(boton => {
    boton.addEventListener('click', () => {
      const userId = boton.getAttribute('data-id');
      const confirmar = confirm(`¿Estás seguro de eliminar al usuario con ID ${userId}?`);

      if (!confirmar) return;

      fetch(`http://127.0.0.1:8000/usuarios/${userId}`, {
        method: 'DELETE'
      })
      .then(res => {
        if (!res.ok) throw new Error('Error al eliminar');
        // Eliminar del array local y re-renderizar
        usuarios = usuarios.filter(u => u.id_usuario !== userId);
        renderizarTabla(usuarios);
      })
      .catch(err => {
        console.error('Error al eliminar usuario:', err);
        alert('No se pudo eliminar el usuario.');
      });
    });
  });
}
