const saveButtons = document.querySelectorAll(".save-btn");

  saveButtons.forEach((button) => {
    button.addEventListener("click", function(e) {
      e.preventDefault();
      const row = this.parentElement.parentElement; 

      const selectFila = row.querySelectorAll('.celda-editable select')
      const valorPedido = row.querySelector('#pedidoCelda').innerText

      const selectedValues = [];
      selectFila.forEach((select) => {
        const selectedOption = select.options[select.selectedIndex];
        const selectedValue = selectedOption.getAttribute('data-value');
        selectedValues.push({ value: selectedValue });
      });
      const idPedido = valorPedido
      const url = '/actualizar_proyecto'

      const data = {
        id: idPedido,
        valorCorte: selectedValues[0].value,
        valorEmbalaje :selectedValues[2].value,
        valorEnchape :selectedValues[1].value,
        valorEstatus :selectedValues[3].value
      };

      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      };

      Swal.fire({
        title: "Guardar modificacion?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Confirmar!"
      }).then((result)=>{
        if(result.isConfirmed){

          fetch(url, requestOptions)
            .then((response) => {
              if (response.ok) {
               console.log('Seccion de guardado')

            } else {
              throw new Error('Error en la solicitud.');
            }
          })
          .catch(error => {
            console.error(error);
          });

          Swal.fire({
            title: "Editado!",
            text: "Pedido editado!",
            icon: "success",
          }).then(() => {
            window.location.href = "/";
          })

        }else{
          console.log('Seccion de Cancelar')
        }
      })
      
      selectFila.forEach(function (editableSelect) {
        editableSelect.disabled = true;
      });

      //Ocultar botones
    row.querySelector('.save-btn').style.display = 'none';
    row.querySelector('.cancel-btn').style.display = 'none';

    //Mostrar botones
    row.querySelector('.edit-btn').style.display = 'inline';
    row.querySelector('.view-btn').style.display = 'inline';
    row.querySelector('.delete-btn').style.display = 'inline';
    });
  });
