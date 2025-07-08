/* ——— DATOS DE DEMO ——— */
const items = [
  {id:'001', nombre:'Pelota de futbol',  categoria:'futbol',   disp:true},
  {id:'002', nombre:'Pelota de basquet', categoria:'basquet',  disp:false},
  {id:'003', nombre:'Pelota de voley',   categoria:'voley',    disp:true},
  {id:'004', nombre:'Pesas 4k',          categoria:'otros',    disp:true},
  {id:'005', nombre:'boya',              categoria:'natacion', disp:true},
  {id:'006', nombre:'bicicleta',         categoria:'ciclismo', disp:false},
  {id:'007', nombre:'soga',              categoria:'otros',    disp:true},
  {id:'008', nombre:'Kit de tenis',      categoria:'tenis',    disp:true},
  {id:'009', nombre:'malla de voley',    categoria:'voley',    disp:false},
  {id:'010', nombre:'caja de pelotas',   categoria:'ping pong',disp:true}
];

/* ——— RENDER DE FILAS ——— */
const tbody = document.getElementById('table-body');

const rowTpl = ({id,nombre,categoria,disp}) => `
  <ul class="table-row">
    <li>${id}</li>
    <li>${nombre}</li>
    <li>${categoria}</li>
    <li>
      <span class="status">
        <span class="dot ${disp?'available':'unavailable'}"></span>
        ${disp?'Disponible':'No Disponible'}
      </span>
    </li>
    <li>
      <button class="btn-edit" aria-label="Editar">
        <svg viewBox="0 0 24 24"><path d="M3 17.25V21h3.75L17.81
          9.94l-3.75-3.75L3 17.25Z" fill="currentColor"/></svg>
      </button>
    </li>
    <li>
      <button class="btn-del" aria-label="Eliminar">
        <svg viewBox="0 0 24 24">
          <path d="M6 7h12M9 7v10m6-10v10M4 7h16m-2 0L17 19H7L6 7Z"
                stroke="currentColor" stroke-width="2"
                fill="none" stroke-linecap="round"/>
        </svg>
      </button>
    </li>
  </ul>
`;

function render(list){
  tbody.innerHTML = list.map(rowTpl).join('');
}
render(items);

/* ——— BÚSQUEDA EN VIVO ——— */
document.getElementById('search')
        .addEventListener('input',e=>{
  const q = e.target.value.toLowerCase();
  render(
    items.filter(({id,nombre,categoria}) =>
      id.includes(q) ||
      nombre.toLowerCase().includes(q) ||
      categoria.toLowerCase().includes(q)
    )
  );
});

/* ——— BOTÓN AÑADIR (DEMO) ——— */
document.getElementById('addBtn')
        .addEventListener('click',()=>{
  alert('Aquí abrirías tu modal para añadir un nuevo artículo');
});
