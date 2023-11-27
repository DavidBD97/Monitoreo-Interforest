const sql = require('mssql');


exports.newOperacion = async(req, res)=>{
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
        }else{
            corte = 0;
        }

        if (orden.ENCHAPE == 'SI') {
            enchape = 1;
        } else {
            enchape = 0;
        }

        if(orden.EMBALAJE == 'SI'){
            embalaje = 1;
        }else{
            embalaje = 0;
        }

   const addProyecto = await pool.input('id_Cliente', sql.Int, idCliente.recordset[0].id_Cliente)
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
                                 .query('INSERT INTO PROYECTOS VALUES (@id_Cliente, @id_Producto, @pedido, @orden_de_Ped, @fecha_Inicio, @cant_PZAS, @medida_M2, @GA, @estatus, @fecha_Entrega, @CORTE, @ENCHAPE, @EMBALAJE, @tipo_EM, @id_canto_A1, @id_canto_A2, @id_canto_L1, @id_canto_L2, @cant_Tablero, @cant_RET, @medida_ML, @PTR, @REM, @lugar_Destino, @tipo_Trasporte)', (err, result)=>{
                                    if(result.rowsAffected.length === 0 ){
                                       console.log('Error');
                                    }else{
                                       console.log('Exito');
                                    }
                                 })
    } catch (error) {
        console.log(error)
    }
}


exports.getDataRegister = async(req, res)=>{
    try{
        const pool = new sql.Request()
        const fechaHoy = new Date();

        const day = fechaHoy.getDate();
        const month = fechaHoy.getMonth() + 1;
        const year = fechaHoy.getFullYear();

        const productoResult = await pool.query(' SELECT * FROM PRODUCTO');
        const clienteResult = await pool.query('SELECT * FROM CLIENTE');
        const cantoResult = await pool.query('SELECT * FROM PRODUCTOS_CANTOS')
        const numPedido = await pool.query('SELECT * FROM [dbo].[PROYECTOS] WHERE id_Orden = (SELECT MAX(id_Orden) FROM PROYECTOS)');

        if(numPedido.rowsAffected[0] == 0){
            numP = 1
            pedidoN = 'P' + numP.toString();
        }else{
            numP = parseInt(numPedido.recordset[0].pedido.substring(1,numPedido.recordset[0].pedido.lenght)) + 1;
            pedidoN = 'P' + numP.toString();
        }
              
        const diaFormateado = day < 10 ? `0${day}` : day;
        const mesFormateado = month < 10 ? `0${month}` : month;

        const fechaFormateada = `${year}-${mesFormateado}-${diaFormateado}`;

        const results = 
            [
                clienteResult.recordset,
                productoResult.recordset,
                cantoResult.recordset,
                pedidoN,
                fechaFormateada
            ]
        return res.render('register', {results});

        }catch (error){
            console.log(error)
        }
}
