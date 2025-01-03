    //Obtener todos los botones .edit
  const editButtons = document.querySelectorAll(".edit-btn");
  editButtons.forEach((button)=> {
    button.addEventListener("click", () => {
      const row = button.closest("tr");
      const saveButton = row.querySelector(".save-btn");
      const cancelButton = row.querySelector(".cancel-btn");
      const viewButtons = row.querySelectorAll(".view-btn");
      const deleteButtons = row.querySelectorAll(".delete-btn");
      const editablesSelect = row.querySelectorAll(".select-editable")
      // Oculta los botones Ver y Borrar
      viewButtons.forEach((viewButton) => {
        viewButton.style.display = "none";
      });
      deleteButtons.forEach((deleteButton) => {
        deleteButton.style.display = "none";
      });
      //hacer accesibles los select
      editablesSelect.forEach((select) => {
        select.disabled = false;
      });
      // Muestra los botones "Guardar" y "Cancelar"
      saveButton.style.display = "inline-block";
      cancelButton.style.display = "inline-block";
      // Oculta el botón "Editar"
      button.style.display = "none";
    })
})