$(document).ready(function () {
    $('#clientesTable').DataTable({
        language: {
            processing: "Tratamiento en curso...",
            search: "Buscar Cliente&nbsp;:",
            lengthMenu: "Agrupar de _MENU_ items",
            info: "",
            infoEmpty: "No existen datos.",
            infoFiltered: "(filtrado de _MAX_ elementos en total)",
            infoPostFix: "",
            loadingRecords: "Cargando...",
            zeroRecords: "No se encontraron datos con tu busqueda",
            emptyTable: "No hay datos disponibles en la tabla.",
            paginate: {
                first: "Primero",
                previous: "<",
                next: ">",
                last: "Ultimo"
            },
            aria: {
                sortAscending: ": active para ordenar la columna en orden ascendente",
                sortDescending: ": active para ordenar la columna en orden descendente"
            }
        },
        scrollY: 270,
        lengthMenu: [ [5, 10, -1], [5, 10, "All"] ],
    });
});