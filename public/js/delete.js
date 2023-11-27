
      const borrarButton = document.querySelectorAll(".delete-btn");
    
      borrarButton.forEach((button) => {
        button.addEventListener("click", function () {
          const row = this.parentElement.parentElement;
          const pedido = row.querySelector('#pedidoCelda').innerText;
    
          const data = { idPedido: pedido };
          const url = '/delete_proyecto';
          const requestOptions = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          };
          Swal.fire({
            title: "Eliminar pedido?",
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
                  title: "Eliminado!",
                  text: "Pedido eliminado!",
                  icon: "success"
                }).then(() => {
                  window.location.href = "/";
                })
            }
          });
        });
      });