document.addEventListener("DOMContentLoaded", function() {
    var controlador = document.getElementById("check_all");
    var checkboxes = document.getElementsByClassName("check_id");
    controlador.addEventListener("change", function() {
        for (var i = 0; i < checkboxes.length; i++) {
            checkboxes[i].checked = controlador.checked;
        }
    });

    for (var i = 0; i < checkboxes.length; i++) {
        checkboxes[i].addEventListener("change", function() {
            var todosSeleccionados = true;
            for (var j = 0; j < checkboxes.length; j++) {
                if (!checkboxes[j].checked) {
                    todosSeleccionados = false;
                    break;
                }
            }
            controlador.checked = todosSeleccionados;
        });
    }
});