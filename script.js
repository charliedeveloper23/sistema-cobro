var transactions = [];

function guardarCobro() {
  const nombre = document.getElementById('nombre').value;
  const apellido = document.getElementById('apellido').value;
  const producto = document.getElementById('producto').value;
  const fechaCobro = document.getElementById('fechaCobro').value;
  const telefono = document.getElementById('telefono').value;

  const fechaActual = new Date();
  const fechaCobroDate = new Date(fechaCobro);

  if (fechaCobroDate <= fechaActual) {
    const mensaje = `Hola ${nombre} ${apellido}, te recordamos que debes pagar por el producto ${producto} hoy.`;
    const mensajeWhatsApp = encodeURIComponent(mensaje);
    window.open(`https://api.whatsapp.com/send?phone=${telefono}&text=${mensajeWhatsApp}`);
  }

  const transaction = { fechaCobro, nombre, apellido, producto, telefono };
  transactions.push(transaction);
  actualizarHistorial();
}

function actualizarHistorial() {
  const transactionBody = document.getElementById('transactionBody');
  transactionBody.innerHTML = '';

  transactions.forEach(transaction => {
    const { fechaCobro, nombre, apellido, producto, telefono } = transaction;
    const row = document.createElement('tr');
    row.innerHTML = `<td>${fechaCobro}</td>
                     <td>${nombre}</td>
                     <td>${apellido}</td>
                     <td>${producto}</td>
                     <td>${telefono}</td>`;
    transactionBody.appendChild(row);
  });
}


function filtrarRegistros() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const filteredTransactions = transactions.filter(transaction => {
      const { nombre, apellido, producto } = transaction;
      return (
        nombre.toLowerCase().includes(searchTerm) ||
        apellido.toLowerCase().includes(searchTerm) ||
        producto.toLowerCase().includes(searchTerm)
      );
    });
    mostrarRegistrosFiltrados(filteredTransactions);
  }
  
  function mostrarRegistrosFiltrados(filteredTransactions) {
    const transactionBody = document.getElementById('transactionBody');
    transactionBody.innerHTML = '';
  
    filteredTransactions.forEach(transaction => {
      const { fechaCobro, nombre, apellido, producto, telefono } = transaction;
      const row = document.createElement('tr');
      row.innerHTML = `<td>${fechaCobro}</td>
                       <td>${nombre}</td>
                       <td>${apellido}</td>
                       <td>${producto}</td>
                       <td>${telefono}</td>`;
      transactionBody.appendChild(row);
    });
  }
  
