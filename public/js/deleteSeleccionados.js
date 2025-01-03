var check = document.querySelectorAll('.check_id');
var btn = document.getElementById('borrarAll');
var pedidosCheck = [];
btn.addEventListener('click', function(){
    let alMenosUnoSeleccionado = false;
    check.forEach((e)=>{
        if (e.checked) {
            pedidosCheck.push(e.value);
            alMenosUnoSeleccionado = true;
        }
    });

    if (!alMenosUnoSeleccionado) {
        Swal.fire({
            title: "Sin Seleccionar!",
            text: "Selecciona al menos un registro!",
            icon: "warning"
        });
        return;
    }  
const data =  { pedidos: pedidosCheck} ;
const url = '/delete_Seleccionados';
const requestOptions = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(data)
};
    Swal.fire({
        title: "Eliminar pedidos Seleccionados?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Confirmar!"
    }).then((result) => {
        if (result.isConfirmed) {
            fetch(url, requestOptions)
            .then(response => {
                if (response.ok) {
                } else {
                    throw new Error('Error en la solicitud.');
                }
            })
            .catch(error => {
                console.error(error);
            });

           Swal.fire({
                 title: "Eliminados!",
                 text: "Pedidos eliminados!",
                 icon: "success"
               }).then(() => {
                 window.location.href = "/";
               })
        }
    });
});