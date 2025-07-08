/* ——— DATOS DE DEMO ——— */
const users = [
  {id:'001', nombre:'Ronald Romario', correo:'rromario@unsa.edu.pe', activo:true},
  {id:'002', nombre:'Diego Aquino',   correo:'daquino@unsa.edu.pe',  activo:false},
  {id:'003', nombre:'Albert Llica',   correo:'allica@unsa.edu.pe',   activo:true},
  {id:'004', nombre:'Lucía Paredes',  correo:'lparedes@unsa.edu.pe', activo:true},
  {id:'005', nombre:'Marco Quispe',   correo:'mquispe@unsa.edu.pe',  activo:true},
  {id:'006', nombre:'Fiorella Huamán',correo:'fhuaman@unsa.edu.pe',  activo:false},
  {id:'007', nombre:'Jorge Condori',  correo:'jcondori@unsa.edu.pe', activo:true},
  {id:'008', nombre:'Ana Ramos',      correo:'aramos@unsa.edu.pe',   activo:true},
  {id:'009', nombre:'Luis Vargas',    correo:'lvargas@unsa.edu.pe',  activo:false},
  {id:'010', nombre:'Camila Sosa',    correo:'csosa@unsa.edu.pe',    activo:true}
];

/* ——— RENDER ——— */
const tbody = document.getElementById('table-body');

const rowTpl = ({id,nombre,correo,activo}) => `
  <ul class="table-row">
    <li>${id}</li>
    <li>${nombre}</li>
    <li>${correo}</li>
    <li>
      <span class="status">
        <span class="dot ${activo?'available':'unavailable'}"></span>
        ${activo?'Activo':'Bloqueado'}
      </span>
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
render(users);

/* ——— FILTRO EN VIVO ——— */
document.getElementById('search')
        .addEventListener('input',e=>{
  const q = e.target.value.toLowerCase();
  render(
    users.filter(u =>
      u.id.includes(q) ||
      u.nombre.toLowerCase().includes(q) ||
      u.correo.toLowerCase().includes(q)
    )
  );
});
