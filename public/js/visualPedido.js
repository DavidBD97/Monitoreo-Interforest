const view = document.querySelectorAll(".view-btn");
view.forEach( (ver) => {
    ver.addEventListener('click', function () {
        const row = this.parentElement.parentElement;
        console.log(row);
        const valorPedido = row.querySelector('#pedidoCelda').innerText
        console.log(valorPedido);
        const idPedido = pedido;
        console.log(idPedido);
        
    });
});
