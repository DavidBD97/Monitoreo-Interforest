        document.getElementById('agregar').addEventListener("click", function(e){
            e.preventDefault();
            Swal.fire({
                title: "Confirma pedido?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Confirmar!"
              }).then((result) => {
                if (result.isConfirmed) {
                  var form = document.getElementById('nuevoProyecto');
                  form.submit();
                  
                  Swal.fire({
                    title: "Agregado!",
                    text: "Pedido agregado!",
                    icon: "success",
                  }).then(() => {
                    window.location.href = "/";
                });
                }
              });
        });

