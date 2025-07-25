let articulos = []; // variable global para acceder al artículo seleccionado
let articuloEditando = null;

document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('modal-articulo');
  const cerrar = document.getElementById('cerrar-modal');
  const btnAbrir = document.getElementById('btn-anadir');
  const form = document.getElementById('form-articulo');

  // Cargar JSON
  fetch('http://127.0.0.1:8000/articulos/')
    .then(response => response.json())
    .then(data => {
      articulos = data.map(item => ({
        id: item.id_art,
        nombre: item.nombre_art,
        categoria: item.categoria,
        disponibilidad: item.disponible,
        prestamo: item.dias_prestamo,
        plazo: item.dias_plazo,
        ubicacion: item.ubicacion,
        horario: item.horario,
        descripcion: item.descripcion,
        imagen: item.imagen,
        estado: item.estado_art,
        fecha_subida: item.fecha_subida
      }));
      renderizarTabla(articulos);
    })
    .catch(error => console.error('Error al cargar los artículos desde la API:', error));

  // Mostrar modal para añadir nuevo
  btnAbrir.addEventListener('click', () => {
    form.reset();
    articuloEditando = null;
    document.getElementById('titulo-modal').textContent = 'Añadir Nuevo Artículo';
    document.getElementById('btn-submit-articulo').textContent = 'Añadir +';
    modal.style.display = 'block';
  });

  // Cerrar modal
  cerrar.addEventListener('click', () => modal.style.display = 'none');
  window.addEventListener('click', e => {
    if (e.target === modal) modal.style.display = 'none';
  });

  form.addEventListener('submit', async e => {
  e.preventDefault();
  const datos = Object.fromEntries(new FormData(form));

  // Obtener imagen
  let imagenPath = '';
  const archivoImagen = document.getElementById('imagen').files[0];

  if (articuloEditando) {
    // En edición, usa la imagen anterior si no se selecciona una nueva
    imagenPath = archivoImagen ? `/image/${archivoImagen.name}` : articuloEditando.imagen;
  } else {
    // En creación, exige imagen
    if (!archivoImagen) {
      alert('Por favor selecciona una imagen');
      return;
    }
    imagenPath = `/image/${archivoImagen.name}`;
  }

  const nuevoArticulo = {
    nombre_art: datos.nombre,
    categoria: datos.categoria,
    estado_art: datos.estado,
    descripcion: datos.descripcion,
    disponible: datos.estado === 'Disponible',
    dias_prestamo: parseInt(datos.prestamo_dias) || 0,
    dias_plazo: parseInt(datos.plazo_max) || 0,
    ubicacion: datos.ubicacion,
    horario: datos.horario,
    imagen: imagenPath
  };

  console.log('Enviando al backend:', nuevoArticulo);

  try {
    if (articuloEditando) {
      // Actualizar artículo existente
      const respuesta = await fetch(`http://127.0.0.1:8000/articulos/${articuloEditando.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(nuevoArticulo)
      });

      if (!respuesta.ok) {
        const errorText = await respuesta.text();
        console.error('Error al actualizar artículo:', errorText);
        throw new Error('No se pudo actualizar el artículo');
      }

      const actualizado = await respuesta.json();

      // Reemplazar en array local
      const index = articulos.findIndex(art => art.id === articuloEditando.id);
      if (index !== -1) {
        articulos[index] = {
          id: actualizado.id_art,
          nombre: actualizado.nombre_art,
          categoria: actualizado.categoria,
          disponibilidad: actualizado.disponible,
          prestamo: actualizado.dias_prestamo,
          plazo: actualizado.dias_plazo,
          ubicacion: actualizado.ubicacion,
          horario: actualizado.horario,
          descripcion: actualizado.descripcion,
          imagen: actualizado.imagen,
          estado: actualizado.estado_art,
          fecha_subida: actualizado.fecha_subida
        };
      }

      articuloEditando = null;

    } else {
      // Crear nuevo artículo
      const respuesta = await fetch('http://127.0.0.1:8000/articulos/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(nuevoArticulo)
      });

      if (!respuesta.ok) {
        const errorText = await respuesta.text();
        console.error('Respuesta del backend:', errorText);
        throw new Error('No se pudo crear el artículo');
      }

      const creado = await respuesta.json();

      articulos.push({
        id: creado.id_art,
        nombre: creado.nombre_art,
        categoria: creado.categoria,
        disponibilidad: creado.disponible,
        prestamo: creado.dias_prestamo,
        plazo: creado.dias_plazo,
        ubicacion: creado.ubicacion,
        horario: creado.horario,
        descripcion: creado.descripcion,
        imagen: creado.imagen,
        estado: creado.estado_art,
        fecha_subida: creado.fecha_subida
      });
    }

    renderizarTabla(articulos);
    modal.style.display = 'none';
    form.reset();

  } catch (error) {
    console.error('Error al guardar artículo:', error);
    alert('Hubo un problema al guardar el artículo.');
  }
});

  // Buscador
  document.getElementById('input-busqueda').addEventListener('input', function () {
    const filtro = this.value.toLowerCase();
    const filas = document.querySelectorAll('#tabla-body tr');

    filas.forEach(fila => {
      const textoFila = fila.innerText.toLowerCase();
      fila.style.display = textoFila.includes(filtro) ? '' : 'none';
    });
  });
});

function renderizarTabla(articulos) {
  const tbody = document.getElementById('tabla-body');
  tbody.innerHTML = '';

  articulos.forEach((item, index) => {
    const fila = document.createElement('tr');
    fila.className = index % 2 === 0 ? 'fila-negra' : 'fila-blanca';

    const disponibleTexto = item.disponibilidad ? 'Disponible' : 'No disponible';
    const colorPunto = item.disponibilidad ? 'azul' : 'rojo';

    fila.innerHTML = `
      <td>${item.id}</td>
      <td>${item.nombre}</td>
      <td>${item.categoria}</td>
      <td>
        <span class="estado-disponibilidad ${colorPunto}" data-id="${item.id}" data-estado="${item.disponibilidad}">
          ● ${disponibleTexto}
        </span>
      </td>
      <td><button class="btn-historial" data-id="${item.id}" data-nombre="${item.nombre}"><i class="fa-regular fa-clock"></i></button></td>
      <td><button class="btn-editar"><i class="fa-regular fa-pen-to-square"></i></button></td>
      <td><button class="btn-eliminar"><i class="fa-regular fa-trash-can"></i></button></td>
    `;

    // Botón editar
    fila.querySelector('.btn-editar').addEventListener('click', () => {
      abrirModalEdicion(item);
    });

    tbody.appendChild(fila)
    // Botón eliminar
    fila.querySelector('.btn-eliminar').addEventListener('click', () => {
      if (confirm(`¿Estás seguro de que deseas eliminar el artículo "${item.nombre}"?`)) {
        eliminarArticulo(item.id);
      }
    });

    //boton ver
    document.querySelectorAll('.btn-historial').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        const nombre = btn.getAttribute('data-nombre');

        // Guardar en localStorage (alternativa: pasar en URL)
        localStorage.setItem('articulo_id', id);
        localStorage.setItem('articulo_nombre', nombre);

        // Redirigir a la nueva página
        window.location.href = 'historial_articulo.html';
      });
    });

  });

  agregarListenersCambioDisponibilidad();
}

function eliminarArticulo(id) {
  fetch(`http://127.0.0.1:8000/articulos/${id}`, {
    method: 'DELETE'
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('No se pudo eliminar el artículo');
      }
      // Elimina del array local
      articulos = articulos.filter(art => art.id !== id);
      renderizarTabla(articulos);
    })
    .catch(error => console.error('Error al eliminar el artículo:', error));
}

function agregarListenersCambioDisponibilidad() {
  const estados = document.querySelectorAll('.estado-disponibilidad');

  estados.forEach(estado => {
    estado.addEventListener('click', async () => {
      const id = estado.getAttribute('data-id'); // Asegúrate de tener esto en tu HTML
      const disponible = estado.getAttribute('data-estado') === 'true';

      try {
        const respuesta = await fetch(`/articulos/${id}/toggle-disponible`, {
          method: 'PATCH', // o 'POST' si tu backend lo requiere
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (!respuesta.ok) throw new Error('Error al cambiar disponibilidad');

        const datos = await respuesta.json(); // se espera que devuelva { disponible: true/false }

        const nuevoDisponible = datos.disponible;

        // Actualiza visualmente
        estado.setAttribute('data-estado', nuevoDisponible);
        estado.classList.toggle('azul', nuevoDisponible);
        estado.classList.toggle('rojo', !nuevoDisponible);
        estado.innerHTML = `● ${nuevoDisponible ? 'Disponible' : 'No disponible'}`;
      } catch (error) {
        console.error('Error al cambiar disponibilidad:', error);
        alert('No se pudo cambiar la disponibilidad. Intenta de nuevo.');
      }
    });
  });
}


function abrirModalEdicion(item) {
  const modal = document.getElementById('modal-articulo');
  const form = document.getElementById('form-articulo');

  form.nombre.value = item.nombre;
  form.categoria.value = item.categoria;
  form.estado.value = item.disponibilidad ? 'Disponible' : 'No disponible';
  form.prestamo_dias.value = item.prestamo;
  form.plazo_max.value = item.plazo;
  form.ubicacion.value = item.ubicacion;
  form.horario.value = item.horario;
  form.descripcion.value = item.descripcion;

  articuloEditando = item;
  document.getElementById('titulo-modal').textContent = 'Editar Artículo';
  document.getElementById('btn-submit-articulo').textContent = 'Editar Artículo';
  modal.style.display = 'block';
}
