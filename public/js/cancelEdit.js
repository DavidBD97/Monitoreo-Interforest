
// Obtener todos los botones "Cancelar"
const cancelButtons = document.querySelectorAll('.cancel-btn');
// Agregar un controlador de eventos a cada botón "Cancelar"
cancelButtons.forEach(function (cancelButton) {
  cancelButton.addEventListener('click', function () {
    const row = this.parentElement.parentElement; 
    const editableSelect = row.querySelectorAll('.select-editable'); 
    const editCeldas = row.querySelectorAll('.celda-editable');

    // Restaurar los valores originales desde los atributos de datos
    editCeldas.forEach(function (cell) {
      var originalValue = cell.getAttribute('data-original-value');
      var select = cell.querySelector('select');

      if(select){
        var options = select.options;
        for (var i = 0; i < options.length; i++){
          if(options[i].getAttribute('data-value') == originalValue) {
            options[i].selected = true;
          }
        }
      }else{
        cell.textContent = originalValue;
      }

      if (originalValue == 2) {
        cell.style.backgroundColor = 'palegreen';
      } else {
        cell.style.backgroundColor = '';
      }

      if (originalValue == 2) {
        select.style.backgroundColor = 'palegreen';
      } else {
        select.style.backgroundColor = '';
      }

    });
    
    // Hacer que las celdas sean disabled
    editableSelect.forEach(function (editable) {
      editable.disabled = true;
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
