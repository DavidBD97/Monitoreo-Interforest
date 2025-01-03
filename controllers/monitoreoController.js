const sql = require('mssql');

exports.getData = async (req, res) => {
    const pool = new sql.Request();
    const completo = 'ENTREGADO'
    pool.input('state', sql.VarChar, completo)
        .query('SELECT C.nom_Cliente, C.correo, C.telefono, C.estado_Republica, C.CP, C.municipio_Ciudad,  P.id_Producto, P.pedido, P.fecha_Inicio, P.cant_PZAS, P.medida_M2, P.GA, P.estatus, P.fecha_Entrega, P.CORTE, P.ENCHAPE, P.EMBALAJE, P.tipo_EM, P.canto_A1, P.canto_A2, P.canto_L1, P.canto_L2, P.cant_Tablero, P.cant_RET, P.medida_ML, P.PTR, P.REM, P.lugar_Destino, P.tipo_Trasporte FROM CLIENTE AS C INNER JOIN PROYECTOS AS P ON C.id_Cliente = P.id_Cliente WHERE P.estatus <> @state ',
        (err, results) => {
            if (err) {
                console.error(err);
            } else {
                res.render('index', { results: results.recordset });
            }
        }
    );
};

  exports.getDataView = async (req, res) => {
    try {
        const pool = new sql.Request();
        const {pedido} = req.params;

        const pedidoResult = await pool.input('pedidoP', sql.VarChar, pedido)
                                       .query('SELECT C.nom_Cliente, C.correo, C.telefono, C.estado_Republica, C.CP, C.municipio_Ciudad, T.cod_Tab, T.descripcion,  P.id_Producto, P.pedido, P.fecha_Inicio, P.cant_PZAS, P.medida_M2, P.GA, P.estatus, P.fecha_Entrega, P.CORTE, P.ENCHAPE, P.EMBALAJE, P.tipo_EM, P.canto_A1, P.canto_A2, P.canto_L1, P.canto_L2, P.cant_Tablero, P.cant_RET, P.medida_ML, P.PTR, P.REM, P.lugar_Destino, P.tipo_Trasporte FROM CLIENTE AS C INNER JOIN PROYECTOS AS P ON C.id_Cliente = P.id_Cliente INNER JOIN  PRODUCTO AS T ON P.id_Producto = T.id_Producto WHERE P.pedido = @pedidoP');
        const clienteResult = await pool.query('SELECT * FROM CLIENTE');
        const productoResult = await pool.query('SELECT * FROM PRODUCTO');
        const cantoResult = await pool.query('SELECT * FROM PRODUCTOS_CANTOS');
        const results = 
        [
            pedidoResult.recordset,
            clienteResult.recordset,
            productoResult.recordset,
            cantoResult.recordset
        ]
        res.render('detalle', {results});
    } catch (error) {
        console.error(error);
        res.status(500).send('Error interno del servidor');
    }
};

exports.getDataPedidos = async(req , res )=>{
    try {
        const pool = new sql.Request();
        const visual = await pool.query('SELECT C.nom_Cliente, C.correo, C.telefono, C.estado_Republica, C.CP, C.municipio_Ciudad, T.cod_Tab, T.descripcion,  P.id_Producto, P.pedido, P.orden_de_Ped, P.fecha_Inicio, P.cant_PZAS, P.medida_M2, P.GA, P.estatus, P.fecha_Entrega, P.CORTE, P.ENCHAPE, P.EMBALAJE, P.tipo_EM, P.canto_A1, P.canto_A2, P.canto_L1, P.canto_L2, P.cant_Tablero, P.cant_RET, P.medida_ML, P.PTR, P.REM, P.lugar_Destino, P.tipo_Trasporte FROM CLIENTE AS C INNER JOIN PROYECTOS AS P ON C.id_Cliente = P.id_Cliente INNER JOIN  PRODUCTO AS T ON P.id_Producto = T.id_Producto')
        return res.render('lista_pedidos', {results: visual.recordset})
    } catch (error) {
        console.error(error);
    }
};

