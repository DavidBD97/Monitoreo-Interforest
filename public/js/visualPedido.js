

const view = document.querySelectorAll(".view-btn");
view.forEach( (ver) => {
    ver.addEventListener('click', function () {
        const row = this.parentElement.parentElement;
        const valorPedido = row.querySelector('#pedidoCelda').innerText
        

        const pedido = valorPedido
        const url = `/detalle${pedido}`

        fetch(url)
            .then((response) =>{
                return response.json();
            })
            .then((data)=>{
                console.log(data);
            })
            .catch(function(error){
                console.log(error);
            })



    });
});
 



