
        document.getElementById('nom_Cliente').addEventListener('change', function() {
            var selectedDescription = this.value;
            var options = document.querySelectorAll('#cliente option');
            for (var i = 0; i < options.length; i++) {
                if (options[i].value == selectedDescription) {
                    var emailR = options[i].getAttribute('data-correo'); 
                    var telR = options[i].getAttribute('data-telefono'); 
                    var direcR = options[i].getAttribute('data-direccion'); 
                    
                    document.getElementById('correo').value = emailR;
                    document.getElementById('telefono').value = telR;
                    document.getElementById('lugar_Destino').value = direcR;
                    break;
                }
            }
        });