exports.updateProyecto = async(req, res)=>{
    const pool = new sql.Request();
    const body = { ...req.body };

    pool.input('idPedido', sql.VarChar, body.id)
        .input('valorCorte', sql.Int, body.valorCorte)
        .input('valorEmbalaje',sql.Int, body.valorEmbalaje)
        .input('valorEnchape',sql.Int, body.valorEnchape)
        .input('valorEstatus',sql.VarChar, body.valorEstatus)
        .query('UPDATE PROYECTOS SET CORTE = @valorCorte, EMBALAJE = @valorEmbalaje, ENCHAPE = @valorEnchape, estatus = @valorEstatus WHERE pedido = @idPedido')
  };

exports.updatePedido = async(req, res)=>{
    try {
        const pool = new sql.Request()
        const orden = {... req.body};
        let proyecto = '';
        let numP = 0;
        let fecha = ''; 

        //Obtener ID del Cliente
            const validarCliente = await pool.input('cliente', sql.VarChar, orden.nom_Cliente)
                                        .query('SELECT * FROM CLIENTE WHERE nom_Cliente = @cliente')
        
        //Obtener ID del Producto
            const idProducto = await pool.input('descripcion', sql.VarChar, orden.descripcion)
                                         .query('SELECT * FROM PRODUCTO WHERE descripcion = @descripcion')
            
        //Validar existencia del cliente
            if (validarCliente.rowsAffected[0] == 0) {
                console.log('Entro en la validacion de existencia del cliente');
                pool.input('nombreC', sql.VarChar, orden.nom_Cliente)
                    .input('cpC', sql.Int, orden.code_P)
                    .input('direccionC', sql.VarChar, orden.estado_Republica)
                    .input('muniC', sql.VarChar, orden.municipio)
                    .input('telefonoC', sql.VarChar, orden.telefono)
                    .input('correoC', sql.VarChar, orden.correo)
                    .query('INSERT INTO CLIENTE (nom_Cliente, CP, estado_Republica, municipio_Ciudad, telefono, correo) VALUES (@nombreC, @cpC, @direccionC, @muniC, @telefonoC, @correoC)');
            }
            //Obtener Id de cliente
            idCliente = await pool.input('client', sql.VarChar, orden.nom_Cliente)
                                  .query('SELECT * FROM CLIENTE WHERE nom_Cliente = @cliente')

        //Validar Pedido y Obtener Pedido y # Pedido
            const numPedido = await pool.query('SELECT * FROM [dbo].[PROYECTOS] WHERE id_Orden = (SELECT MAX(id_Orden) FROM PROYECTOS)');
            
            if(numPedido.rowsAffected[0] == 0){
                numP = 1
                fecha = orden.fecha_Inicio.substring(5,7) + orden.fecha_Inicio.substring(8,10)
                proyecto = 'P-' + fecha + '-' + numP.toString();
                
            }else{
                numP = parseInt(numPedido.recordset[0].pedido.substring(1,numPedido.recordset[0].pedido.lenght)) + 1;
                fecha = numPedido.recordset[0].fecha_Inicio.substring(5,7) + numPedido.recordset[0].fecha_Inicio.substring(8,10);
                proyecto = 'P-' + fecha + '-' + numP.toString();
                
            }
 
        //Convertir CORTE, ENCHAPE, EMBALAJE
        let corte, enchape, embalaje;  
        if(orden.CORTE == 'SI') {
            corte = 1;
        }else if(orden.CORTE == 'NO'){
            corte = 0;
        }else{
            corte = 2;
        }

        if (orden.ENCHAPE == 'SI') {
            enchape = 1;
        } else if(orden.ENCHAPE == 'NO'){
            enchape = 0;
        }else{
            enchape = 2;
        }

        if(orden.EMBALAJE == 'SI'){
            embalaje = 1;
        }else if(orden.EMBALAJE == 'NO'){
            embalaje = 0;
        }else{
            embalaje = 2;
        }


        pool.input('id_Cliente', sql.Int, idCliente.recordset[0].id_Cliente)
                                 .input('id_Producto', sql.Int, idProducto.recordset[0].id_Producto)
                                 .input('pedido', sql.VarChar, orden.pedido)
                                 .input('orden_de_Ped', sql.VarChar, proyecto)
                                 .input('fecha_Inicio', sql.VarChar, orden.fecha_Inicio)
                                 .input('cant_PZAS', sql.Int, orden.cant_PZAS)
                                 .input('medida_M2', sql.Float, orden.medida_M2)
                                 .input('GA', sql.VarChar, orden.GA)
                                 .input('estatus', sql.VarChar, orden.estatus)
                                 .input('fecha_Entrega', sql.VarChar, orden.fecha_Entrega)
                                 .input('CORTE', sql.Int, corte)
                                 .input('ENCHAPE', sql.Int, enchape)
                                 .input('EMBALAJE', sql.Int, embalaje)
                                 .input('tipo_EM', sql.VarChar, orden.tipo_EM)
                                 .input('id_canto_A1', sql.VarChar, orden.canto_A1)
                                 .input('id_canto_A2', sql.VarChar, orden.canto_A2)
                                 .input('id_canto_L1', sql.VarChar, orden.canto_L1)
                                 .input('id_canto_L2', sql.VarChar, orden.canto_L2)
                                 .input('cant_Tablero', sql.Int, orden.cant_Tablero)
                                 .input('cant_RET', sql.Int, orden.cant_RET)
                                 .input('medida_ML', sql.Float, orden.medida_ML)
                                 .input('PTR', sql.VarChar, orden.PTR)
                                 .input('REM', sql.VarChar, orden.REM)
                                 .input('lugar_Destino', sql.VarChar, orden.lugar_Destino)
                                 .input('tipo_Trasporte', sql.VarChar, orden.tipo_Trasporte)
                                 .query('UPDATE PROYECTOS SET id_Cliente = @id_Cliente, id_Producto = @id_Producto, pedido = @pedido, orden_de_Ped = @orden_de_Ped, fecha_Inicio = @fecha_Inicio, cant_PZAS = @cant_PZAS, medida_M2 = @medida_M2, GA = @GA, estatus = @estatus, fecha_Entrega = @fecha_Entrega,CORTE = @CORTE, ENCHAPE = @ENCHAPE, EMBALAJE = @EMBALAJE, tipo_EM = @tipo_EM, canto_A1 = @id_canto_A1, canto_A2 = @id_canto_A2, canto_L1 = @id_canto_L1, canto_L2 = @id_canto_L2, cant_Tablero = @cant_Tablero, cant_RET = @cant_RET, medida_ML = @medida_ML, PTR = @PTR, REM = @REM, lugar_Destino = @lugar_Destino, tipo_Trasporte = @tipo_Trasporte WHERE pedido = @pedido')

    } catch (error) {
        console.log(error)
    }
}  

exports.deleteProyecto = async(req, res)=>{
    try {
        const pool = new sql.Request();
        const body = { ...req.body };
        await pool.input('Idpedido', sql.VarChar, body.idPedido)
                  .query('DELETE PROYECTOS WHERE pedido = @Idpedido')
    } catch (error) {
        console.log(error)
    }    
};

exports.deleteSeleccionados = async(req, res)=>{
    try {
        const pool = new sql.Request();
        const body = { ...req.body };
        let cadena = '';
        for (let i = 0; i < body.pedidos.length; i++) {
            cadena += "'" + body.pedidos[i] + "'";
            if (i < body.pedidos.length - 1) {
                cadena += ',';
            }
        }
        console.log(cadena);
        // Crear la consulta dinámica
        const query = `DELETE FROM PROYECTOS WHERE pedido IN (${cadena})`;
        // Ejecutar la consulta
        await pool.query(query);
    } catch (error) {
        console.log(error)
    }
};