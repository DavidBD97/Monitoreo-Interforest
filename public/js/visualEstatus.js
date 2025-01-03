document.addEventListener('DOMContentLoaded', function () {
    var originalValue = document.getElementById('estatusEditable').getAttribute('data-original-value');
    var select = document.querySelector('#estatusEditable select');
    var options = select.options;
    for (var i = 0; i < options.length; i++) {
        if (options[i].getAttribute('data-value') === originalValue) {
            options[i].style.display = 'none';
            break; 
        }
    }
});