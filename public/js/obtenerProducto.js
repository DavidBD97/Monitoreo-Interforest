document.getElementById('descripcion').addEventListener('change', function() {
    var selectedDescription = this.value;
    var options = document.querySelectorAll('#producto option');
    for (var i = 0; i < options.length; i++) {
        if (options[i].value == selectedDescription) {
            var codTab = options[i].getAttribute('data-value'); 
            document.getElementById('cod_Tab').value = codTab;
            break;
        }
    }
});