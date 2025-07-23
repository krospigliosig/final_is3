/* ——— DATOS DE DEMO ——— */
const history = [
  {id:'001', articulo:'Pelota de futbol', categoria:'futbol',   reserva:'01/03/25', devuelta:'--/--/--'},
  {id:'002', articulo:'Pelota de basquet',categoria:'basquet',  reserva:'01/03/25', devuelta:'--/--/--'},
  {id:'003', articulo:'Pelota de voley',  categoria:'voley',    reserva:'01/03/25', devuelta:'--/--/--'},
  {id:'004', articulo:'Pesas 4k',         categoria:'otros',    reserva:'01/03/25', devuelta:'--/--/--'},
  {id:'005', articulo:'boya',             categoria:'natacion', reserva:'04/03/25', devuelta:'08/03/25'},
  {id:'006', articulo:'bicicleta',        categoria:'ciclismo', reserva:'06/03/25', devuelta:'08/03/25'},
  {id:'007', articulo:'soga',             categoria:'otros',    reserva:'09/03/25', devuelta:'13/03/25'},
  {id:'008', articulo:'Kit de tenis',     categoria:'tenis',    reserva:'09/03/25', devuelta:'15/03/25'},
  {id:'009', articulo:'malla de voley',   categoria:'voley',    reserva:'12/03/25', devuelta:'16/03/25'},
  {id:'010', articulo:'caja de pelotas',  categoria:'ping pong',reserva:'23/03/25', devuelta:'26/03/25'}
];

/* ——— RENDER ——— */
const tbody = document.getElementById('table-body');

const rowTpl = ({id,articulo,categoria,reserva,devuelta}) => `
  <ul class="table-row">
    <li>${id}</li>
    <li>${articulo}</li>
    <li>${categoria}</li>
    <li>${reserva}</li>
    <li>${devuelta}</li>
    <li>
      <button class="btn-report" aria-label="Reportar">
        <svg viewBox="0 0 24 24">
          <path d="M12 9v4m0 4h.01M10.29 3.86 1.82 18a1 1 0 0 0
                   .88 1.5h18.6a1 1 0 0 0 .88-1.5L13.71 3.86a1
                   1 0 0 0-1.73 0Z" fill="currentColor"/>
        </svg>
      </button>
    </li>
    <li>
      <button class="btn-block" aria-label="Bloquear">
        <svg viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="9" fill="none"
                  stroke="currentColor" stroke-width="2"/>
          <line x1="5" y1="5" x2="19" y2="19"
                stroke="currentColor" stroke-width="2"/>
        </svg>
      </button>
    </li>
    <li>
      <button class="btn-ok" aria-label="Confirmar">
        <svg viewBox="0 0 24 24">
          <path d="M5 13l4 4L19 7" fill="none"
                stroke="currentColor" stroke-width="2"
                stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
    </li>
  </ul>
`;

function render(list){
  tbody.innerHTML = list.map(rowTpl).join('');
}
render(history);

/* ——— FILTRO ——— */
document.getElementById('search')
        .addEventListener('input',e=>{
  const q = e.target.value.toLowerCase();
  render(
    history.filter(h =>
      h.id.includes(q) ||
      h.articulo.toLowerCase().includes(q) ||
      h.categoria.toLowerCase().includes(q)
    )
  );
});
